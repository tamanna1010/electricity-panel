
#  Electricity Board

In the modern age of automation and digitalization, the client wants to create a web application for it’s staff with capability to view and edit the connections made/requested by the user. To solve the problem and get an edge over its competitors, the client wants a Multi-Page User Interface to keep track of applied connections and their status.

## API Reference

#### Get all connections

```http
  GET /all_connections
```

| Parameter | Type     | 
| :-------- | :------- | 
| `NA` | `NA` |  

#### Update connection

```http
  GET /connection/${_id}
```

| Parameter | Type     | 
| :-------- | :------- |
| `ID`      | `number` |  
| `Applicant_Name`      | `text` |  
| `Gender`      | `text` |  
| `District`      | `text` |  
| `State`      | `text` |  
| `Pincode`      | `number` |  
| `Ownership`      | `text` |  
| `GovtID_Type`      | `text` |  
| `ID_Number`      | `number` |  
| `Category`      | `text` |  
| `Load_Applied (in KV)`      | `number` |  
| `Date_of_Application`      | `text` |  
| `Date_of_Approval`      | `text` |  
| `Modified_Date`      | `text` |  
| `Status`      | `text` |  
| `Reviewer_ID`      | `number` |  
| `Reviewer_Name`      | `text` |  
| `Reviewer_Comments`      | `text` |  




## How to Setup

#### Frontend Setup 
To Setup this project on your system, first come into CLIENT Folder and trigger 

##### install node modules
```bash
  npm i
```
#####  run the FE
```bash
  npm start
```

#### Backend Setup
To Setup this project on your system, first come into Server Folder and trigger 

##### create a virtual env
```bash
  python3 -m venv venv
```
##### activate virtual env
```bash
  .\venv\Scripts\activate
```
##### Install packages
```bash
  pip install -r requirements.txt
```
##### create a .env file

##### Add MONGO_URI and SECRET_KEY of mongoDB

##### Run run.py
```bash
  python3 run.py
```
## Tech Stack

**Client:** React, Redux, Redux Toolkit

**Server:** Flask, pymongo 

**Database:** mongoDB

