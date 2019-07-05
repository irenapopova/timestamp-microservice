# Timestamp Microservice

This service accepts a string as a parameter and will check whether it is either a human readable date or a Unix timestamp. If it is, it will return both the Unix timestamp and the natural language form of that date as a JSON object. If it is neither, it returns 'null' for those properties. 


A Full Stack Javascript application built using NodeJS and Express.
An API Project



## Example Output

```javascript

{
  "unix": 1562198400,

   "natural": "July 4, 2019"
 }
```

## To Run Project Locally
1. Fork this repo
2. Clone the fork
3. Install Dependencies: `$ npm install`
4. Start the Server: `$ node app.js`
5. Visit http://localhost:3000/
