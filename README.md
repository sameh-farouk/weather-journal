# Weather-Journal App Project

## Overview
This is un asynchronous web app that uses Web API and user data to dynamically update the UI.

## Server Side
api call
GET route that returns the latest entire on projectData object stored in server side 

```
http://{serverurl}/latest
```

POST route that anticipate receiving three pieces of data from the request body
- temperature
- date
- user response
data will be stored on projectData object in server side 

```
http://{serverurl}/add
```
