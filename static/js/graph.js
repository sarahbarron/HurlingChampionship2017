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
       d["points_from_play"] = +d["points_from_play"];
       d["point_from_free"] = +d["point_from_free"];
       d["point_from_65"] = +d["point_from_65"];
       d["point_from_sideline"] = +d["point_from_sideline"];
       d["point_from_penalty"] = +d["point_from_penalty"];
       d["goal_from_play"] = +d["goal_from_play"];
       d["goal_from_free"] = +d["goal_from_free"];
       d["goal_from_penalty"] = +d["goal_from_penalty"];
       d["playerid"] = +d["playerid"];
    });


    //Create a CROSSFILETER instance
    var ndx = crossfilter(HurlingStats);


    //  DIMENSIONS
    //stage of all ireland
    var stageOfAllIreland = ndx.dimension(function (d) {
        return d['stage_of_all_ireland'];
    });

    var teams = ndx.dimension(function (d) {
        return d['team'];
    });


    //grouping data & metrics

    //adds total goals*3 and total points for each stage of the Championship
    var numStageOfAllIreland = stageOfAllIreland.group().reduceSum(function (d) {
        return ((d['total_points'])+(d['total_goals']*3));
    });

    //total points for each team
    var teamPoints = teams.group().reduceSum(function (d) {
        return d['total_points'];
    });

    //Charts

    //stage of all ireland
    var stageOfAllIrelandPieChart = dc.pieChart("#stage-of-all-ireland");
    var teamsChart = dc.barChart("#teams-chart");


    stageOfAllIrelandPieChart
        .ordinalColors(["#1689FD", "#E6C229", "#9255AD", "#D11149", "#6610F2","#F17105","#3CD070"])
        .height(400)
        .radius(150)
        .transitionDuration(1500)
        .dimension(stageOfAllIreland)
        .group(numStageOfAllIreland);


    teamsChart
        .height(400)
        .width(750)
        .dimension(teams)
        .group(teamPoints)
        .xUnits(dc.units.ordinal) 
        .x(d3.scale.ordinal().domain(teams));


    dc.renderAll();
}
