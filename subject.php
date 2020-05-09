<?php

    require 'util.php';

    class Subject {

        public $subNo;
        public $data;
        public $allTrials = [];
        public $correctTrials = [];
        public $trimmedTrials = [];
        public $acc;
        public $rt;
        public $opt;

        public function getSubNo() {
            return $this->subNo;
        }

        public function getData() {
            return $this->data;
        }

        public function getAcc() {
            return $this->acc;
        }

        public function getRT() {
            return $this->rt;
        }

        public function getOpt() {
            return $this->opt;
        }

        // Wrap the subject data into a PHP Array
        // public function toArray() {
        //     $result = [];
        //     array_push($result, $this->subNo);
        //     array_push($result, $this->osuID);
        //     array_push($result, $this->age);
        //     array_push($result, $this->gender);
        //     array_push($result, $this->time);
        //     array_push($result, $this->acc);
        //     array_push($result, $this->rt);
        //     array_push($result, $this->opt);
        //     return $result;
        // }
        //
        // public static function getCsvHeaderArray() {
        //     return ["sub_no", "osu_id", "age", "gender", "time", "acc", "rt",
        //                 "opt"];
        // }

        function __construct($subNo) {
            $this->subNo = $subNo;
            // $this->data = $data;
            // $this->yieldUserInfoData();
            // $this->yieldAllTrialsData();
            // $this->yieldCorrectTrialsData();
            // $this->yieldTrimmedTrialsData();
            // $this->yieldSubjectSummaryData();
        }

        public function add_a_trial($trial_no, $block_no, $acc, $rt, $is_opt, $is_switch) {
            $t = new Trial();
            $t->trial_no = intval($trial_no);
            $t->block_no = intval($block_no);
            $t->acc = intval($acc);
            $t->rt = intval($rt);
            $t->is_opt = intval($is_opt);
            $t->is_switch = intval($is_switch);
            array_push($this->allTrials, $t);
        }


        function yieldCorrectTrialsData() {
            foreach ($this->allTrials as $t) {
                if($t->acc===1) {
                    array_push($this->correctTrials, $t);
                }
            }
        }


        // Remove trials in which subject responded less than 300 ms, less than
        // 3 std below the mean RT, or more than 3 std above the mean RT.
        //
        function yieldTrimmedTrialsData() {
            $mean = $this->getMeanRT($this->correctTrials);
            $std = $this->getStdRT($this->correctTrials);
            foreach ($this->correctTrials as $t) {
                if(($t->rt>300)&&($t->rt>$mean-3*$std)&&($t->rt<$mean+3*$std)) {
                    array_push($this->trimmedTrials, $t);
                }
            }
        }



        function yieldSubjectSummaryData() {
            $numAllTrials = count($this->allTrials);
            $numCorrectTrials =count($this->correctTrials);
            $totalRT = 0;
            $numOpt = 0;
            foreach ($this->trimmedTrials as $trial) {
                $totalRT += $trial->rt;
                $numOpt += $trial->is_opt;
            }
            $this->acc = $numCorrectTrials/$numAllTrials*100;
            $this->rt = $totalRT/$numCorrectTrials;
            $this->opt = $numOpt/$numCorrectTrials*100;
        }


        // Given an array of <Trial>, return mean RT.
        function getMeanRT($trials) {
            $result=0;
            $n = 0;
            foreach ($trials as $t) {
                $n++;
                $result+=$t->rt;
            }
            $result = $result/$n;
            return $result;
        }


        // Given an array of <Trial>, return RT standard deviation.
        function getStdRT($trials) {
            $rts = [];
            foreach ($trials as $t) {
                array_push($rts, $t->rt);
            }
            return getStdDev($rts);
        }

    }


    class Trial {

        public $trial_no;
        public $block_no;
        public $acc;
        public $rt;
        public $is_opt;
        public $is_switch;

    }


 ?>
