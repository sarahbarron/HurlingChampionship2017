from flask import Flask
from flask import render_template
from pymongo import MongoClient
import json
import os

app = Flask(__name__)

MONGO_URI = os.getenv('MONGODB_URI', 'mongodb://localhost:27017')
DBS_NAME = os.getenv('MONGO_DB_NAME', 'Hurling_Championship')
COLLECTION_NAME = 'HurlingChampionship2017'


# when you tpye localhost:5000 into the browser - index() gets called
@app.route("/")
def index():
    # render_template redirects you to he index.html page
    return render_template("index.html")


# route to database Hurling_Championship/2017
@app.route("/Hurling_Championship/2017")
def hurling_projects():

    # using flask view to serve my MongoDB data in JSON format

    # The fields of my Database that I want to retrieve
    columns = {
        '_id': False, 'first_name': True, 'surname': True,
        'team': True, 'stage_of_all_ireland': True,
        'games': True, 'score_breakdown': True, 'total_goals': True,
        'total_points': True
    }

    # Open a connection to MongoDB using a with statement
    # The connection will close as soon as we exit the with statement
    with MongoClient(MONGO_URI) as conn:
        # the collection we want to access is the Hurling_Championship/2017
        collection = conn[DBS_NAME][COLLECTION_NAME]
        # Retrieve a result set that we have defined in columns above (everything except the date & _id)
        # and limit the the results to 1200
        hurlingstats = collection.find(projection=columns, limit=1200)
        # Convert projects to a list in a JSON object and return the JSON data
        return json.dumps(list(hurlingstats))


# only run if initiated directly from the python interpreter
if __name__ == "__main__":
    app.run(debug=True)
