# Hotel Applicaton


### Architecture Notes
------------------
* Backend is written in Python and uses Django as the server
* For Database the system uses Postgresql for both local testing and production
* Frontend is written in React + Typescript
* The frontend communicates with the backend using REST architecture.

### Requirements
--------------------------

* docker
* docker-compose
* node.js


### How to run backend
--------------------------
Go to the backend directory and run the following commands:
(Note: make sure you create an .env file looking at the .env_sample provided)

```bash
make build
make migrate
make run
```

You can go to `localhost:8000` or `0.0.0.0:8000` to access the backend application.

### How to run Frontend
--------------------------
Go to the frontend directory and run the following commands:
(Note: make sure you create an .env file looking at the .env_sample provided)

```bash
npm install
npm start
```

You can go to `localhost:3000` to access the frontend application.

### Testing
--------------------------
#### Backend
You can run the entire backend test suite using:

```bash
make test
```

### API endpoint documentation
--------------------------

You can access the swagger documentation for api endpoints by going to ```http://0.0.0.0:8000/api/schema/swagger-ui```

### Features implemented
--------------------------
#### Backend

* PostgreSQL as the database
* Dockerzied the backend 
* Django server for serving the backend
* Signup and Login with Token Authentication System
* Custom user model
* Propery model to store the users favourite properties to the backend
* Swagger Documentation for the endpoints
* Endpoints for creating and receiving properties (user and property have many-many relationship)
* Filter available to request only the favourite properties of specific user
* Custom push and put/patch endpoint for the property model to meet out requirements
* Tests for creation of property, user, login and authentication and filtering

#### Frontend

* Register and Login Page
* React-Redux for authentication and state management for the entire frontend
* Product page which displays all the properties from the given public API dynamically
* The product page also displays the previously favourited properties of that user
* Allows to favourtie new property or even allows to remove favourite properties
* Logout functionality for the user to log out and other user to login

### Folder and File Descriptions: (only the important folders/files are listed)
--------------------------
    backend
    ├── app (main django folder which contains all the settings and routing)
    ├── docker
        ├── Dockerfile
    ├── properties (contains everything related to the property model/app)
        ├── models.py
        ├── filters.py
        ├── serializers.py
        ├── views.py
    ├──users (contains everything related to the user model)
        ├── models.py
        ├── routers.py
        ├── viewsets.py
        ├── serializers.py
    ├── docker-compose.yml
    ├── Makefile
    ├── manage.py
    ├── poetry.lock and pyproject.toml (for managing dependencies and project setup)

    frontend
    ├── src (folder with all the main components)
        ├── components
            ├── login.component.js
            ├── signup.component.js
            ├── Navigation.js
            ├── Navigation_logged_in.js
            ├── product.js (the main page with all the logics and content for displaying the properties)
        ├── routes
            ├──ProtectedRoute.tsx
        ├── store
            ├── slices
                ├── auth.ts
        ├── utils
            ├── axios.ts
            ├── types.ts
        ├── App.js (main file for the REACT App)

### Notes for the contributors
------------------------------
* To add any new feature please fork the repo and create a Pull Request with main
* If you find any bug please create a issue in the Github repo. For other security issue you can contact at `karkiaabishkar@gmail.com`.