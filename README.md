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
##### On the navigation bar there is a start tour button which invites users to a quick tour of the page.
##### The page consists of:
##### 1 line graph - This is the players statistics. This is a list of all players who scored in the 2017 Hurling Championship. It is ascending from the player who scored the most down the player who scored the least.
###### When you click on a player you can see on the corresponding graphs - how many goals and points they scored, in which stage of the competition they scored, the breakdown of their scores, the team they scored for and the games they scored in.
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
###### When a player, team, stage of competition, or score breakdown is clicked this dataTable will update to correspond to your selection.

## TECHNOLOGIES USED

##### PyCharm - The editor I used to write my html, CSS, JavaScript, Python and README files.
##### Bootstrap - A framework for developing responsive, mobile 1st websites.
##### Languages - HTML, CSS, JavaScript and Python.
##### D3.js - A JavaScript based visualisation engine, which I used to render the interactive charts and graphs based on my data.
##### Dc.js - A JavaScript based wrapper library for D3.js. I used this for plotting my graphs and charts
##### Dc.css - The styling for my Dc.js charts
##### Crossfilter.js - A JavaScript data manipulation library. I used for two way data binding between the various graphs and charts.
##### Queue.js - A JavaScript asynchronous helper library. I needed this to force a wait on making the graphs until the data was available to be passed.
##### keen.js - A dashboard template library.
##### Mongo DB - Database used to present my data in JSON format.
##### Flask - A python based micro-framework used to serve my data from the server to my web based interface.
##### Heroku - The platform i used to deploy my project on.
##### mLab - Cloud hosted MongoDB, to host and monitor my database 24/7 and provide backups.
##### TinyPNG - To compress photos.
##### JS Hint - To validate the JavaScript files.
##### W3C - To validate the HTML and CSS files.


## HOW THE PROJECT WAS TESTED

##### I did cross browser testing using 
- Chrome 
- Internet Explorer
- Microsoft Edge
- Firefox. 

##### I tested each graph visually to make sure
- everything loaded properly
- when i selected an element on each graph the corresponding graphs responded and showed accurate statistics.

##### In the developer tools I tested that the website was responsive in tablet and mobile mode and again when the project was deployed I tested on my mobile, tablet and laptop that the website was responsive.

##### I ran all my files through a validation test using
- [W3C](https://validator.w3.org/) for HTML.
- [W3C](https://jigsaw.w3.org/css-validator/) for CSS.
- [JS Hint](http://jshint.com/) for JavaScript.

##### User testing 
I sent some hurling fanatic friends and family a link to my project and asked them to give me honest feedback. From their feedback it seemed that the button in the navigation bar was not grabbing their attention they were scrolling down to see the charts first and it was only at the end they were noticing the start tour button and were not awear they could click on the charts. I therefore added a very large start tour button underneath the picture and just before the charts in bright green, to draw the users attention to do the tour prior to viewing the charts. I also left the start tour button in the navigation bar as this bar scrolls with the user therefore the button is always in available.
## Some problems that arose and how I resolved them
##### I had problems trying to get the dataTable to show just 1 instance of each game. Having read the documentation for Dc.js datatable i discovered they were slightly different to other Dc.js charts. The group attribute is used as a keying function for nesting and crossfilters can not be passed to it, the documentation also stated a group could be passed to the dimension attribute. In my dataTable I wanted to show a list of the 27 games played in the 2017 Hurling Championship, however when i created a games dimension the resulting dataTable had 1173 rows showing each game numerous times. When i tried to group the games and pass it to the dimension attribute the result was a dataTable with 1 line saying 'undefined'. With the help of my Tutor Yoni Lavi he informed me of a trick to omit the column attribute from the graph. When i omited the column, it gave me just 1 instance of each game but some games were missing, to fix this I need set the size of the dataTable to 1173 the size of my database. This gave me a list of all 27 games played in 2017

## WORK BASED OFF OTHER CODE
##### I didn't base my work off other code, I used only what i had learnt in my course and the official documentation for dc.js dataTable's

## THE FUTURE
##### I hope to develop on this project in the future to include Gaelic Football score statistics For this years Hurling and Football Championship. I intend to keep a database up to date on a weekly bases.

## VERSION CONTROL
##### GitHub: I created a repository called HurlingChampionship2017 in GitHub and pushed my project to this repository regularly. [view repository]( https://github.com/sarahbarron/HurlingChampionship2017).

## HOW THE PROJECT WAS DEPLOYED
##### - From the command line I created an app using the Heroku create command. This also created a remote Git. 
##### - I got the Flask app running in the cloud. This involved installing a python package called gunicorn, which is used for running http servers on unix based operating systems, I needed this as Heroku servers use Ubuntu server. Firstly I activated the virtual environment and then installed gunicorn.
##### - To make sure all my dependencies were added to my requirements.txt file I used the pip freeze command and then synchronized them.
##### My dependencies are 
- click==6.7, 
- Flask==0.12.2, 
- gunicorn==19.7.1, 
- itsdangerous==0.24, 
- Jinja2==2.10,
- MarkupSafe==1.0,
- pymongo==3.6.0 and 
- Werkzeug==0.13 
##### - I then created a Procfile and Procfile.Windows, these are files that tell Heroku what to do once the project has been deployed.
##### - I did my initial add, commit and push of my project to the git created by Heroku.
##### - I started a dyno/worker a thread to run in the background infinitly to keep my app running.
##### - I installed a Heroku addon called mLab to host and monitor my database 24/7 and back it up daily. This involved creating a user, connecting to the database, creating a collection, importing the csv file and making a connection from the Mongo Management Studio.
##### - I imported the os module in my python file, this module allows the code to interact with the underlying operating system you are using, In my file I am using the getenv method this obtains environment variables from the host operating system.
##### - I added my environment variables to my heroku app and to my Flask project in Pycharm.
##### - I updated the python file and did a final add, commit and push to the Heroku Git.
##### My project can be viewed fully deployed on Heroku [here](https://arcane-beyond-23253.herokuapp.com/).