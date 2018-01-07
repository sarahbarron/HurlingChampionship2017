queue()
    .defer(d3.json, "/Hurling_Stats/projects")
    .await(makeGraphs);

function makeGraphs(error, HurlingStats) {
    if (error) {
        console.error("makeGraphs error on receiving dataset:", error.statusText);
        throw error;
    }


    //Create a CROSSFILETER instance
    var ndx = crossfilter(HurlingStats);

    //dimensions
    var stageOfAllIreland = ndx.dimension(function (d) {
        return d['stage_of_all_ireland'];
    });


    //grouping data & metrics
    var numStageOfAllIreland = stageOfAllIreland.group() ;


    //Charts
    var stageOfAllIrelandPieChart = dc.pieChart("#stage-of-all-ireland");

    stageOfAllIrelandPieChart
        .ordinalColors(["#79CED7", "#C96A23", "#D3D1C5", "#F5821F", "#006FC1","#EC2322","#8BC934"])
        .height(220)
        .radius(90)
        .transitionDuration(1500)
        .dimension(stageOfAllIreland)
        .group(numStageOfAllIreland);


    dc.renderAll();
}
