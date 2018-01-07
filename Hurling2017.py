from flask import Flask
from flask import render_template
from pymongo import MongoClient
import json

app = Flask(__name__)

MONGODB_HOST = 'localhost'
MONGODB_PORT = 27017
DBS_NAME = 'Hurling_Stats'
COLLECTION_NAME = 'projects'


@app.route("/")
def index():
    """
    A Flask view to serve the main dashboard page.
    """
    return render_template("index.html")


@app.route("/Hurling_Stats/projects")
def hurling_projects():
    """
    A Flask view to serve the project data from
    MongoDB in JSON format.
    """

    # A constant that defines the record fields that we wish to retrieve.
    FIELDS = {
        '_id': False, 'payerid': True, 'first_name': True, 'surname': True,
        'team': True, 'stage_of_all_ireland': True,
        'opposition': True, 'date': True, 'team_goals': True,
        'team_points': True, 'opposition_goals': True,
        'opposition_points': True, 'points_from_play': True,
        'point_from_free': True, 'point_from_65': True,
        'point_from_sideline': True, 'point_from_penalty': True,
        'goal_from_play': True, 'goal_from_free': True,
        'goal_from_penalty': True, 'total_goals': True,
        'total_points': True,
    }

    # Open a connection to MongoDB using a with statement such that the
    # connection will be closed as soon as we exit the with statement
    with MongoClient(MONGODB_HOST, MONGODB_PORT) as conn:
        # Define which collection we wish to access
        collection = conn[DBS_NAME][COLLECTION_NAME]
        # Retrieve a result set only with the fields defined in FIELDS
        # and limit the the results to 1500
        projects = collection.find(projection=FIELDS, limit=1500)
        # Convert projects to a list in a JSON object and return the JSON data
        return json.dumps(list(projects))


if __name__ == "__main__":
    app.run(debug=True)

