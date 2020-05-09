<?php

    $content_file = fopen("nb_content.html", "r") or die("Unable to open file!");
    $content = fread($content_file, filesize("nb_content.html"));
    fclose($content_file);



 ?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Walden's Lab Notebook</title>
    <script src="https://d3js.org/d3.v5.min.js"></script>
    <link rel="stylesheet" type="text/css" href="styles.css">
    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,400i,700,700i&display=swap" rel="stylesheet">



</head>
<body>
    <div class="grand-title">
        <h1>Spatial ACVS Project</h1>
    </div>

    <div id="standard">
        <div id="standard-freq">
            <svg width="100%" height="500"></svg>
        </div>
    </div>

    <div id="scatter"><svg width="500" height="500"></div>
    <div id="line_graph_t_opt"></div>
    <div id="line_graph_t_sr"></div>

    <script src="acs_a_freq.js"></script>
    <script src="nb_041220_viz.js"></script>

</body>
</html>
