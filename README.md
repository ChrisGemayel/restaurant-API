# restaurant-API
Micro-services Architecture Restaurant API

### Prerequisites

`Docker`
`Docker-compose`

### Running the environment

In order to run all 8 containers navigate to root directory
and run the command:
`docker-compose up`
Both docker and docker-compose are a must.

### Backend Requests
Restaurant API – Database MongoDb:

`POST http://localhost:6003/restaurant/create` : Add an item to the menu. Example of body: {"name":"Antho's special burger", "price" : 43}

`GET http://localhost:6003/restaurant/getall` : Returns all the menu 

`POST http://localhost:6003/restaurant/` : in the body we have the ID of the item, we fetch it from mongodb and return the json object (which has details such as price … etc) example of body: {"_id": 123}

Ordering Service API – Database PostgreSQL:

`POST http://localhost:6002/order/` : takes from the shopping cart the array of json object (in the body), goes through it and adds to the postgres database time, ID of user, array of integers of all the IDs of ordered items and the total cost (which is calculated by going through the json object array) 

`GET http://localhost:6002/order/user` : has the ID of the user in the header and returns all the orders he had made (fetches it from the DB)

`GET http://localhost:6002/order/` : has the ID of the order in the header and fetches it from the database and returns it

User API – Database PostgreSQL: 

`POST http://localhost:6001/user/register` : takes first name, last name, email, phonenumber and address (an ID is autogenerated)

`GET http://localhost:6001/user/` : has user ID in header and fetches it from the Database

`GET http://localhost:6001/user/all` : fetches all the users


Shopping Cart API - Redis: 

`POST http://localhost:6000/shoppingCart` : Add JSON object to the array of json objects, it has the user id in the header "user" and the body would look like: {"name":"Antho's special burger", "price" : 43}

`POST http://localhost:6000/shoppingCart/checkOut` : returns the array of json objects and deletes it from the memory, note: takes no body and only the header "user" which is the id of the user invoking it

`GET http://localhost:6000/shoppingCart` : returns the shopping cart of the user, the id of the user would be in the header
