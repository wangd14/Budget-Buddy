# /org/:oid/budget

## Info

API endpoint responsibile for mass budget manipulation

## GET 

  #### Returns list of all budgets for associated org
### Parameters 

|Key|Value|Required|   
|-|-|-|
|"page"|page index, default 0|no|
|"token"|user_authentication_token|yes|

### Responses

|Condition|Status Code|Comments|
|-|-|-|
|Success|200|Returns list of all budget IDs and names, paginated|
|Unauthorized|401|User does not have the permissions to query this resource|
|Server Error|500|An error occured server-side|


#### 200
```json
{
  "message": "Success",
  "data": [
    {
      "bid": 0,
      "budgetname": "Master Chief Soap"
    },
    {
      "bid": 1,
      "budgetname": "More Master Chief Soap, yes this is a budget"
    }
  ]
}
```

#### 401
```json
{
  "message": "You do not have permission to access this resource"
}
```

#### 500
```json
{
  "message": "A server error occured"
}
```

## POST 

#### Create new budget

### Parameters 

|Key|Value|type|required|   
|-|-|-|-|
|"name|budget name|string|yes|
|"amnt"|budget total|number|yes|
|"duration"|total duration of budget|unix time duration|yes|
|"continuous"|does budget refresh at the end of the duration|0 or 1|yes|
|"token"|user_authentication_token|string|yes|

### Responses

|Condition|Status Code|Comments|
|-|-|-|
|Success|201|Indicates budget has sucessfuly been created, returns budget id|
|Malformed Request|400|Required data is undefined or missing|
|Unauthorized|401|User does not have the permissions to query this resource|
|Server Error|500|An error occured server-side|


#### 201
```json
{
  "message": "Budget sucessfully created",
  "data": {
    "bid": 0
  }
}
```

#### 400
```json
{
  "message": "Missing parameters",
  "data": {
    "message": "The server processed the following data",
    "name": name received,
    "amnt": amnt received,
    "duration": duration received,
    "continuous": continuous received
  }
}
```

#### 401
```json
{
  "message": "You do not have permission to access this resource"
}
```

#### 500
```json
{
  "message": "A server error occurred",
  "error": error message
}
```


## PUT

|Key|Value|type|required|   
|-|-|-|-|
|"name|budget name|string|no|
|"amnt"|budget total|number|no|
|"duration"|total duration of budget|unix time duration|no|
|"continuous"|does budget refresh at the end of the duration|0 or 1|no|
|"token"|user_authentication_token|string|no|

### Responses

|Condition|Status Code|Comments|
|-|-|-|
|Success|201|Indicates budget has sucessfuly been created, returns budget id|
|Malformed Request|400|Required data is undefined or missing|
|Unauthorized|401|User does not have the permissions to query this resource|
|Server Error|500|An error occured server-side|


#### 201
```json
{
  "message": "Budget sucessfully created",
  "data": {
    "bid": 0
  }
}
```

#### 400
```json
{
  "message": "Missing parameters",
  "data": {
    "message": "The server processed the following data",
    "name": name received,
    "amnt": amnt received,
    "duration": duration received,
    "continuous": continuous received
  }
}
```

#### 401
```json
{
  "message": "You do not have permission to access this resource"
}
```

#### 500
```json
{
  "message": "A server error occurred",
  "error": error message
}
```


## DELETE

  #### Delete all budgets in org
### Parameters 

|Key|Value|Required|   
|-|-|-|
|"token"|use_authentication_token|yes|

### Responses

|Condition|Status Code|Comments|
|-|-|-|
|Success|200|All budgets have been deleted|
|Unauthorized|401|User does not have the permissions to perform this action|
|Server Error|500|An error occured server-side|


#### 200
```json
{
  "message": "Budgets sucessfully deleted"
}
```

#### 401
```json
{
  "message": "You do not have permission to perform this action"
}
```

#### 500
```json
{
  "message": "A server error occured"
}
```


