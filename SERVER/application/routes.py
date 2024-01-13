from flask import request
from application  import db, app
from bson import ObjectId, json_util
import json
import math

@app.route('/all_connections', methods = ["GET"])
def get_all_connections():
    """
        Function to view all the connections .
    """
    try:
        all_connections = []
        for entry in db.connections.find().sort("date_created", -1):
            entry["_id"] = str(entry["_id"])
            # if math.isnan(entry["Date_of_Approval"]):
            #     entry["Date_of_Approval"]=0
            all_connections.append(entry)
        return  json.dumps({"data": all_connections, "message": "success"}), 200
    except Exception as view_all_error:
        # Error while trying to view all the connections
        return "Error in VIEWING all connections " + str(view_all_error), 500
    

@app.route("/add_connection", methods=["POST"])
def add_new_connection():
    """
        Function to add new connection.
    """

    if request.method == "POST":
        try:
            body = request.get_json()
            db.connections.insert_one(body)
            return "Connection added successfully", 200
        except Exception as add_one_error:
            # Error while trying to add new connection
            return "Error in adding new connection " + str(add_one_error), 500
    

@app.route("/connection/<user_id>", methods = ["POST", "GET"])
def update_connection(user_id):
    if request.method == "POST":
        """
        Function to update the connection details.
        """
        try:
            # Get the value which needs to be updated
            if request.method == "POST":
                body = request.get_json()
                try:
                    db.connections.find_one_and_update({"_id": ObjectId(user_id)}, {"$set": body})
                    return json.dumps({"message": "User Updated successfully"}), 200
                except Exception as update_one:
                    return json.dumps({"message": "Error in updating " + str(update_one)}), 404
        except Exception as update_one_error:
            # Error while trying to update the resource
            # Add message for debugging purpose
            return json.dumps({"message": "Error in updating " + str(update_one_error)}), 500
    else:
        """
        Function to view one connection.
        """
        try:
            # Get the value which needs to be viewed
            todo = db.connections.find_one({"_id": ObjectId(user_id)})
            return json.loads(json_util.dumps(todo)), 200
        except Exception as view_one_error:
            # Error while trying to view the resource
            return "Error in VIEWING one connection " + str(view_one_error), 500


