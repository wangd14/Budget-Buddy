# Budget Buddy

## Setting up your acount
1. Make a mongodb account (if you don’t already have one)
2. Create a database
3. Remember your connection string

## Setting up your development server
1. CLONE THIS REPOSITORY 
2. ```cd apidocs```
3. ```npm i```
4. ```npm build```
5. ```cd ../frontend```
6. ```npm i```
7. ```npm run build```
8. ```cd ..```
12. ```npm i```
1. ```sudo nano .env```
1. Put that connection string into the .env file you just made. Your .env file should look like this
    - ```MONGODB=(insert connection string here)```
1. Save the .env file
    - CTRL+O
    - CTRL+X
1. ```node --env-file=.env server.js```
1. Go to ```localhost:3000``` on any web browser 
