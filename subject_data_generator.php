<?php

    require_once 'subject.php';
    require_once 'util.php';

    class SubjectDataReader {

        public $subs;

        // The extension of the data file
        // e.g. ".csv"
        private $data_file_extension = "";

        // e.g. "C:/"
        private $data_file_root = "";

        // The name of the data file, without $subNo
        // e.g. "Data_AC_SPACE_"
        private $data_file_name = "";

        // The number of rows to be skipped when reading from data files
        // e.g. 12
        private $skip_rows = 0;

        // An array of excluded subjects
        // e.g. [19, 28, 29, 58]
        private $excluded = [];

        // An associative array of col_name => col_num mapping
        private $col_names = [];


        function __construct() {
            $this->subs = [];
        }

        public function get_data_file_extension() {
            return $this->data_file_extension;
        }

        public function set_data_file_extension($str) {
            $this->data_file_extension = $str;
        }

        public function get_data_file_root() {
            return $this->data_file_root;
        }

        public function set_data_file_root($str) {
            $this->data_file_root = $str;
        }

        public function get_data_file_name() {
            return $this->data_file_name;
        }

        public function set_data_file_name($str) {
            $this->data_file_name = $str;
        }

        public function get_skip_rows() {
            return $this->skip_rows;
        }

        public function set_skip_rows($rows) {
            $this->skip_rows = $rows;
        }

        public function get_excluded() {
            return $this->excluded;
        }

        public function set_excluded($arr) {
            $this->excluded = $arr;
        }

        public function get_col_names() {
            return $this->col_names;
        }

        public function set_col_names($arr) {
            $this->col_names = $arr;
        }

        // Read raw data files and store all subject data in an array of
        // <Subject>
        public function yield_subs_data() {
            for ( $i=1; $i<99; $i++ ) {
                if ( ! in_array( $i, $this->excluded ) ) {
                    $path = $this->data_file_root.$this->data_file_name
                        .strval($i).$this->data_file_extension;
                    if (file_exists($path)) {
                        if ($this->data_file_extension===".txt") {
                            to_csv_file($path);
                            $path = $path.".csv";
                        }
                        $sub = new Subject($i);
                        $handle = fopen($path, "r");
                        $j = 1;
                        // while (($row = fgetcsv($handle, 1000, "\t")) !== FALSE) { // for txt
                        while (($row = fgetcsv($handle, 1000, ",")) !== FALSE) { // for csv
                            if($j > $this->skip_rows) {
                                $trial_no = $row[$this->col_names["trial_no"]];
                                $block_no = $row[$this->col_names["block_no"]];
                                $acc = $row[$this->col_names["acc"]];
                                $rt = $row[$this->col_names["rt"]];
                                $is_opt = $row[$this->col_names["is_opt"]];
                                $is_switch = $row[$this->col_names["is_switch"]];
                                $sub->add_a_trial($trial_no, $block_no, $acc,
                                    $rt, $is_opt, $is_switch);
                            }
                            $j++;
                        }
                        fclose($handle);
                        $sub->yieldCorrectTrialsData();
                        $sub->yieldTrimmedTrialsData();
                        $sub->yieldSubjectSummaryData();
                        array_push($this->subs, $sub);

                    }
                }

            }
        }

        // $param: "opt" or "sr"
        public function create_time_series($file_path, $param) {
            foreach ($this->subs as $sub) {
                $file_name = $file_path.$sub->subNo.".csv";
                $handle = fopen($file_name, "w");
                fputcsv($handle,["trial_no", "ten_trials_mean"]);
                $trials = $sub->trimmedTrials;
                $n = count($trials);
                $i = 0;
                while ($i < $n) {
                    if ($i >= 10) {
                        $sum = 0;
                        $num_valid_sw = 0;  // number of trials is_switch == 1 or 2; in other words, not NaN. Because trim trials does not eliminate these trials.
                        for ( $j=0; $j<10; $j++) {
                            if ($param==="opt") {
                                $sum += $trials[$i+$j-10]->is_opt;
                            }
                            elseif ($param==="sr") {
                                $is_sw = $trials[$i+$j-10]->is_switch;    // is_switch is coded 1, 2, or NaN
                                if ($is_sw>0) {
                                    $num_valid_sw++;
                                    $sum += $is_sw-1;   // is_switch-1 == 0 or 1
                                }
                            }
                        }
                        if ($param==="opt") {
                            $arr = [$trials[$i]->trial_no, $sum/10];
                        }
                        elseif ($param==="sr") {
                            $arr = [$trials[$i]->trial_no, $sum/$num_valid_sw];
                        }
                        fputcsv($handle, $arr);
                    }
                    $i++;
                }
                fclose($handle);
            }
        }

        // Return an assosiative array of col_name => col_num pairs that is
        // commonly seen in ACVS data files
        public static function get_default_col_names_map($index) {
            switch ($index) {
                case 0: // AC Space 3: Spatial
                    return array(
                        "sub_no" => 0,
                        "trial_no" => 1,
                        "block_trial_no" => 2,
                        "block_no" => 3,
                        "left_ecc" => 4,
                        "right_ecc" => 5,
                        "left_pos" => 7,
                        "right_pos" => 8,
                        "left_digit" => 9,
                        "right_digit" => 10,
                        "response_digit" => 11,
                        "targ_choice" => 12,
                        "acc" => 13,
                        "rt" => 14,
                        "is_opt" => 15,
                        "is_switch" => 16
                    );
                case 1: // Standard ACVS
                    return array(
                        "sub_no" => 0,
                        "trial_no" => 1,
                        "block_trial_no" => 2,
                        "block_no" => 3,
                        "non_opt_color" => 4,
                        "run_num" => 5,
                        "red_pos" => 6,
                        "blue_pos" => 7,
                        "red_digit" => 8,
                        "blue_digit" => 9,
                        "response_digit" => 10,
                        "targ_choice" => 11,
                        "acc" => 12,
                        "rt" => 13,
                        "is_opt" => 14,
                        "is_switch" => 15
                    );
            }
        }

    }



 ?>
