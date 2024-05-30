# /auth

## Info

Top level API endpoint responsibile for user authorization: signin and signup

## GET

  #### Sign In
### Parameters 

|Key|Value|Required|   
|-|-|-|
|"user"|username|yes|
|"pass"|hashed password|yes|


### Responses

|Condition|Status Code|Comments|
|-|-|-|
|Success|200|Indicates user has successfully logged in, and returns an access token|
|Wrong user/pass|401|Indicates that the user's username and password did not match|
|Server Error|500|An error occured server-side|


#### 200
```json
{
  "message": "Sign in sucessful",
  "token": <user authentication token>
}
```

#### 401
```json
{
  "message": "Username and Password did not match"
}
```

#### 500
```json
{
  "message": "A server error occured"
}
```


## POST

  #### Sign Up
### Parameters 

|Key|Value|required|   
|-|-|-|
|"user"|username|yes|
|"pass"|hashed password|yes|
|"fname"|first name|yes|
|"lname"|last name|yes|
|"email"|email|yes|

### Responses

|Condition|Status Code|Comments|
|-|-|-|
|Success|201|Indicates user has successfully signed up, and returns an access token|
|Account already exists|403|Indicates that an account already exists with the user's email|
|Server Error|500|An error occured server-side|


#### 201
```json
{
  "message": "Sign up sucessful",
  "token": <user authentication token>
}
```

#### 403
```json
{
  "message": "An account already exists with that email"
}
```

#### 500
```json
{
  "message": "A server error occured"
}
```

## PUT 

#### Redirects to PUT /user/:id

## DELETE

#### Redirects to DELETE /user/:id
