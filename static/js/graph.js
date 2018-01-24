// forces a wait on making the graphs until the database data is retrieved
queue()
    .defer(d3.json, "/Hurling_Championship/2017")
    .await(makeGraphs);

//if there is an error making the graph throw this error message
function makeGraphs(error, HurlingStats) {
    if (error) {
        console.error("makeGraphs error on receiving dataset:", error.statusText);
        throw error;
    }

    //converting strings to numbers for every instance they are used in this file.
    HurlingStats.forEach(function (d) {
        d["total_goals"] = +d["total_goals"];
        d["total_points"] = +d["total_points"];
    });

    //Create a CROSSFILETER instance
    var ndx = crossfilter(HurlingStats);

    //  DIMENSIONS

    //Players dimensions (the players team , first name & surname)
    var playersDim = ndx.dimension(function (d) {
        return (d['team'] + " - " + d['first_name'] + " " + d['surname']);
    });

    //total goals number display dimension
    var totalGoalsDim = ndx.dimension(function (d) {
        return d['total_goals'];
    });

    //total points number display dimension
    var totalPointsDim = ndx.dimension(function (d) {
        return d['total_points'];
    });

    //stage of all ireland Pie chart dimension
    var stageOfAllIrelandDim = ndx.dimension(function (d) {
        return d['stage_of_all_ireland'];
    });

    //Score breakdown Pie chart dimension
    var scoreBreakdownDim = ndx.dimension(function (d) {
        return d['score_breakdown'];
    });

    //Teams BarChart dimension
    var teamDim = ndx.dimension(function (d) {
        return d['team'];
    });

    //Games & results dimension
    var gamesDim = ndx.dimension(function(d) {
        return d["games"];
    });

    //GROUPING

     //player row chart total scores per player (points + goals*3 (as each goal is equivalent to 3 points in hurling))
    var playerTotalScoreGroup = playersDim.group().reduceSum(function (d) {
        return ((d['total_points'])+((d['total_goals'])*3));
    });

     //total goals number display grouping. (only displays the number of goals scored and not its points equivalent)
    var totalGoalsGroup = totalGoalsDim.group().reduceSum(function (d) {
        return d['total_goals'];
    });

    //total points number display grouping
    var totalPointsGroup = totalPointsDim.group().reduceSum(function (d) {
        return d['total_points'];
    });

    //stage of all ireland pie chart grouping (points + goals*3 (as each goal is equivalent to 3 points in hurling)
    var stageOfAllIrelandGroup = stageOfAllIrelandDim.group().reduceSum(function (d) {
        return ((d['total_points']) + ((d['total_goals'])*3));
    });

    //score breakdown pie chart grouping (goals and points (not multiplied by 3 as the goals have there own pie sections
    // so i only wanted to show the number of goals scored rather than their points value here)
    var scoreBreakdownGroup = scoreBreakdownDim.group().reduceSum(function (d) {
        return ((d['total_points']) + (d['total_goals']));
    });

    //teams barchart total points grouping
    var teamPointsGroup = teamDim.group().reduceSum(function (d) {
        return d['total_points'];
    });

    //teams barchart total goals - stack (not multiplied by 3 as i wanted to show the number of goals scored rather
    //than their points value here)
    var teamGoalsGroup = teamDim.group().reduceSum(function (d) {
        return d['total_goals'];
    });


    //CHARTS

    //players who scored in the All Ireland Championship row chart
    var playersChart = dc.rowChart("#players-chart");
    //Total goals number display
    var totalGoalsND = dc.numberDisplay("#total-goals-nd");
    //total points number display
    var totalPointsND = dc.numberDisplay("#total-points-nd");
    //stages of All Ireland pie chart
    var stageOfAllIrelandPieChart = dc.pieChart("#stage-of-all-ireland-chart");
    //breakdown of score types pie chart
    var scoreBreakdownChart = dc.pieChart("#score-breakdown-chart");
    //teams who played in the All Ireland Championship bar chart
    var teamsChart = dc.barChart("#teams-chart");
    //games played in the 2017 All Ireland Championship & the result
    var gamesTable = dc.dataTable("#games-table");

    //Players who scored in the All Ireland Championship row chart
    playersChart
        .height(4000)
        .width(600)
        .dimension(playersDim)
        .group(playerTotalScoreGroup)
        .ordering(function(d) { return -d.value });

    //Total Goals Number Display chart
    totalGoalsND
        .formatNumber(d3.format("d"))
        .group(totalGoalsGroup)
        .height(1500);

    //Total Points Number Display chart
    totalPointsND
        .formatNumber(d3.format("d"))
        .group(totalPointsGroup)
        .height(1500);

    //The stages of the Hurling Championship Pie Chart
    stageOfAllIrelandPieChart
        .ordinalColors(["#C5D5EA", "#7EBDC2", "#F7EDE2", "#B3C5D7", "#D8E1E9", "#B8DBDD", "#82A8D1"])
        .height(550)
        .width(800)
        .radius(250)
        .transitionDuration(1500)
        .dimension(stageOfAllIrelandDim)
        .group(stageOfAllIrelandGroup)
        .legend(dc.legend().x(1).y(1).itemHeight(20).gap(7));

    //The breakdown of types of scores that can be scored in hurling pie chart
    scoreBreakdownChart
        .ordinalColors(["#C5D5EA", "#7EBDC2", "#F7EDE2", "#B3C5D7", "#D8E1E9", "#82A8D1", "#B8DBDD", "#E1D8CE"])
        .height(550)
        .width(800)
        .radius(250)
        .transitionDuration(1500)
        .dimension(scoreBreakdownDim)
        .group(scoreBreakdownGroup)
        .legend(dc.legend().x(1).y(1).itemHeight(20).gap(7));

    //The teams who played in the Hurling Championship 2017 bar chart
    teamsChart
        .ordinalColors(["#82A8D1", "#98CACE"])
        .height(600)
        .width(800)
        .dimension(teamDim)
        .group(teamPointsGroup, 'Points Scored')
        .stack(teamGoalsGroup, 'Goals Scored')
        .xUnits(dc.units.ordinal)
        .x(d3.scale.ordinal().domain(teamDim))
        .transitionDuration(3000)
        .legend(dc.legend().x(50).y(10).itemHeight(20).gap(8))
        .xAxisLabel('TEAMS')
        .yAxisLabel('NUMBER OF SCORES')
        .elasticX(true);

    //A data table showing the games played during 2017 and the game results. The .column attribute has been omitted
    //here so that the table only shows 1 instance of each game.
    gamesTable
        .dimension(gamesDim)
        .group(function (d) {return d['games']; })
        .order(d3.ascending)
        .size(1174);

    //calls all the charts to be created
    dc.renderAll();
}

//After a selection has been made the refresh button allows users to reload
//graphs back to their original state.
function refresh() {
    location.reload();
}