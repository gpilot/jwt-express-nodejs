# jwt-express-nodejs
A demo of JWT implementation using ExpressJS

# Install
After clone, just run 

    npm install

# Run 

    node index.js

You can also define secret hash and timeout for generated token

    export SECRET=SOSECRET && export EXPIRE_TIME=60 && node index.js

# Use

Signin and get Token

    curl -X POST -H "Content-Type: application/x-www-form-urlencoded" -d 'username=user&password=pwd' "http://localhost:3000/signin"

Get authentified page (change YOUR_TOKEN with previous token)

    curl -X GET -H "Authorization: bearer YOUR_TOKEN" "http://localhost:3000/profile"

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/03086f67847d8f8d1e34)
Copy to Clipboard
