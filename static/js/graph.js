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

    var scoreBreakdown = ndx.dimension(function (d){
        return d['score_breakdown'];
    });

    //teams
    var teams = ndx.dimension(function (d) {
        return d['team'];
    });

    var players = ndx.dimension(function (d) {
        return (d['team']+" - "+ d['first_name']+" "+ d['surname']);
    });

    var totalGoals = ndx.dimension(function (d) {
        return d['total_goals'];
    });
    var totalPoints = ndx.dimension(function (d) {
        return d['total_points'];
    });



    //GROUPING data & metrics


    //adds total goals and total points for each stage of the Championship


    var numStageOfAllIreland = stageOfAllIreland.group().reduceSum(function (d) {
        return ((d['total_points'])+(d['total_goals']));
    });

    //adds total goals and total points for each score type
    var numScoreBreakdown = scoreBreakdown.group().reduceSum(function (d) {
        return ((d['total_points'])+(d['total_goals']));
    });

    //breakdown of points for each team
    var teamPointsFromPlay = teams.group().reduceSum(function (d) {
        return d['points_from_play'];
    });
    var teamPointFromFree = teams.group().reduceSum(function (d) {
        return d['point_from_free'];
    });
    var teamPointFrom65 = teams.group().reduceSum(function (d) {
        return d['point_from_65'];
    });
    var teamPointFromSideline = teams.group().reduceSum(function (d) {
        return d['point_from_sideline'];
    });
    var teamPointFromPenalty = teams.group().reduceSum(function (d) {
        return d['point_from_penalty'];
    });

    //breakdown of goals for each team
     var teamGoalFromPlay = teams.group().reduceSum(function (d) {
        return d['goal_from_play'];
    });
    var teamGoalFromFree = teams.group().reduceSum(function (d) {
        return d['goal_from_free'];
    });

    var teamGoalFromPenalty = teams.group().reduceSum(function (d) {
        return d['goal_from_penalty'];
    });

    // var playerTotalScore = players.group().reduceSum(function (d) {
    //     return ((d['total_points'])+(d['total_goals']));
    // });
     var listPlayers = players.group();

     var numTotalGoals = totalGoals.group().reduceSum(function (d) {
        return d['total_goals'];
    });

    var numTotalPoints = totalPoints.group().reduceSum(function (d) {
        return d['total_points'];
    });


    //Charts

    //stage of all ireland
    var stageOfAllIrelandPieChart = dc.pieChart("#stage-of-all-ireland-chart");
    var scoreBreakdownChart = dc.pieChart("#score-breakdown");
    var teamsChart = dc.barChart("#teams-chart");
   // var playersChart = dc.rowChart("#players-chart");
    var selectPlayer = dc.selectMenu("#player-dropdown");
    var totalGoalsND = dc.numberDisplay("#total-goals-nd");
    var totalPointsND = dc.numberDisplay("#total-points-nd");


    stageOfAllIrelandPieChart
        .ordinalColors(["#1689FD", "#E6C229", "#9255AD", "#D11149", "#6610F2","#F17105","#3CD070"])
        .height(220)
        .width(350)
        .radius(100)
        .transitionDuration(1500)
        .dimension(stageOfAllIreland)
        .group(numStageOfAllIreland);

    scoreBreakdownChart
        .ordinalColors(["#fd07e4", "#E6C229", "#9255AD", "#D11149", "#6610F2","#F17105","#3CD070", "#B1D5E7"])
        .height(220)
        .radius(100)
        .transitionDuration(1500)
        .dimension(scoreBreakdown)
        .group(numScoreBreakdown);

    teamsChart
        .ordinalColors(["#3cd070", "#6610f2", "#d11149", "#b1d5e7", "#f17105","#9255ad","#e6c229", "#FD07E4"])
        .height(440)
        .width(1000)
        .dimension(teams)
        .group(teamPointsFromPlay)
        .stack(teamPointFromFree)
        .stack(teamPointFrom65)
        .stack(teamPointFromSideline)
        .stack(teamPointFromPenalty)
        .stack(teamGoalFromPlay)
        .stack(teamGoalFromPenalty)
        .stack(teamGoalFromFree)
        .xUnits(dc.units.ordinal)
        .x(d3.scale.ordinal().domain(teams));

    selectPlayer
        .dimension(players)
        .group(listPlayers);

    totalGoalsND
         .formatNumber(d3.format("d"))
        .group(numTotalGoals);

     totalPointsND
         .formatNumber(d3.format("d"))
        .group(numTotalPoints);


    // playersChart
    //     .height(5000)
    //     .width(1500)
    //     .dimension(players)
    //     .group(playerTotalScore);


    dc.renderAll();
}
