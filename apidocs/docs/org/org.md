# /org

## Info

Top level API endpoint responsibile for mass organization manipulation

#### Database Schema

```json
{
  "oid": 0,
  "orgname": "Josh and Co.",
  "users": [
    {"uid": 0, "budgetperms": [-1 /*-1 is all*/], "admin": 1},
    {"uid": 1, "budgetperms": [0, 1], "admin": 0}
  ],
  "receipts": [
    {
      "rid": 0,
      "location": "Walmart",
      "total": 54.39,
      "items": [
        //purchase IDs
        0,
        12,
        1
      ],
      "filepath": "./images/r0"
    }
  ],
  "goals": [
    {
      "gid": 0,
      "name": "New PC",
      "amnt": 599.99,
      "datecreated": "2/19/2059",
      "datedue": "2/18/2059"
    }
  ],
  "budgets": [
    {
      "bid": 0,
      "name": "Groceries",
      "amnt": 1000,
      "datecreated": "2/19/2059",
      "duration": "30d",
      "continuous": 1,
      "receipts": [
        0,
        13,
        1
      ]
    }
  ], 
  "transactions": [
    {
      "tid": 0,
      "item": "Master Chief Soap",
      "unitprice": 5.99,
      "qty": 12
    }
  ],
  "exists": true
},
//initialized as 
{
  "oid": 1,
  "orgname": "Dr. Callahan",
  "users": [
    //founding user
    {"uid": 0, "budgetperms": [-1], "admin": 1},
  ],
  "receipts": [],
  "goals": [],
  "budget": [], 
  "purchase": [],
  "exists": true
}
```

## GET 

  #### Returns list of all orgss
### Parameters 

|Key|Value|Required|   
|-|-|-|
|"page"|page index, default 0|no|
|"token"|use_authentication_token|yes|

### Responses

|Condition|Status Code|Comments|
|-|-|-|
|Success|200|Returns list of all orgs IDs and names, paginated|
|Unauthorized|401|User does not have the permissions to query this resource|
|Server Error|500|An error occured server-side|


#### 200
```json
{
  "message": "Success",
  "data": [
    {
      "oid": 0,
      "orgname": "Josh and Co."
    },
    {
      "oid": 1,
      "orgname": "Dr. Callahan"
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

#### Create new org

### Parameters 

|Key|Value|required|   
|-|-|-|
|"orgname"|organization name|yes|
|"token"|user_authentication_token|yes|

### Responses

|Condition|Status Code|Comments|
|-|-|-|
|Success|201|Indicates org has sucessfuly been created, returns org id|
|Server Error|500|An error occured server-side|


#### 201
```json
{
  "message": "Organization sucessfully created",
  "data": {
    "oid": "org id"
  }
}
```

#### 500
```json
{
  "message": "A server error occured",
  "error": "Some Error"
}
```


## PUT

|Key|Value|Required|   
|-|-|-|
|N/A|N/A|N/A|

### Responses

|Condition|Status Code|Comments|
|-|-|-|
|Method Not Allowed|405|Allow: GET, POST, DELETE|


#### 405 
```json
{
  "message": "PUT not allowed, GET, POST, or DELETE",
  "ALLOW": "GET, POST, DELETE"
}
```

## DELETE

  #### Delete all orgss
### Parameters 

|Key|Value|Required|   
|-|-|-|
|"token"|use_authentication_token|yes|

### Responses

|Condition|Status Code|Comments|
|-|-|-|
|Success|200|All orgs have been deleted|
|Unauthorized|401|User does not have the permissions to perform this action|
|Server Error|500|An error occured server-side|


#### 200
```json
{
  "message": "Organizations sucessfully deleted"
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


