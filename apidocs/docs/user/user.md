# /user

## Info

Top level API endpoint responsibile for mass user account manipulation

#### Database Schema

```json
{
  //user id
  "uid": 0,
  "fname": "Adam",
  "lname": "Todd",
  "email": "todda@rpi.edu",
  "username": "SickIGN",
  "password": "hashed_pass",
  //list of orgIDs user has access to
  "orgs": [
    0,
    1,
    2
  ],
  "exists": true
}
```

## GET 

  #### Returns list of all users
### Parameters 

|Key|Value|Required|   
|-|-|-|
|"page"|page index, default 0|no|
|"token"|use_authentication_token|yes|

### Responses

|Condition|Status Code|Comments|
|-|-|-|
|Success|200|Returns list of all user's IDs and emails, paginated|
|Unauthorized|401|User does not have the permissions to query this resource|
|Server Error|500|An error occured server-side|


#### 200
```json
{
  "message": "Success",
  "data": [
    {
      "uid": 0,
      "email": "todda@rpi.edu"
    },
    {
      "uid": 1,
      "email": "morris10@rpi.edu"
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

#### Redirects to POST /auth


## PUT 

  #### Mass update all users
### Parameters 

|Key|Value|Required|   
|-|-|-|
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
  "message": "Data successfully updated"
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

  #### Delete all users
### Parameters 

|Key|Value|Required|   
|-|-|-|
|"token"|use_authentication_token|yes|

### Responses

|Condition|Status Code|Comments|
|-|-|-|
|Success|200|All users have been deleted|
|Unauthorized|401|User does not have the permissions to perform this action|
|Server Error|500|An error occured server-side|


#### 200
```json
{
  "message": "Accounts sucessfully deleted"
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


