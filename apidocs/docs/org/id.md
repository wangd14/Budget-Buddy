# /org/:oid

## Info

API endpoint responsibile for individual organization manipulation

## GET 

  #### Returns all data associated with an org
### Parameters 

|Key|Value|Required|   
|-|-|-|
|"oid"|org id|yes|
|"token"|use_authentication_token|yes|

### Responses

|Condition|Status Code|Comments|
|-|-|-|
|Success|200|Return all org info|
|Unauthorized|401|User does not have the permissions to query this resource|
|Server Error|500|An error occured server-side|


#### 200
```json
{
  "message": "Success",
  "data": {
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

|Key|Value|Required|   
|-|-|-|
|N/A|N/A|N/A|

### Responses

|Condition|Status Code|Comments|
|-|-|-|
|Method Not Allowed|405|Allow: GET, PUT, DELETE|


#### 405 
```json
{
  "message": "POST not allowed, GET, PUT, or DELETE",
  "ALLOW": "GET, PUT, DELETE"
}
```

## PUT 

  #### Update org info
### Parameters 

|Key|Value|Required|   
|-|-|-|
|"uid"|user id | yes, or email |
|"email"|user email|yes, or uid|
|"user"|username|no|
|"pass"|hashed password|no|
|"fname"|first name|no|
|"lname"|last name|no|
|"new_email"|new email|no|
|"token"|use_authentication_token|yes|

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
  "message": "Organizationss sucessfully deleted"
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


