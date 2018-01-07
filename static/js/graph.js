queue()
    .defer(d3.json, "/Hurling_Stats/projects")
    .await(makeGraphs);

function makeGraphs(error, HurlingStats) {
    if (error) {
        console.error("makeGraphs error on receiving dataset:", error.statusText);
        throw error;
    }

    HurlingStats.forEach(function (d) {
       d["total_goals"] = +d["total_goals"];
       d["total_points"] = +d["total_points"];
    });


    //Create a CROSSFILETER instance
    var ndx = crossfilter(HurlingStats);


    //  DIMENSIONS
    //stage of all ireland
    var stageOfAllIreland = ndx.dimension(function (d) {
        return d['stage_of_all_ireland'];
    });

    //teams
    var teams = ndx.dimension(function (d) {
        return d['teams'];
    });


    //grouping data & metrics
    var numStageOfAllIreland = stageOfAllIreland.group();
    var totalGoalsGroup = teams.group().reduceSum(function (d) {
        return d["total_goals"];
    }) ;


    //Charts

    //stage of all ireland
    var stageOfAllIrelandPieChart = dc.pieChart("#stage-of-all-ireland");
    var teamsChart = dc.barChart("#teams-chart");


    stageOfAllIrelandPieChart
        .ordinalColors(["#79CED7", "#C96A23", "#D3D1C5", "#F5821F", "#006FC1","#EC2322","#8BC934"])
        .height(400)
        .radius(100)
        .transitionDuration(1500)
        .dimension(stageOfAllIreland)
        .group(numStageOfAllIreland);


    //teams
    teamsChart
        .width(500)
        .height(200)
        .dimension(teams)
        .group(totalGoalsGroup)
        .xAxisLabel("2017 Championship Hurling Teams")
        .yAxisLabel("Each teams - Goals and Points");

    dc.renderAll();
}
