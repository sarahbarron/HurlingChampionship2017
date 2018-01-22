# CODE INSTITUTE - STREAM 2 PROJECT

## ABOUT THIS PROJECT

##### I am currently a student at the [Code Institute](https://www.codeinstitute.net/) doing a Full Stack Diploma in Software Development. This is the second of three projects which I must complete in order to be awarded the globally recognised Diploma from Edinburgh Napier University. This project will cover the Back End Development section of the course.
##### The project is based on the 2017 Hurling Championship score statistics.
##### As an Irish person I have a love for our national G.A.A sport Hurling. This project shows the score statistics from last years championship on interactive graphs
##### As I could find no statistics for this project, I went through each game from last year and read online match reports to compile a database to base my graphs and charts on.

## THE NEEDS THIS PROJECT FULFILLS

##### There is in the region of 2,300 clubs in Ireland and 330 worldwide. Members from clubs are always interested and love to discuss games and statistics. Statistics are becoming a big part of the game.
##### While county teams have private statistics, this project provides the general member the opportunity to interact with my graphs to check the score statistics for the 2017 Hurling Championship.

## FUNCTIONALITY

##### The Project is on one webpage. 
##### On the navigation bar there is a start tutorial button which invites users to a quick tour of the page.
##### The page consists of:
##### 1 line graph - This is the players statistics. This is a list of all players who scored in the 2017 Hurling Championship. It is ascending from the player who scored the most down the player who scored the least.
###### When you click on a player you can see on the corresponding graphs - how many goals and points they scored, in which stage of the competition they scored, the breakdown of their scores and the games they scored in.
##### 2 Number Displays 
###### - The first Number Display shows how many goals were scored.
###### - The second Number Display shows how many points were scored.
###### initially both displays show the total number of goals and points scored in the entire championship but as you make selections on the other graphs this will show the number of goals and points for your selection.
##### 2 Pie Charts
###### - The 1st Pie Chart shows the stages of the Championship. Every year the championship is made up of Leinster 1,2 and 3, Leinster final stages, Munster, Qualifiers, Quarter final, Semi final and final
###### When you click on a stage of the Championship - the interactive graphs will show you the players who scored, the number of goals and points, the breakdown of scores and the games played during this stage of the Championship.
###### - The 2nd Pie Chart shows a breakdown of all ways a point or goal can be scored. (in play, free, penalty, 65, and sideline).
###### When you click on a score type - the interactive graphs will update to show for this type of score - which players scored them, how many goals or points were scored this way, the stage of the championship and the games they were scored in.
##### 1 dataTable - This shows a list of the games which took place in the 2017 Championship and the results of the game.
###### When you click on the game the interactive graphs show the players that scored in this game, the total number of goals and points, the stage of the championship, and the breakdown of scores for this game.

## TECHNOLOGIES USED

##### PyCharm - The editor I used to write my html, CSS, JavaScript, Python and README files.
##### Bootstrap - A framework for developing responsive, mobile 1st websites.
##### Languages - HTML, CSS, JavaScript & Phyton.
##### D3.js - A JavaScript based visualisation engine, which I used to render the interactive charts and graphs based on my data.
##### Dc.js - A JavaScript based wrapper library for D3.js. I used this for plotting my graphs and charts
##### Dc.css - The styling for my Dc.js charts
##### Crossfilter.js - A JavaScript data manipulation library. I used for two way data binding between the various graphs and charts.
##### Queue.js - A JavaScript asynchronous helper library. I needed this to force a wait on making the graphs until the data was available to be passed.
##### keen.js - A dashboard template library.
##### Mongo DB - Database used to present my data in JSON format.
##### Flask - A python based micro-framework used to serve my data from the server to my web based interface.
##### Heroku - The platform i used to deploy my project on
##### TinyPNG - to compress photos.
##### JS Hint - to validate the JavaScript files.
##### W3C - to validate the HTML and CSS files.


## HOW THE PROJECT WAS TESTED

##### I did cross browser testing using 
- Chrome 
- Internet Explorer
- Microsoft Edge
- Firefox. 

##### I tested each graph visually to make sure
- everything loaded properly
- when i selected an element on each graph the corresponding graphs responded and showed accurate statistics.
- The page was responsive to window minimising and maximising.

##### In the developer tools I tested that the website was responsive in mobile mode.

##### I ran all my files through a validation test using
- [W3C](https://validator.w3.org/) for HTML.
- [W3C](https://jigsaw.w3.org/css-validator/) for CSS.
- [JS Hint](http://jshint.com/) for JavaScript.

## Some problems that arose and how I resolved them
##### dataTable -

## WORK BASED OFF OTHER CODE
##### I didn't base my work off other code, I used only what i had learnt in my course and the official documentation for dc.js dataTable's

## THE FUTURE
##### I hope to develop on this project in the future to include Gaelic Football score statistics. For this years Hurling and Football Championship I intend to keep a database up to date on a weekly bases.

## HOW THE PROJECT WAS DEPLOYED

##### I created a repository called HurlingChampionship2017 in GitHub and pushed my project to this repository [view repository]( https://github.com/sarahbarron/HurlingChampionship2017).
##### When I finished the project I deployed it on Heroku 