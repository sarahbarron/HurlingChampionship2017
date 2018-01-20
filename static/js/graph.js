queue()
    .defer(d3.json, "/Hurling_Stats/projects")
    .await(makeGraphs);

function makeGraphs(error, HurlingStats) {
    if (error) {
        console.error("makeGraphs error on receiving dataset:", error.statusText);
        throw error;
    }

    var dateFormat = d3.time.format("%d/%m/%Y");

    HurlingStats.forEach(function (d) {
        d["date"] = dateFormat.parse(d["date"]);
        d["total_goals"] = +d["total_goals"];
        d["total_points"] = +d["total_points"];
    });


    //Create a CROSSFILETER instance
    var ndx = crossfilter(HurlingStats);


    //  DIMENSIONS

    //Teams BarChart dimensions
    var teamDim = ndx.dimension(function (d) {
        return d['team'];
    });

    //stage of all ireland Pie chart dimensions
    var stageOfAllIrelandDim = ndx.dimension(function (d) {
        return d['stage_of_all_ireland'];
    });

    //Score breakdown Pie chart dimensions
    var scoreBreakdownDim = ndx.dimension(function (d) {
        return d['score_breakdown'];
    });

    //Players dimensions
    var playersDim = ndx.dimension(function (d) {
        return (d['team'] + " - " + d['first_name'] + " " + d['surname']);
    });

    //total points number display dimensions
    var totalPointsDim = ndx.dimension(function (d) {
        return d['total_points'];
    });

    //total goals number display dimensions
    var totalGoalsDim = ndx.dimension(function (d) {
        return d['total_goals'];
    });


    //GROUPING

    //stage of all ireland pie chart grouping
    var stageOfAllIrelandGroup = stageOfAllIrelandDim.group().reduceSum(function (d) {
        return ((d['total_points']) + (d['total_goals']));
    });

    //score breakdown pie chart grouping
    var scoreBreakdownGroup = scoreBreakdownDim.group().reduceSum(function (d) {
        return ((d['total_points']) + (d['total_goals']));
    });

    //teams barchart total points grouping
    var teamPointsGroup = teamDim.group().reduceSum(function (d) {
        return d['total_points'];
    });

    //teams barchart total goals - stack
    var teamGoalsGroup = teamDim.group().reduceSum(function (d) {
        return d['total_goals'];
    });

    //total goals number display grouping
    var totalGoalsGroup = totalGoalsDim.group().reduceSum(function (d) {
        return d['total_goals'];
    });

    //total points number display grouping
    var totalPointsGroup = totalPointsDim.group().reduceSum(function (d) {
        return d['total_points'];
    });

    //player rowchart total scores per player
    var playerTotalScoreGroup = playersDim.group().reduceSum(function (d) {
        return ((d['total_points'])+(d['total_goals']));
    });


    //Charts
    //stage of all ireland
    var stageOfAllIrelandPieChart = dc.pieChart("#stage-of-all-ireland-chart");
    var scoreBreakdownChart = dc.pieChart("#score-breakdown-chart");
    var teamsChart = dc.barChart("#teams-chart");
    var playersChart = dc.rowChart("#players-chart");
    var totalGoalsND = dc.numberDisplay("#total-goals-nd");
    var totalPointsND = dc.numberDisplay("#total-points-nd");
    var gamesTable = dc.dataTable("#games-table");


    stageOfAllIrelandPieChart
        .ordinalColors(["#C5D5EA", "#7EBDC2", "#F7EDE2", "#B3C5D7", "#D8E1E9", "#B8DBDD", "#82A8D1"])
        .height(550)
        .width(800)
        .radius(250)
        .transitionDuration(1500)
        .dimension(stageOfAllIrelandDim)
        .group(stageOfAllIrelandGroup)
        .legend(dc.legend().x(1).y(1).itemHeight(20).gap(7));

    scoreBreakdownChart
        .ordinalColors(["#C5D5EA", "#7EBDC2", "#F7EDE2", "#B3C5D7", "#D8E1E9", "#82A8D1", "#B8DBDD", "#E1D8CE"])
        .height(550)
        .width(800)
        .radius(250)
        .transitionDuration(1500)
        .dimension(scoreBreakdownDim)
        .group(scoreBreakdownGroup)
        .legend(dc.legend().x(1).y(1).itemHeight(20).gap(7));


    teamsChart
        .ordinalColors(["#82A8D1", "#98CACE"])
        .height(600)
        .width(850)
        .dimension(teamDim)
        .group(teamPointsGroup, 'Points Scored')
        .stack(teamGoalsGroup, 'Goals Scored')
        .xUnits(dc.units.ordinal)
        .x(d3.scale.ordinal().domain(teamDim))
        .transitionDuration(3000)
        .legend(dc.legend().x(50).y(10).itemHeight(20).gap(8))
        .xAxisLabel('TEAMS')
        .yAxisLabel('NUMBER OF SCORES')
        .brushOn(false);

    playersChart
        .height(4000)
        .width(600)
        .dimension(playersDim)
        .group(playerTotalScoreGroup)
        .ordering(function(d) { return -d.value })


    totalGoalsND
        .formatNumber(d3.format("d"))
        .group(totalGoalsGroup)
        .height(1500);

    totalPointsND
        .formatNumber(d3.format("d"))
        .group(totalPointsGroup)
        .height(1500);

    var gamesDim = ndx.dimension(function(d) {return d["games"];});

    gamesTable
        .dimension(gamesDim)
        .group(function (d) {return d['date']; })
        .columns([
            function(d) {return d['games'];}
        ])
        .order(d3.descending)
        .size(27);

    dc.renderAll();
}