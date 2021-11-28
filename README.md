# zendeskCodingChallenge
A Node.js app using Express.

Unit testing is done using Mocha and Chai.
## Running Locally

Make sure you have [Node.js](http://nodejs.org/) installed.

Clone the repo
```sh
$ git clone https://github.com/helloparthshah/zendeskCodingChallenge # or clone your own fork
$ cd zendeskCodingChallenge
```

Create a pwd.env file to store your details to connect to the api
```
PORT=<Port number>
ZENDESK_URL=<Your zendesk url>
EMAIL_ID=<email>
EMAIL_PASSWORD=<password>
```

Run the server
```sh
$ npm install
$ npm start
```

Access the webpage on localhost

## Design choices
The zendesk api is used in order to fetch 25 tickets a page. The rest api is designed in such a way that the page number and the number of tickets per page could be passed on as arguments. Viewing a single ticket gave me 2 conflicting ideas. First was using the zendesk api for getting a ticket which would result in api calls with ticket numbers to view indivisual tickets such as '/ticket/23'. Second approach, which I went with was to save the ticket that is being clicked on so that the saved ticked can be viewed in its separate window. I went with this approach since the ticket api didn't have any additional information and it doesn't make sense to fetch information that we already have. The server being used is an express server on node backend since it allowed me to host the webpages on the same server. I used ejs for templating so that I could pass in dynamic content from the backend. Finally I used chai and mocha for unit testing since they support express servers really well and are written entirely in javascript.
