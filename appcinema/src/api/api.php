<?php
// The API requires the dbsession.php file that manages the web service session. 
// The dbsession.php file is located in the same folder location as this api.php file
require('dbsession.php');
// CORS Headers are important for React App to function, or else it will be blocked 
// due to the app not being in the same origin as the API link that is used for API fetch
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: origin, content-type, accept");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
// The if statement is checking for pre-exisitng session,
// if there is an existing session, it will replace it with a new one
if(!isset($_SESSION['session'])){
    $_SESSION['session'] = new sessionOBJ;
}
// The API requires the dbconnection.php file that talks to the database and 
// perform certain database queries. The dbconnection.php file is located in 
// the same folder location as this api.php file
require('dbconnection.php');
// Establishing connection to the database
$db = new databaseOBJ;
// Sanitise data sent via POST and SEND methods
function testInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    $data = htmlentities($data);
    return $data;
}

switch($_GET['action']) {
// -----------------------------------Login--------------------------------------------
    case 'login': 
        // A super global variable which is used to collect data from REQUEST METHOD that is POST
        $_SERVER['REQUEST_METHOD'] == 'POST';
        $objreg = json_decode(file_get_contents("php://input"), true);
        $usernamelogin = testInput($objreg['username']);
        $passwordlogin = testInput($objreg['password']);
        if($db->login($usernamelogin, $passwordlogin)){
            // When the login attempt is successful
            echo json_encode($_SESSION["UserID"]);
            http_response_code(202);
        } else {
            // When the login attempt is unsuccessful
            http_response_code(403);
        }
        break;
// -------------------------------------------------Checking Log In Status------------------------------
    case 'loginstatus':
        // A super global variable which is used to collect data from REQUEST METHOD that is POST
        $_SERVER['REQUEST_METHOD'] == 'GET';
        if($_SESSION['session']->logged_in_check()){
            http_response_code(202);
        } else {
            http_response_code(401);
        }
        break;
// --------------------------------------------------Logout---------------------------------------------
    case 'logout':
        // A super global variable which is used to collect data from REQUEST METHOD that is POST
        $_SERVER['REQUEST_METHOD'] == 'POST';
        // Checking if the user is logged in
        if($_SESSION['session']->logout()){
            // successful log out
            http_response_code(202);
        }
        break;
// --------------------------------------------------Register-------------------------------------------
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
// ------------------------------------Display Profile----------------------------------------------------------
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
// ---------------------------------Delete Profile--------------------------------
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
// -------------------------------Update Profile------------------------------------------------
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
            // Reject data insert if the form is not fully filled
            if(empty($objreg["FirstNameUpd"]) && empty($objreg["LastNameUpd"]) 
                && empty($objreg["DateOfBirthUpd"]) && empty($objreg["EmailUpd"]) 
                && empty($objreg["PhoneUpd"]) && empty($objreg["UsernameUpd"]) 
                && empty($objreg["PasswordUpd"])){
                    http_response_code(406);
                    die;
                } else {
            if($db->updateProfile($FirstNameUPD, $LastNameUPD, $DateOfBirthUPD, $EmailUPD, 
                $PhoneUPD, $UsernameUPD, $PasswordUPD)){
                // If the user fully filled in the form
                http_response_code(202); 
                } 
            }    
            // If the user is not logged in   
        } else {
            http_response_code(401);
        }
    break;
//-------------------------------------------Display Movies------------------------------
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
//-----------------------------------------Display 3 latest movies--------------------------
    case 'displaylatestmovies':
    // A super global variable which is used to display data from REQUEST METHOD that is GET 
    $_SERVER['REQUEST_METHOD'] == "GET";
    $result = $db->displayLatestMovies();
    if($result == false) {
        // Failed fetch 3 latest movies from the database
        http_response_code(204);
    } else {
        http_response_code(201);
        echo json_encode($result);
    }
    break;
//--------------------------------------------Add Movie to Favourite List------------------
    case 'addfavouritemovie':
    // A super global variable which is used to collect data from REQUEST METHOD that is POST
    $_SERVER['REQUEST_METHOD'] == "POST";
    $objreg = json_decode(file_get_contents("php://input"), true);
    $movieid = testInput($objreg["movieid"]);
    if($db->addFavouriteMovie($movieid) == true){
        // Successfully adding movie to the user favourite movie list
        http_response_code(202);
    } else {
        // Unsuccessfully adding movie to the user favourite movie list
        if($db->addFavouriteMovie($movieid) == false){
        http_response_code(501);
        }
    }
    break;
// ----------------------------------------Display Favourite Movie List-----------------
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
// -----------------------------------------Remove Favourite Movie-----------------------
    case 'removefavouritemovie':
    // A super global variable which is used to collect data from REQUEST METHOD that is POST
    $_SERVER['REQUEST_METHOD'] == 'POST';
    $objreg = json_decode(file_get_contents("php://input"), true);
    $favouritemoviedelete = testInput(($objreg['favouritelist']));
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
// ------------------------------------------Display Movie Session---------------------------
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
// -----------------------------------------Display Seats------------------------------------
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
        http_response_code(201);
        echo json_encode($result);
    }
    break;
// ------------------------------------------Display Ticket Type-----------------------------
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
// --------------------------------------------Seat Reservation---------------------------------
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
// -------------------------------Fetch booked seats for Seat Reservation Status----------------
    case 'seatstatuscheck':
    // A super global variable which is used to collect data from REQUEST METHOD that is POST
    $_SERVER['REQUEST_METHOD'] = 'POST';
    $objreg = json_decode(file_get_contents("php://input"), true);
    $movieSessionID = testInput($objreg["movieSessionID"]);
    $result = $db->getBookedSeats($movieSessionID);
    if($result == false) {
        // Failed fetch all booked tickets from the database 
        http_response_code(404);
    } else {
        // Successfully fetching all booked tickets from the database
        http_response_code(201);
        echo json_encode($result);
    }
    break;
// -------------------------------------------Display Booked Ticket-----------------------------
    case 'displayticket':
    // A super global variable which is used to display data from REQUEST METHOD that is GET
    $_SERVER['REQUEST_METHOD'] = 'GET';
    $result = $db->displayBookedTicket();
    if($result == false) {
        // Failed fetch all ticket from the database
        http_response_code(404);
    } else {
        // Successfully fetching all ticket from the database
        http_response_code(201);
        echo json_encode($result);
    }
    break;
// ------------------------------------------Display Movies for Ticket Update-------------------
    case 'displaymoviesupdt':
    // A super global variable which is used to display data from REQUEST METHOD that is GET 
    $_SERVER['REQUEST_METHOD'] = 'GET';
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
// -----------------------------------------Display Sessions for Ticket Update------------------
    case 'displaymoviesessionupdt':
    // A super global variable which is used to collect data from REQUEST METHOD that is POST
    $_SERVER['REQUEST_METHOD'] == 'POST';
    $objreg = json_decode(file_get_contents("php://input"), true);
    $movie = testInput($objreg['movieid']);
    $result = $db->displayMovieSession($movie);
    if($result == false) {
        // Fail fetch all Movie Sessions from the database
        http_response_code(204);
    } else {
        // Return as JSON output after successful fetchAll Movie Sessions  from the database
        http_response_code(201);
        echo json_encode($result);
    }
    break;
// ----------------------------------------Display Seats for Ticket Update----------------------
    case 'displayseatsupdt':
    // A super global variable which is used to collect data from REQUEST METHOD that is POST
    $_SERVER['REQUEST_METHOD'] == 'POST';
    $objreg = json_decode(file_get_contents("php://input"), true);
    $moviesession = testInput($objreg['moviesessionid']);
    $result = $db->displaySeats($moviesession);
    if($result == false) {
        // Failed fetch all seats from the database
        http_response_code(204);
    } else {
        http_response_code(201);
        echo json_encode($result);
    }
    break;
//-----------------------------------------Update Movie Ticket----------------------------------
    case 'updateticket':
    // A super global variable which is used to collect data from REQUEST METHOD that is POST
    $_SERVER['REQUEST_METHOD'] == 'POST';
    $objreg = json_decode(file_get_contents("php://input"), true);
    $seatUPDT = testInput($objreg['seatinfoUPDT']);
    $ticketID = testInput($objreg['ticketid']);
    if($db->updateTicket($seatUPDT, $ticketID)) {
        http_response_code(202);
    } else {
        http_response_code(406);
    }
    break;
// ----------------------------------------Delete Movie Ticket----------------------------------
    case 'deleteticket':
    // A super global variable which is used to collect data from REQUEST METHOD that is POST
    $_SERVER['REQUEST_METHOD'] == 'POST';
    $objreg = json_decode(file_get_contents("php://input"), true);
    $ticketDelete = testInput($objreg['ticketid']);
    if($_SESSION['session']->logged_in_check()){
        if($db->deleteTicket($ticketDelete)) {
            http_response_code(202);
        } else {
            http_response_code(501);
        }
    } else {
        // If the user is not logged in
        http_response_code(401);
    }
    break;    
}
?>