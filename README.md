# Solar View Cinema
Solar View Cinema is a newly established cinema exhibiting company in Brisbane. The company's goal is to bring the highest quality movie entertainment to Brisbane citizens while keeping the ticket fees at the minimum. Solar View Cinema has recently launched an web app called "SVC Cinema App" that provides Brisbane citizens to make seat reservations for their favourite movies online.

#Business Rules
1. Customers are required to register an account on the website, to be able to book a movie ticket. 

2. Non-registered customers can still browse movies and its information despite unable to make booking.  

3. Customers can book 1 movie ticket each time and their booked ticket will be saved in their account under ‘Ticket section’. 

4. Customers have the options of changing movies and movie day and time sessions before the booked session begin. 

5. The payment for booking movie ticket will be done online 

6. When arriving at the cinema, the customer will need to show their booked tickets on their app to Solar View Cinema employees.  

7. The ticket will be expired 20 minutes after the movie’s show time begin.  

8. Ticket is booked by cinema location. The cinema location details must be corresponding with the cinema location customers will be attending.  

9. Customer must be at least 15 years old to register an account. 

10. If the customer has booked a student ticket, a student ID is required to be provided to the employee before entering the cinema room. 

# Pre-made Accounts 
Customer Account => Username: whoryou || Password: Iamu

Administrator Account => Username: hanate || Password: rice

#GitHub Repository
https://github.com/marsh826/Solar-View-Cinema

#Web App and Admin Panel access
The web app can be accessed on 

The admin panel can be accessed on

#Local Installation on Development Environment
Be sure to have React installed in order to access both web app and admin panel in development environment

If installing on a new development environment, run the command lines below if you don't see a node_modueles folder in the repo. 
Change the fetch request links to the ones that corresponds to your own domain name instead of localhost and update the HTTP Referers as your IP Address and Domain name located in the api.php file.

To redirect to the folder you want to access:
-Redirect to web app
cd appcinema

-Redirect to admin panel
cd admincinema

npm install 
Installs the node_modules folder that contains the dependencies

npm start 
Starts development server

npm run build
Create a build version of the app that merges all your CSS files into one file, and does the same with your JavaScript for production.

npm test
Starts the test runner

#Enabling React Service Worker
After the app was build into production using npm build, you can enable React Service Worker by:

yarn global add server
Install the global dependency on serve

serve -s build
Each time a new build is generated, deploy the app

#Technology used for both Web App and Admin Panel
Front End
- With some basic implementation of HTML5, CSS3 and JavaScript in React Components
-Layout Framework: Material UI version 4.11.1
-React (JavaScript Library) implemented into the projects by local installation and command prompt

Back End
-PHP Hypertext Preprocessor Version 7.3.12
-phpMyAdmin
-MySQL
-Server Software: Apache/2.4.41 (Win64) PHP/7.3.12
-WAMP Version 3.2.0 - 64bit

3rd Party Technologies
-Visual Studio Code - used as code editor
-React Hook Forms for form validation on both web app and admin panel










