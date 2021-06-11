<?php
// The API requires the dbsession.php file that manages the web service session. 
// The dbsession.php file is located in the same folder location as this api.php file
require('dbsession.php');

// CORS Headers are important for React App to function, or else it will be blocked 
// due to the app not being in the same origin as the API link that is used for API fetch
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: origin, content-type, accept");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, ~OPTIONS");
header("Access-Control-Allow-Origin: http://localhost:3000");
// header("Access-Control-Allow-Origin: https://solarviewcinema.malloriecini.com");
header("Access-Control-Allow-Credentials: true");

// The if statement is checking for pre-exisitng session,
// if the session object is not found, a new one will be created
if(!isset($_SESSION['session'])){
    $_SESSION['session'] = new sessionOBJ;
}
// The API requires the dbconnection.php file that talks to the database and 
// perform certain database queries. The dbconnection.php file is located in 
// the same folder location as this api.php file
require('dbconnection.php');

// Establishing connection to the database through database object
$db = new databaseOBJ;
// Sanitise data sent via POST and SEND methods
function testInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    $data = htmlentities($data);
    return $data;
}

// Rate Limiter Activation
if($_GET["action"] == "logout") {
    // Allow the user to logout despite rate limit exceeded
} else {
    // If the daily request limit has been exceeded, block any other incoming requests
    if($_SESSION['session']->dailyrequestLimit() == true) {
        http_response_code(422);
        die();
    }
    // If the user breaks the rate limit by sending more than one request in one second, block any other incoming requests
    if($_SESSION['session']->rateLimit() == true) {
        http_response_code(429);
        die();
    }
}

// // IP Whitelisting
if(!isset($_SERVER['HTTP_REFERER'])) {
    $_SERVER['HTTP_REFERER'] = 0;
}

// Domain Locker
if(
    $_SERVER['HTTP_REFERER'] == "http://localhost:3000/" || $_SERVER['HTTP_REFERER'] == "http://localhost:3000/admin/"
    || $_SERVER['HTTP_REFERER'] == "http://192.168.0.8:3000"
    //  || $_SERVER['HTTP_REFERER'] == "https://solarviewcinema.malloriecini.com/" 
    // || $_SERVER['HTTP_REFERER'] == "https://solarviewcinema.malloriecini.com/admin/"
    ) {
    // Allow user access and proceed requests with valid URL
} else {
    // Prevent access or any incoming request from invalid URL
    http_response_code(404);
    die();  
}

// Checking for IP Address
if ($_SERVER['REMOTE_ADDR'] !== "[::1]:80") {
    http_response_code(501);
}

    


// Insert activities into the userlog table in the database
$_SESSION['session']->lastSessionRequest();
$IPAddress = $_SERVER['REMOTE_ADDR'];
date_default_timezone_set("Australia/Brisbane");
$Time = date('Y-m-d H:i:s', $_SERVER['REQUEST_TIME']);
$BrowserType = $_SERVER['HTTP_USER_AGENT'];
$Activity = $_SERVER['QUERY_STRING'];
if(isset($_SESSION["UserID"])) {
    $userID = $_SESSION["UserID"];
} else {
    $userID = null;
}
$db->activityLogInsert($IPAddress, $Time, $BrowserType, $Activity, $userID);
    
// Preventing access or modification via api action link
if(!isset($_GET['action'])) {
    http_response_code(501);
    die;
    echo "HTTP ERROR 500 - INTERNAL SERVER ERROR";
} else {
    switch($_GET['action']) {
// -----------------------------------Login----------------------------------------------------------------------------
    case 'login': 
        // A super global variable which is used to collect data from REQUEST METHOD that is POST
        $_SERVER['REQUEST_METHOD'] == 'POST';
        $objreg = json_decode(file_get_contents("php://input"), true);
        $usernamelogin = testInput($objreg['username']);
        $passwordlogin = testInput($objreg['password']);
        $IPAddress = $_SERVER['REMOTE_ADDR'];
        date_default_timezone_set("Australia/Brisbane");
        $Time = date('Y-m-d H:i:s', $_SERVER['REQUEST_TIME']);
        $BrowserType = $_SERVER['HTTP_USER_AGENT'];
        $Activity = $_SERVER['QUERY_STRING'];
        if($db->login($usernamelogin, $passwordlogin, $IPAddress, $Time, $BrowserType, $Activity)){
            // When the login attempt is successful
            echo json_encode($_SESSION["UserID"]);
            http_response_code(202);
        } else {
            // When the login attempt is unsuccessful
            http_response_code(403);
        }
    break;
// -------------------------------------------------Checking Log In Status---------------------------------------------
    case 'loginstatus':
        // A super global variable which is used to collect data from REQUEST METHOD that is POST
        $_SERVER['REQUEST_METHOD'] == 'GET';
        if($_SESSION['session']->logged_in_check()){
            // If the user is still logged in
            http_response_code(202);
        } else {
            // If the user is not logged in
            http_response_code(401);
        }
    break;
// --------------------------------------------------Logout------------------------------------------------------------
    case 'logout':
        // A super global variable which is used to collect data from REQUEST METHOD that is POST
        $_SERVER['REQUEST_METHOD'] == 'POST';
        // Checking if the user is logged in
        if($_SESSION['session']->logout()){
            // successful log out
            http_response_code(202);
        }
    break;
// --------------------------------------------------Register----------------------------------------------------------
    case 'register':
        // A super global variable which is used to collect data from REQUEST METHOD that is POST
        $_SERVER['REQUEST_METHOD'] == 'POST';
        $objreg = json_decode(file_get_contents("php://input"), true);
        $firstname = testInput($objreg['FirstName']);
        $lastname = testInput($objreg['LastName']);
        $dateofbirth = testInput($objreg['DateOfBirth']);
        $email = testInput($objreg['Email']);
        $phone = testInput($objreg['Phone']);
        $usernamereg = testInput($objreg['UsernameReg']);
        $passwordreg = testInput($objreg['PasswordReg']);
        if($db->registration($firstname, $lastname, $dateofbirth, $email, $phone, $usernamereg, $passwordreg)){
            http_response_code(202);
        } else {
            http_response_code(406);
        }
    break;
// ------------------------------------Display Profile-----------------------------------------------------------------
    case 'displayprofile':
        // A super global variable which is used to display data from REQUEST METHOD that is GET 
        $_SERVER['REQUEST_METHOD'] == 'GET';
        if($_SESSION['session']->logged_in_check()) {
            $result = $db->displayProfile();
            // If the database cannot fetch the profile
            if($result == false) {
                http_response_code(503);
            } else {
            // If the database can fetch the profile
            echo json_encode($result);
            http_response_code(201);
            }
        } else {
            // If the user is not logged in
            http_response_code(401);
        }
    break;
// ---------------------------------Delete Profile---------------------------------------------------------------------
    case 'deleteprofile':
        // A super global variable which is used to collect data from REQUEST METHOD that is POST
        $_SERVER['REQUEST_METHOD'] == 'POST';
        if($_SESSION['session']->logged_in_check()) {
            $objreg = json_decode(file_get_contents("php://input"), true);
            $userID = testInput(($objreg['userid']));
            if($db->deleteProfile($userID)){
                // After successful account delete, activate logout function to destroy the current session
                $_SESSION['session']->logout();
                http_response_code(202);
            } 
        } else {
            // Failed account removal 
            http_response_code(501);
        }
    break;
// -------------------------------Update Profile-----------------------------------------------------------------------
    case 'updateprofile':
        // A super global variable which is used to collect data from REQUEST METHOD that is POST
        $_SERVER['REQUEST_METHOD'] == 'POST';
        // Checking if the user is logged in
        if($_SESSION['session']->logged_in_check()) {
            $objreg = json_decode(file_get_contents("php://input"), true);
            $UsernameUPD = testInput($objreg["UsernameUpd"]);
            $PasswordUPD = testInput($objreg["PasswordUpd"]);
            $FirstNameUPD = testInput($objreg["FirstNameUpd"]);
            $LastNameUPD = testInput($objreg["LastNameUpd"]);
            $DateOfBirthUPD = testInput($objreg["DateOfBirthUpd"]);
            $PhoneUPD = testInput($objreg["PhoneUpd"]);
            $EmailUPD = testInput($objreg["EmailUpd"]);
            if($db->updateProfile($FirstNameUPD, $LastNameUPD, $DateOfBirthUPD, $EmailUPD, 
                $PhoneUPD, $UsernameUPD, $PasswordUPD)){
                // Successfully updated the form
                http_response_code(202); 
            } else {
                // Unsuccessfully updated the form
                http_response_code(406);
            }  
        } else {
            // If the user is not logged in 
            http_response_code(401);
        }
    break;
//-------------------------------------------Display Movies------------------------------------------------------------
    case 'displaymovies':
        // A super global variable which is used to display data from REQUEST METHOD that is GET 
        $_SERVER['REQUEST_METHOD'] == "GET";   
        $result = $db->displayMovies();
        if($result == false) {
            // Failed fetch all Movies from the database
            http_response_code(204);
        } else {
            // Return as JSON output after successful fetchAll Movies  from the database
            http_response_code(201);
            echo json_encode($result);
        }  
    break;
//-----------------------------------------Display 3 latest movies-----------------------------------------------------
    case 'displaylatestmovies':
        // A super global variable which is used to display data from REQUEST METHOD that is GET 
        $_SERVER['REQUEST_METHOD'] == "GET";
        $result = $db->displayLatestMovies();
        if($result == false) {
            // Failed fetch 3 latest movies from the database
            http_response_code(204);
        } else {
            // Successfully fetch 3 latest movies from the database 
            http_response_code(201);
            echo json_encode($result);
        }
    break;
//--------------------------------------------Add Movie to Favourite List----------------------------------------------
    case 'addfavouritemovie':
        // A super global variable which is used to collect data from REQUEST METHOD that is POST
        $_SERVER['REQUEST_METHOD'] == "POST";
        $objreg = json_decode(file_get_contents("php://input"), true);
        $movieid = testInput($objreg["movieid"]);
        if($_SESSION['session']->logged_in_check()) {
            if($db->addFavouriteMovie($movieid) == true){
                // Successfully adding movie to the user favourite movie list
                http_response_code(202);
            } else {
                // Unsuccessfully adding movie to the user favourite movie list
                if($db->addFavouriteMovie($movieid) == false){
                http_response_code(501);
                }
            }
        } else {
            // If the user is not logged in
            http_response_code(401);
        }
    break;
// ----------------------------------------Display Favourite Movie List------------------------------------------------
    case 'displayfavouritelist':
        // A super global variable which is used to display data from REQUEST METHOD that is GET
        $_SERVER['REQUEST_METHOD'] == 'GET';
        $result = $db->displayfavouritelist();
        if($_SESSION['session']->logged_in_check()){
            if($result == true){
                // Successfully display watchlist
                http_response_code(201);
                echo json_encode($result);
            } else {
                //  Display none due to empty data
                http_response_code(204);
            }    
        } else {
            // If the user is not logged in
            http_response_code(401);
        }
    break;
// -----------------------------------------Remove Favourite Movie-----------------------------------------------------
    case 'removefavouritemovie':
        // A super global variable which is used to collect data from REQUEST METHOD that is POST
        $_SERVER['REQUEST_METHOD'] == 'POST';
        $objreg = json_decode(file_get_contents("php://input"), true);
        $favouritemoviedelete = testInput($objreg['favouritelist']);
        if($_SESSION['session']->logged_in_check()){
            if($db->removefromFavouriteList($favouritemoviedelete)){
                // Removing movie from favourite list
                http_response_code(202);
            } else {
                // Failed to remove movie from favourite list
                http_response_code(501);
            }
        } else {
            // If the user is not logged in
            http_response_code(401);
        }
    break;
// ------------------------------------------Display Movie Session-----------------------------------------------------
    case 'displaymoviesession':
        // A super global variable which is used to collect data from REQUEST METHOD that is POST
        $_SERVER['REQUEST_METHOD'] == 'POST';
        $objreg = json_decode(file_get_contents("php://input"), true);
        $movie = testInput(($objreg['movieid']));
        $result = $db->displayMovieSession($movie);
        if($result == false) {
            // Failed fetch all Movie Sessions from the database
            http_response_code(204);
        } else {
            // Return as JSON output after successful fetchAll Movie Sessions  from the database
            http_response_code(201);
            echo json_encode($result);
        }
    break;
// -----------------------------------------Display Seats--------------------------------------------------------------
    case 'displayseats':
        // A super global variable which is used to collect data from REQUEST METHOD that is POST
        $_SERVER['REQUEST_METHOD'] == 'POST';
        $objreg = json_decode(file_get_contents("php://input"), true);
        $moviesession = testInput($objreg['moviesessionid']);
        $result = $db->displaySeats($moviesession);
        if($result == false) {
            // Failed fetch all seats from the database
            http_response_code(204);
        } else {
            // Successfully fetch all seats from the database
            http_response_code(201);
            echo json_encode($result);
        }
    break;
// ------------------------------------------Display Ticket Type-------------------------------------------------------
    case 'displaytickettype':
        // A super global variable which is used to display data from REQUEST METHOD that is GET
        $_SERVER['REQUEST_METHOD'] == 'GET';
        $result = $db->displayTicketTypes();
        if($result == false) {
            // Failed fetch all ticket types from the database
            http_response_code(204);
        } else {
            // Successfully fetcthed all ticket types from the database
            http_response_code(201);
            echo json_encode($result);
        }
    break;
// --------------------------------------------Seat Reservation--------------------------------------------------------
    case 'seatreserve':
        // A super global variable which is used to collect data from REQUEST METHOD that is POST
        $_SERVER['REQUEST_METHOD'] == 'POST';
        $objreg = json_decode(file_get_contents("php://input"), true);
        $seatID = testInput($objreg['seatbysessionid']);
        $tickettypeID = testInput($objreg['tickettypeid']);
        if($_SESSION['session']->logged_in_check()){
            if($db->seatReservation($seatID, $tickettypeID)){
                // Successfully booked a seat
                http_response_code(202);
            } else {
                // Unsuccessfully booked a seat
                http_response_code(406);
            }
        } else {
            // If the user is not logged in
            http_response_code(401);
        }
    break;
// -------------------------------------------Display Booked Ticket----------------------------------------------------
    case 'displayticket':
        // A super global variable which is used to display data from REQUEST METHOD that is GET
        $_SERVER['REQUEST_METHOD'] = 'GET';
        $result = $db->displayBookedTicket();
        if($_SESSION['session']->logged_in_check()) {
            if($result == false) {
                // Failed fetch all ticket from the database
                http_response_code(204);
            } else {
                // Successfully fetching all ticket from the database
                http_response_code(201);
                echo json_encode($result);
            }
        } else {
            // If the user is not logged in
            http_response_code(401);
        }
    break;
// -------------------------------------Display Movie Sessions for Ticket Update---------------------------------------
    case 'displayallsessions':
        // A super global variable which is used to display data from REQUEST METHOD that is GET
        $_SERVER['REQUEST_METHOD'] == 'GET';
        $result = $db->displayAllSessions();
        if($_SESSION['session']->logged_in_check()) {
            if($result == false) {
                // Failed fetch all Movies from the database
                http_response_code(204);
            } else {
                // Return as JSON output after successful fetchAll Movies  from the database
                http_response_code(201);
                echo json_encode($result);
            }
        } else {
            // If the user is not logged in
            http_response_code(401);
        }
    break;
//-----------------------------------------Update Movie Ticket---------------------------------------------------------
    case 'updateticket':
        // A super global variable which is used to collect data from REQUEST METHOD that is POST
        $_SERVER['REQUEST_METHOD'] == 'POST';
        $objreg = json_decode(file_get_contents("php://input"), true);
        $seatUPDT = testInput($objreg['seatinfoUPDT']);
        $tickettypeUPDT = testInput($objreg['tickettypeUPDT']);
        $ticketID = testInput($objreg['ticketid']);
        if($_SESSION['session']->logged_in_check()){
            if($db->updateTicket($seatUPDT, $tickettypeUPDT, $ticketID)) {
                // Successfully updated ticket
                http_response_code(202);
            } else {
                // Unsuccessfully updated ticket
                http_response_code(406);
            }  
        } else {
            // If the user is not logged in
            http_response_code(401);
        }
    break;
// ----------------------------------------Delete Movie Ticket---------------------------------------------------------
    case 'deleteticket':
        // A super global variable which is used to collect data from REQUEST METHOD that is POST
        $_SERVER['REQUEST_METHOD'] == 'POST';
        $objreg = json_decode(file_get_contents("php://input"), true);
        $ticketDelete = testInput($objreg['ticketid']);
        if($_SESSION['session']->logged_in_check()) {
            if($db->deleteTicket($ticketDelete)) {
                // Successfully delete booked ticket from database
                http_response_code(202);
            } else {
                // Unsuccessfully delete booked ticket from database
                http_response_code(501);
            }
        } else {
            // If the user is not logged in
            http_response_code(401);
        }
    break;
// ----------------------------------------Default 500 ERROR-----------------------------------------------------------
    default:
        http_response_code(500);
    break;
// --------------------------------------Admin Login-------------------------------------------------------------------
    case 'adminlogin':
        // A super global variable which is used to collect data from REQUEST METHOD that is POST
        $_SERVER['REQUEST_METHOD'] == 'POST';
        $objreg = json_decode(file_get_contents("php://input"), true);
        $usernameAdmin = testInput($objreg['adminUsername']);
        $passwordAdmin = testInput($objreg['adminPassword']);
        $IPAddress = $_SERVER['REMOTE_ADDR'];
        date_default_timezone_set("Australia/Brisbane");
        $Time = date('Y-m-d H:i:s', $_SERVER['REQUEST_TIME']);
        $BrowserType = $_SERVER['HTTP_USER_AGENT'];
        $Activity = $_SERVER['QUERY_STRING'];
        if($db->adminLogin($usernameAdmin, $passwordAdmin, $IPAddress, $Time, $BrowserType, $Activity)){
            // When the admin login attempt is successful
            echo json_encode($_SESSION["UserID"]);
            echo json_encode($_SESSION["UserType"]);
            http_response_code(202);
        } else {
            // When the admin login attempt is unsuccessful
            http_response_code(403);
        }
    break;
// ---------------------------------Display Activity Log in Admin Dashboard--------------------------------------------
    case 'displaydashboard':
        // A super global variable which is used to display data from REQUEST METHOD that is GET
        $_SERVER['REQUEST_METHOD'] == 'GET';
        $result = $db->displayDashBoard();
        if($_SESSION['session']->logged_in_check()) {
            if($result == false) {
                // Failed fetch all Movies from the database
                http_response_code(204);
            } else {
                // Return as JSON output after successful fetchAll Movies from the database
                http_response_code(201);
                echo json_encode($result);
            }
        } else {
            // If the admin is not logged in
            http_response_code(403);
        } 
    break;
// -------------------------------Display Movies in Admin Movie Session Section----------------------------------------
    case 'adminpresetmoviedata':
        // A super global variable which is used to display data from REQUEST METHOD that is GET
        $_SERVER['REQUEST_METHOD'] == 'GET';
        $result = $db->adminSelectMovieData();
        if($_SESSION['session']->logged_in_check()) {
            if($result == false) {
                // Failed to fetch all Movie data from the database
                http_response_code(204);
            } else {
                // Return as JSON output after successful fetchAll Movie data from the database
                http_response_code(201);
                echo json_encode($result);
            }
        } else {
            // If the admin is not logged in
            http_response_code(403);
        }
    break;
//-------------------------------------------Display Movies------------------------------------------------------------
    case 'admindisplaymovies':
        // A super global variable which is used to display data from REQUEST METHOD that is GET 
        $_SERVER['REQUEST_METHOD'] == "GET";   
        $result = $db->admindisplayMovies();
        if($result == false) {
            // Failed fetch all Movies from the database
            http_response_code(204);
        } else {
            // Return as JSON output after successful fetchAll Movies  from the database
            http_response_code(201);
            echo json_encode($result);
        }  
    break;
//-----------------------------------Display Movies Sessions-----------------------------------------------------------
    case 'admindisplaysession':
        // A super global variable which is used to display data from REQUEST METHOD that is GET 
        $_SERVER['REQUEST_METHOD'] == "GET";   
        $result = $db->admindisplaySession();
        if($result == false) {
            // Failed fetch all Movie Session from the database
            http_response_code(204);
        } else {
            // Return as JSON output after successful fetchAll Movie Session  from the database
            http_response_code(201);
            echo json_encode($result);
        }  
    break;
//-----------------------------------------Add A Movie ----------------------------------------------------------------
    case 'adminaddmovie':
        // A super global variable which is used to collect data from REQUEST METHOD that is POST
        $_SERVER['REQUEST_METHOD'] == 'POST';
        $objreg = json_decode(file_get_contents("php://input"), true);
        $movieName = testInput($objreg['MovieName']);
        $releaseDate = testInput($objreg['ReleaseDate']);
        $movieDescription = testInput($objreg['MovieDescription']);
        $genre = testInput($objreg['Genre']);
        $movieIMG = testInput($objreg['MovieIMG']);
        if($_SESSION['session']->logged_in_check()){
            if($db->adminAddMovie($movieName, $releaseDate, $movieDescription, $genre, $movieIMG)) {
                // Successfully added a movie
                http_response_code(202);
            } else {
                // Unsuccessfully added a movie
                http_response_code(406);
            }  
        } else {
            // If the user is not logged in
            http_response_code(403);
        }
    break;
// -----------------------------------Update A Movie-------------------------------------------------------------------
    case 'adminupdatemovie':
        // A super global variable which is used to collect data from REQUEST METHOD that is POST
        $_SERVER['REQUEST_METHOD'] == 'POST';
        $objreg = json_decode(file_get_contents("php://input"), true);
        $movieNameUPDT = testInput($objreg['MovieNameUpdt']);
        $releaseDateUPDT = testInput($objreg['ReleaseDateUpdt']);
        $movieDescriptionUPDT = testInput($objreg['MovieDescriptionUpdt']);
        $genreUPDT = testInput($objreg['GenreUpdt']);
        $movieIMGUPDT = testInput($objreg['MovieIMGUpdt']);
        $movieIDUPDT = testInput($objreg['MovieIDUpdt']);
        if($_SESSION['session']->logged_in_check()){
            if($db->adminUpdateMovie($movieNameUPDT, $releaseDateUPDT, $movieDescriptionUPDT, 
            $genreUPDT, $movieIMGUPDT, $movieIDUPDT)) {
                // Successfully updated a movie
                http_response_code(202);
            } else {
                // Unsuccessfully updated a movie
                http_response_code(406);
            }  
        } else {
            // If the Admin is not logged in
            http_response_code(403);
        }
    break;
// -----------------------------------Delete A Movie-------------------------------------------------------------------
    case 'admindeletemovie':
        // A super global variable which is used to collect data from REQUEST METHOD that is POST
        $_SERVER['REQUEST_METHOD'] == 'POST';
        if($_SESSION['session']->logged_in_check()) {
            $objreg = json_decode(file_get_contents("php://input"), true);
            $movieDelete = testInput(($objreg['movieid']));
            if($db->admindeleteMovie($movieDelete)){
                // Successfully delete a movie
                http_response_code(202);
            } else {
                // Unsuccessfully delete a movie
                http_response_code(406);
            }
        } else {
            // If the Admin is not logged in
            http_response_code(403);
        }
    break;
// ----------------------------------Add Movie Session-----------------------------------------------------------------
    case 'adminaddsession':
        // A super global variable which is used to collect data from REQUEST METHOD that is POST
        $_SERVER['REQUEST_METHOD'] == 'POST';
        $objreg = json_decode(file_get_contents("php://input"), true);
        $sessionDate = testInput($objreg['SessionDate']);
        $sessionTime = testInput($objreg['SessionTime']);
        $movie = testInput($objreg['MovieID']);
        if($_SESSION['session']->logged_in_check()){
            if($db->adminAddSession($sessionDate, $sessionTime, $movie)) {
                // Successfully added a movie
                http_response_code(202);
            } else {
                // Unsuccessfully added a movie
                http_response_code(406);
            }  
        } else {
            // If the user is not logged in
            http_response_code(403);
        }
    break;
// ----------------------------------Add Movie Session-----------------------------------------------------------------
    case 'adminupdatesession':
        // A super global variable which is used to collect data from REQUEST METHOD that is POST
        $_SERVER['REQUEST_METHOD'] == 'POST';
        $objreg = json_decode(file_get_contents("php://input"), true);
        $sessionDateUPDT = testInput($objreg['SessionDateUpdt']);
        $sessionTimeUPDT = testInput($objreg['SessionTimeUpdt']);
        $movieUPDT = testInput($objreg['MovieIDUpdt']);
        $movieSessionUPDT = testInput($objreg['MovieSessionIDUpdt']);
        if($_SESSION['session']->logged_in_check()){
            if($db->adminUpdateSession($sessionDateUPDT, $sessionTimeUPDT, $movieUPDT, $movieSessionUPDT)) {
                // Successfully added a movie session
                http_response_code(202);
            } else {
                // Unsuccessfully added a movie session
                http_response_code(406);
            }  
        } else {
            // If the user is not logged in
            http_response_code(403);
        }
    break;
// -----------------------------------Delete A Movie-------------------------------------------------------------------
    case 'admindeletesession':
        // A super global variable which is used to collect data from REQUEST METHOD that is POST
        $_SERVER['REQUEST_METHOD'] == 'POST';
        if($_SESSION['session']->logged_in_check()) {
            $objreg = json_decode(file_get_contents("php://input"), true);
            $sessionDelete = testInput(($objreg['moviesessionid']));
            if($db->admindeleteSession($sessionDelete)){
                // Successfully delete a movie session
                http_response_code(202);
            } else {
                // Unsuccessfully delete a movie session
                http_response_code(406);
            }
        } else {
            // If the Admin is not logged in
            http_response_code(403);
        }
    break;
    }
}
?>