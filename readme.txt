Hello! Thank you very much for taking the time to review this backend coding project.

This application utilizes Node.js, TypeScript, TypeORM and Postgres.

This is an online shop that has the following features:
- Product listing
    - Each product listing contains id, title, description, picture, price
- Search by title and description
    - Can search by either attribute *or* both.
- Checkout process
    - ProductLists start out with the "cart" attribute and later receive the "order" attribute during the checkout process.
- Additional functionality
    - Please refer to the "routes" folder for all additional functionality.

*** Steps to get started ***:

1.) Install Postgres: https://www.postgresql.org/download/
2.) Install Postico: https://eggerapps.at/postico/
3.) Install Postman: https://www.postman.com/downloads/
4.) Create a database in Postico called "shopdb".
5.) Verify your database name, password, and port match what is shown in the .env file.
6.) Execute "npm i" in the project directory.
7.) Execute "npm run dev" in terminal from source code folder.
8.) As a means of convenience, a Postman JSON file containing example route usage has been provided in /postman: "ts-shop-db.postman_collection.json"
9.) Use the provided Postman file to explore the functionality of the app.

*** Alternatively, Docker can be installed and used with this application.
docker-compose.yml has been provided for a dev instance.  simply run "make up" and docker will compose the application.


Some potential additions for consideration:
- uuid's instead of id's.
- Unit testing.
- Session/httpOnly cookie (attributes of session like "customerId" would be contained here and used for all api calls).
- Add logging for all interactions with database.
- Country/State/Origin attribute for Person/Customer. subsequently calculate tax during checkout.
- Provide means of uploading and hosting photos as binary in database.
- Inventory attribute of products:
    - Would essentially omit the opportunity for orders to be created when inventory doesn't exist.
- Shipping during checkout process? - are we selling digital or physical inventory?
- Seller entity? If we decide to create an ebay-type online shop, we could inherit the Person entity and create a Seller.
    - Products would be associated with a Seller.