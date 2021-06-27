# Functionalities

This is an `Employee management` application where a user can,

- Create a person
  `user should create a person, where each person has just name.`

- List all un assinged person
  `user can view all persons who are not linked to companies, and have the opportunity to link them in Assign company to a person `

- Create a company :
  `user should also be able to choose a company and then get all employees list
- List all employees in a company
  `user can select a company and will be able to list all the employees in a company.`

- Assign company to a Person
  `user can assigne a not assigned person to a comapny`

# Techstack

### Frontend:

- React JS
- Meterial UI
- React Router
- Prettier

### Backend:

- Express JS
- Sequelize
- Prettier

### Database

- Sqlite

# Implementation Details

### Database:

`Sqllite` a in memory database is used a database to this application. More info : https://www.sqlite.org/index.html

**Tables**

- Company

```
 name
 id
```

- User

```
id
name
companyId (foriegn key to company id)
```

### Service

Service is developed using `express js`. Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. More info https://expressjs.com/

- Used `sequelize (https://sequelize.org/)` as ORM , created the db connect & the models.
- Used `prettier (https://www.npmjs.com/package/prettier)` for formatting the code

### UI

UI developd in `React JS`. A JavaScript library for building user interfaces, more info: https://reactjs.org/

- Used `Meterial UI (https://material-ui.com/)` for developing components
- User `react-router (https://reactrouter.com/)` for routing.
- Used `prettier (https://www.npmjs.com/package/prettier)` for formatting the code

# Project Structure

**backend**: All service code resides in the /backend folder.

```
	/backend
		/db
		  - database.sqllite
		   /models
           - All modles goes here
		/routes
		   - All routes goes here
		/scripts
			- setup scripts goes here
		- rest
```

**frontend**: All UI code resides in the /backend folder.

```
	/frontend
		/src
			/company
				- company components goes here
			/person
				- person related components goes here
			/dashboard
				- Main dashboard component
			/router
				- navigation realted setup goes here
			- rest
```

# Project Setup

- **Clone/Download Repo : ** `git clone <repo_url>`

- **Move to the Project : ** `cd <path_to_project>`

- **Install dependies** : `yarn install`
  This will install both the frontend & backend packages. Alternatively you can go to `/frontend` & `/backend` folders and run `yarn install`.

- **Backend setup** : `yarn backend-setup`
  This will create a database.sqlilite in `/backend/db/database.sqlilite`. It also creates the required table. If you re run the command again then the data won't override. This should be a one time setup.

- **Start Application**: `yarn start`
  This will start both the backend, fronted apps. Frontend runs on port `3000` and backend runs on port `4000`

- **Check** :
  Open browswer and hit `localhost:3000` and Enjoy!!
