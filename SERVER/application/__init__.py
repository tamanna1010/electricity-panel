from flask import Flask
from flask_pymongo import PyMongo
from dotenv import load_dotenv
import os

app = Flask(__name__)


load_dotenv()  # This line brings all environment variables from .env into os.environ
# print(os.environ['MONGO_URI'])
app.config["MONGO_URI"] = os.environ['MONGO_URI']
app.config["SECRET_KEY"] = os.environ['SECRET_KEY']

# Setup MongoDB
try:
    mongodb_client = PyMongo(app)
    db = mongodb_client.db
    print("Mongo Connection successfull")
except Exception as mongo_error:
    print("Error while connecting to MongoDB")

# csv_filepath = r'C:\\Users\\tamanna.tamanna\\Desktop\\React-Projects\\ELECTRICITY-PORTAL\\SERVER\\application\\electricity_board_case_study.csv'
# df = pandas.read_csv(csv_filepath)
# print(df)
# dict_list = df.to_dict('records')
# dict_list=[{
#     "hey": "hey"
# },{"bye": "bye"}]
# print(dict_list)
# try:
#     usersList = db.todo_flask.insert_many(dict_list)
#     print("data sent ")
# except Exception as er:
#     print("error in mongo data sending" + str(er))


from application import routes

















# from flask import Flask
# import os

# import json
# from application import models
# from flask import jsonify
# from flask_mongoengine import MongoEngine

# load_dotenv()
# app = Flask(__name__)

# app.config['MONGODB_SETTINGS'] = {
#     'db':'movies',
#     'host':'localhost',
#     'port':'27017'
# }

# db = MongoEngine()
# db.init_app(app)

# @app.route('/movies')
# def  get_movies():
#     movies = models.Movie.objects()
#     return  jsonify(movies), 200


# from application import routes