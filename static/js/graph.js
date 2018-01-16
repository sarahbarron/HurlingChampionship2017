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
    });


    //Create a CROSSFILETER instance
    var ndx = crossfilter(HurlingStats);


    //  DIMENSIONS
    //Teams BarChart dimensions
    var teams = ndx.dimension(function (d) {
        return d['team'];
    });

    //stage of all ireland Pie chart dimensions
    var stageOfAllIreland = ndx.dimension(function (d) {
        return d['stage_of_all_ireland'];
    });

    //Score breakdown Pie chart dimensions
    var scoreBreakdown = ndx.dimension(function (d) {
        return d['score_breakdown'];
    });

    //Player dropdown list dimensions
    var players = ndx.dimension(function (d) {
        return (d['team'] + " - " + d['first_name'] + " " + d['surname']);
    });

    //total points number display dimensions
    var totalPoints = ndx.dimension(function (d) {
        return d['total_points'];
    });

    //total points number display dimensions
    var totalGoals = ndx.dimension(function (d) {
        return d['total_goals'];
    });

    //GROUPING
    //stage of all ireland pie chart grouping
    var numStageOfAllIreland = stageOfAllIreland.group().reduceSum(function (d) {
        return ((d['total_points']) + (d['total_goals']));
    });

    //score breakdown pie chart grouping
    var numScoreBreakdown = scoreBreakdown.group().reduceSum(function (d) {
        return ((d['total_points']) + (d['total_goals']));
    });

    //Teams barchart total points grouping
    var teamPoints = teams.group().reduceSum(function (d) {
        return d['total_points'];
    });

    //Teams barchart total goals - stack
    var teamGoals = teams.group().reduceSum(function (d) {
        return d['total_goals'];
    });

    //total goals number display goals
    var numTotalGoals = totalGoals.group().reduceSum(function (d) {
        return d['total_goals'];
    });

    //total points number display group
    var numTotalPoints = totalPoints.group().reduceSum(function (d) {
        return d['total_points'];
    });

    //player rowchart points from play
    var playerTotalScore = players.group().reduceSum(function (d) {
        return ((d['total_points'])+(d['total_goals']));
    });

    //Charts
    //stage of all ireland
    var stageOfAllIrelandPieChart = dc.pieChart("#stage-of-all-ireland-chart");
    var scoreBreakdownChart = dc.pieChart("#score-breakdown");
    var teamsChart = dc.barChart("#teams-chart");
    var playersChart = dc.rowChart("#players-chart");
    var totalGoalsND = dc.numberDisplay("#total-goals-nd");
    var totalPointsND = dc.numberDisplay("#total-points-nd");

    stageOfAllIrelandPieChart
        .ordinalColors(["#1689FD", "#E6C229", "#9255AD", "#D11149", "#6610F2", "#F17105", "#3CD070"])
        .height(550)
        .width(800)
        .radius(250)
        .transitionDuration(1500)
        .dimension(stageOfAllIreland)
        .group(numStageOfAllIreland)
        .legend(dc.legend().x(1).y(1).itemHeight(12).gap(5));

    scoreBreakdownChart
        .ordinalColors(["#fd07e4", "#E6C229", "#9255AD", "#D11149", "#6610F2", "#F17105", "#3CD070", "#B1D5E7"])
        .height(550)
        .width(800)
        .radius(250)
        .transitionDuration(1500)
        .dimension(scoreBreakdown)
        .group(numScoreBreakdown)
        .legend(dc.legend().x(1).y(1).itemHeight(20).gap(5));

    teamsChart
        .ordinalColors(["#3cd070", "#6610f2", "#d11149", "#b1d5e7", "#f17105", "#9255ad", "#e6c229", "#FD07E4"])
        .height(600)
        .width(850)
        .dimension(teams)
        .group(teamPoints, 'Points Scored')
        .stack(teamGoals, 'Goals Scored')
        .xUnits(dc.units.ordinal)
        .x(d3.scale.ordinal().domain(teams))
        .transitionDuration(3000)
        .legend(dc.legend().x(50).y(10).itemHeight(20).gap(8))
        .brushOn(false);

    playersChart
        .height(4000)
        .width(600)
        .dimension(players)
        .group(playerTotalScore)
        .ordering(function(d) { return -d.value });

    totalGoalsND
        .formatNumber(d3.format("d"))
        .group(numTotalGoals)
        .height(1500);

    totalPointsND
        .formatNumber(d3.format("d"))
        .group(numTotalPoints)
        .height(1500);

    dc.renderAll();
}