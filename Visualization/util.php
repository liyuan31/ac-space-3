<?php

    function getStdDev($array) {
        $n = count($array);
        $variance = 0.0;
        $mean = array_sum($array)/$n;
        foreach($array as $i) {
            $variance += pow(($i - $mean), 2);
        }
        return (float)sqrt($variance/$n);
    }


    // Given a data file, convert it to csv file at the same location
    function to_csv_file($path) {
        $old_file = fopen($path, "r");
        $new_file = fopen($path.".csv", "w");
        $line = "";
        while (!feof($old_file)) {
            $line = fgets($old_file);
            fputs($new_file, $line);
        }
    }

 ?>
