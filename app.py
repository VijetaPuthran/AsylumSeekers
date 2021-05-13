#CORS
from flask import Flask, jsonify, render_template
from flask_cors import CORS, cross_origin


# dependencies
# from config import database, connect_string
# relational database class with our data retrieval functions
from projectcsv import Asylum_Seekers

#################################################
# Database Setup
#################################################   
data = Asylum_Seekers()
#################################################
# Flask Setup
#################################################
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
#################################################
# Flask Routes
#################################################
@app.route("/")
@cross_origin()
def home():
    """List all available api routes."""
    return (
        f"<h4>Available Routes:</h4>"       
        f'<a href="/api/demographics">Demographics</a><br/>' 
        f'<a href="/api/timeseries">Time Series</a><br/>' 
        f'<a href="/api/geomap">Geo Map</a><br/>'
        f'<a href="" onclick="window.history.back();"><h4>Back</h4></a><br/>' 
    )       

# @app.route("/api/asylumseekers")
# def asy():
#     return jsonify(data.asy_seekers_info())

@app.route("/api/demographics")
@cross_origin()
def demo():
    return jsonify(data.demographics())

@app.route("/api/timeseries")
@cross_origin()
def time():
    return jsonify(data.time_series_info())


if __name__ == '__main__':
    app.run(debug=True)