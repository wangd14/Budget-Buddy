# /user/:uid

## Info

API endpoint responsibile for individual user account manipulation

## GET 

  #### Returns all data associated with a user
### Parameters 

|Key|Value|Required|   
|-|-|-|
|"uid"|user id|yes|
|"token"|user authentication token|yes|

### Responses

|Condition|Status Code|Comments|
|-|-|-|
|Success|200|Return all user info|
|Unauthorized|401|User does not have the permissions to query this resource|
|Server Error|500|An error occured server-side|


#### 200
```json
{
  "message": "Success",
  "data": {
    "uid": 0,
    "fname": "Adam",
    "lname": "Todd",
    "email": "todda@rpi.edu",
    "orgs": [
      0,
      1,
      2
    ],
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

  #### Update user info
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
|Success|200|Specified fields have been updated|
|Unauthorized|401|User does not have the permissions to perform this action|
|Server Error|500|An error occured server-side|


#### 200
```json
{
  "message": "Data successfully updated",
  "data": {
    "updated_key_1": "updated_value_1"
  }
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

## DELETE

  #### Delete user
### Parameters 

|Key|Value|Required|   
|-|-|-|
|"uid"|user id | yes, or email |
|"email"|user email|yes, or uid|
|"token"|use_authentication_token|yes|

### Responses

|Condition|Status Code|Comments|
|-|-|-|
|Success|200|User has been deleted|
|Unauthorized|401|User does not have the permissions to perform this action|
|Server Error|500|An error occured server-side|


#### 200
```json
{
  "message": "Account sucessfully deleted"
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


