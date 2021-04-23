# swe642-hw4

The database schema is:
  ID IDENTITY PRIMARY KEY,
  STUDENTNAME VARCHAR(255),
  STUDENTID VARCHAR(10),
  SURVEYDATE DATE,
  STREET VARCHAR(255),
  CITY VARCHAR(255),
  STATE VARCHAR(2),
  ZIP VARCHAR(5),
  TELNUM VARCHAR(10),
  EMAIL VARCHAR(255),
  URL VARCHAR(255),
  LIKED ARRAY[6],
  HEARD VARCHAR(15),
  GRADMON VARCHAR(15),
  GRADYEAR VARCHAR(4),
  RECOMMEND VARCHAR(15),
  COMMENTS VARCHAR(255)

Where the date format is in the standard form "YYYY-MM-DD" or "YYYY-MM-DD HH:MM:SS" and the liked array is 6 boolean-type values that can be used to indicate if the corresponding box is checked.

Building and using the server application:
On windows run the command "./mvnw clean install && java -jar target/hw4.0.0.1.war"

Available pathways:
The root pathway is /api.

Saving a survey (/save):
  Requires: HTTP POST request where the body contains a JSON formated as:
  {
    "name": "%Name%",
    "studentid": "%studentid%",
    "surveydate": "YYYY-MM-DD",
    "street": "%street%",
    "city": "%city%",
    "state": "%state%",
    "zip": "%zip%",
    "telnum": "%telnum%",
    "email": "%email%",
    "url": "%url%",
    "liked": [B,B,B,B,B,B]
    "heard": "%heard%",
    "gradmon": "%gradmon%",
    "gradyear": "%gradyear%",
    "recommend": "%recommend%",
    "comments": "%comments%",
  }

  Returns an HTTP Response object with the a JSON representing the form as the request body.

Processing the 10 numbers(/data):
  Requires: HTTP POST request where the body contains a string of comma seperated numbers representing the input
  Returns: HTTP Response object with a JSON formated as:
    {
      "mean": %dbl_val,
      "stdDev": %dbl_val,
      "maxVal": dbl_val
    }

Listing all surveys(/list):
  Requires: HTTP GET request
  Returns: HTTP Response object containing a list of JSON objects:
    [
      {
      "id":%val,
      "studentid":%val
      },
      ...,
    ]
  Retrieve specific survey(/survey)
    Requires: HTTP Post request with the unique 'id' of the survey as the body.
    Returns: HTTP Response object, if the survey was found the body will contain a JSON object like what is returned from "/save". If the survey was not found, the response will have a value of noContent.

Issues:
  List all surveys does not work.
