[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)



# Shop

## Description
This project is the backend of a 'ecommerce' site (since its a backend, it has to be used using insomnia since it doesn't have a front end).  The database is mysql run through node.js through both mysql2 and sequelize.  The server is an express server also through node.js.


## Table of Contents

[Installation](#Installation)

[Usage](#Usage)

[Contributing](#Contributing)

[Tests](#Tests)

[License](#License)

cd[Questions](#Questions)

## Installation
There are many dependencies to the project so you need not only node.js installed, but also mysql installed.  The dependencies for Node.js (i.e. dotenv, express, mysql2, and sequelize) are all set up to be installed automatically by the program.  One important thing to remember before using the software, however, is that after you clone the repository, you need to fill out the required information in the .env file.  The database field is already filled in.  Assuming your using the root user, therefore, all you need to do is fill in your mysql password before using it. 

## Contributing
Any  potential contributions can be sent to the email address at the bottom of the page.

## Usage
After the repository is cloned and the .env file is fully filled out you need to get into your mysql account and SOURCE the db/schema.sql file and then seed the database through  the "npm run seed" command.  Before or after this you also need to run the "npm install" command to make sure you have all the required dependencies and then "npm start" to start the program.  This and the usage of the program is shown in this short video
[![Video]]("https://drive.google.com/file/d/1SekgI9xepSnxASSf8bYmcfLl-3Finr-p/view?usp=sharing")
[![Video]("https://drive.google.com/file/d/1SekgI9xepSnxASSf8bYmcfLl-3Finr-p/view?usp=sharing")]
<figure class="video_container">
  <iframe src="https://drive.google.com/file/d/1SekgI9xepSnxASSf8bYmcfLl-3Finr-p/view?usp=sharing" frameborder="0" allowfullscreen="true"> </iframe>


## Tests
There aren't any tests created for this program.

## License
This project has a/n MIT License

## Questions
This project can be accesed at github.com/bswiley/Shop.  If you have questions, please email me at bswiley@gmail.com.
