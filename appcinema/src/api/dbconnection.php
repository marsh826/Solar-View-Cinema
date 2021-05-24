<?php
class databaseOBJ {
    private $dbconn;
    public $USERID;
    // Establish connection with the required database
    public function __construct() {
        $dbusername = "root";
        $dbpassword = "";
        $this->dbconn = new PDO("mysql:host=localhost; dbname=solarviewcinema", $dbusername, $dbpassword);
        $this->dbconn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $this->dbconn->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
    }
    // User Login 
    function login($usernamelogin, $passwordlogin) {
        $sql = "SELECT UserID, Password FROM users WHERE Username = :username";
        $stmt = $this->dbconn->prepare($sql);
        $stmt->bindValue(':username', $usernamelogin);
        $stmt->execute();
        $row = $stmt->fetch();
        // Password verification
        if(password_verify($passwordlogin, $row['Password'])){
            $userid = $row["UserID"];
            $_SESSION["UserID"] = $userid;
            return true;
        } else {
            return false;
        }
    }
    // User Registration
    function registration($firstname, $lastname, $dateofbirth, $email, $phone, $usernamereg, $passwordreg) {
        $sql = "INSERT into users(FirstName, LastName, DateOfBirth, Email, Phone, Username, Password)
        VALUES (:firstname, :lastname, :dateofbirth, :email, :phone, :usernamereg, :passwordreg)";
        $stmt = $this->dbconn->prepare($sql);
        $stmt->bindValue(':firstname', $firstname);
        $stmt->bindValue(':lastname', $lastname);
        $stmt->bindValue(':dateofbirth', $dateofbirth);
        $stmt->bindValue(':email', $email);
        $stmt->bindValue(':phone', $phone);
        $stmt->bindValue(':usernamereg', $usernamereg);
        $hpassword = password_hash($passwordreg, PASSWORD_DEFAULT); 
        $stmt->bindValue(':passwordreg', $hpassword);
        // Form Validation
        // if user did not insert email, stop data insertion into MySQL database
        // if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
        //     die;
        //     return false;
        // }
        // // if user did not insert phone number, stop data insertion into MySQL database
        // if(!preg_match("/^[0-9]{11}$/", $phone)){
        //     die;
        //     return false;
        // }
        return $stmt->execute();
    }
    // Display User Profile by UserID
    function displayProfile() {
        try {
        $mysql = "SELECT UserID, FirstName, LastName, DateOfBirth, Email, Phone, Username FROM users 
        WHERE UserID = :userid";
        $stmt = $this->dbconn->prepare($mysql);
        $stmt->bindValue(':userid', $_SESSION['UserID']);
        $stmt->execute();
        $result = $stmt->fetchAll();
        return $result;
        }
        catch (PDOException $ex) { 
            throw $ex;
        }
    }
    // Delete User Profile by UserID
    function deleteProfile($userID) {
        $mysql = "DELETE FROM users WHERE UserID = :userid";
        $stmt = $this->dbconn->prepare($mysql);
        $stmt->bindValue(':userid', $userID);
        return $stmt->execute();
    }
    // Update User Profile by UserID 
    function updateProfile($FirstNameUPD, $LastNameUPD, $DateOfBirthUPD, $EmailUPD, 
    $PhoneUPD, $UsernameUPD, $PasswordUPD) {
        $mysql = "UPDATE users SET FirstName = :firstnameupdt, LastName = :lastnameupdt, DateOfBirth = :dateofbirthupdt, 
        Email = :emailupdt, Phone = :phoneupdt, UserName = :usernameupdt, Password = :passwordupdt 
        WHERE UserID = :userid";
        $stmt = $this->dbconn->prepare($mysql);
        $stmt->bindValue(':userid', $_SESSION['UserID']);
        $stmt->bindValue(':firstnameupdt', $FirstNameUPD);
        $stmt->bindValue(':lastnameupdt', $LastNameUPD);
        $stmt->bindValue(':dateofbirthupdt', $DateOfBirthUPD);
        $stmt->bindValue(':emailupdt', $EmailUPD);
        $stmt->bindValue(':phoneupdt', $PhoneUPD);
        $stmt->bindValue(':usernameupdt', $UsernameUPD);
        $HpasswordUPD = password_hash($PasswordUPD, PASSWORD_DEFAULT);
        $stmt->bindValue(':passwordupdt', $HpasswordUPD);
        // Form Validation
        // if user did not insert email, stop data insertion into MySQL database
        if(!filter_var($EmailUPD, FILTER_VALIDATE_EMAIL)){
            die;
            return false;
        }
        // if user did not insert phone number, stop data insertion into MySQL database
        if(!preg_match("/^[0-9]{10}$/", $PhoneUPD)){
            die;
            return false;
        }
        return $stmt->execute();
    }
    // Display Movies 
    function displayMovies() {
        try {
            $mysql = "SELECT * FROM movie";
            $stmt = $this->dbconn->prepare($mysql);
            $stmt->execute();
            $result = $stmt->fetchAll();
            return $result;  
            return true;
        }
        catch (PDOException $ex) { 
            throw $ex;
        }
    }
    // Display 3 Latest Movies
    function displayLatestMovies() {
        try{
            $mysql = "SELECT * FROM movie ORDER BY MovieID DESC LIMIT 3";
            $stmt = $this->dbconn->prepare($mysql);
            $stmt->execute();
            $result = $stmt->fetchAll();
            return $result;
            return true;
        }
        catch (PDOException $ex) {
            throw $ex;
        }
    }
    // Add Movie to Favourite list
    function addFavouriteMovie($movieid) {
        $sql = "INSERT into favouritemovie(MovieID, UserID) VALUES(:movieid, :userid)";
        $stmt = $this->dbconn->prepare($sql);
        $stmt->bindValue(':movieid', $movieid);
        $stmt->bindValue(':userid', $_SESSION['UserID']);
        $mysql = "SELECT * from favouritemovie WHERE MovieID = :movieid and UserID = :userid";
        $stmt2 = $this->dbconn->prepare($mysql);
        $stmt2->bindValue(':movieid', $movieid);
        $stmt2->bindValue(':userid', $_SESSION['UserID']);
        $stmt2->execute();
        if($stmt2->rowCount() < 1){
            return $stmt->execute();
        } else {
            return false;
            die;    
        } 
    }
    // Display user's favourite movie list
    function displayfavouritelist() {
        try{
            $mysql = "SELECT movie.MovieID, movie.MovieName, movie.ReleaseDate, movie.MovieDescription, 
            movie.genre, movie.MovieImage, favouritemovie.FavouriteMovieID 
            FROM favouritemovie
            INNER JOIN movie on favouritemovie.MovieID = movie.MovieID 
            INNER JOIN users on favouritemovie.userID = users.UserID 
            WHERE favouritemovie.UserID = :userid";
            $stmt = $this->dbconn->prepare($mysql);
            $stmt->bindValue(':userid', $_SESSION['UserID']);
            $stmt->execute();
            $result = $stmt->fetchAll();
            return $result;
        }
        catch (PDOException $ex) { 
            throw $ex;
        }
    }
    // Remove movie from favourite list
    function removefromFavouritelist($favouritemoviedelete) {
        $sql = "DELETE from favouritemovie WHERE MovieID = :movieid";
        $stmt = $this->dbconn->prepare($sql);
        $stmt->bindValue(':movieid', $favouritemoviedelete);
        return $stmt->execute();
    }
    // Display movie session
    function displayMovieSession($movie) {
        try {
            $mysql = "SELECT * FROM moviesession WHERE MovieID = :movieid";
            $stmt = $this->dbconn->prepare($mysql);
            $stmt->bindValue(':movieid', $movie);
            $stmt->execute(); 
            $result = $stmt->fetchAll();
            return $result;  
            return true;
        }
        catch (PDOException $ex) { 
            throw $ex;
        }
    }
    // Display Seats 
    function displaySeats($moviesession) {
        try {
            $mysql = "SELECT seat.SeatNumber, seatbysession.SeatBySessionID, seatbysession.ReservationStatus, 
            moviesession.MovieSessionID 
            FROM seatbysession 
            INNER JOIN moviesession on seatbysession.MovieSessionID = moviesession.MovieSessionID 
            INNER JOIN seat on seatbysession.SeatID = seat.SeatID 
            WHERE seatbysession.MovieSessionID = :moviesessionid";
            $stmt = $this->dbconn->prepare($mysql);
            $stmt->bindValue(':moviesessionid', $moviesession);
            $stmt->execute();
            $result = $stmt->fetchAll();
            return $result;
        }
        catch (PDOException $ex) {
            throw $ex;
        }
    }
    // Display Ticket Types
    function displayTicketTypes() {
        try {
            $mysql = "SELECT * FROM tickettype";
            $stmt = $this->dbconn->prepare($mysql);
            $stmt->execute();
            $result = $stmt->fetchAll();
            return $result;
        }
        catch (PDOException $ex) {
            throw $ex;
        }
    }
    // Get Booked Seats for Reservation Status Check
    function getBookedSeats($movieSessionID) {
        try {
            $mysql = "SELECT seat.SeatNumber, seatbysession.SeatBySessionID, seatbysession.ReservationStatus, 
            moviesession.MovieSessionID FROM seatbysession 
            INNER JOIN moviesession on seatbysession.MovieSessionID = moviesession.MovieSessionID 
            INNER JOIN seat on seatbysession.SeatID = seat.SeatID 
            WHERE seatbysession.MovieSessionID = :moviesessionid AND ReservationStatus = true";
            $stmt = $this->dbconn->prepare($mysql);
            $stmt->bindValue(':moviesessionid', $movieSessionID);
            $stmt->execute();
            $result = $stmt->fetchAll();
            return $result;
        }
        catch (PDOException $ex) {
            throw $ex;
        }
    }
    // Seat Booking 
    function seatReservation($seatID, $tickettypeID) {
        $sql = "INSERT INTO ticket(SeatBySessionID, TicketTypeID, UserID)
        VALUES(:seatid, :tickettypeid, :userid)";
        $stmt = $this->dbconn->prepare($sql);
        $stmt->bindValue(':seatid', $seatID);
        $stmt->bindValue(':tickettypeid', $tickettypeID);
        $stmt->bindValue(':userid', $_SESSION['UserID']);
        return $stmt->execute();
    }
    // Display User's Booked Ticket
    function displayBookedTicket() {
        try {
            $sql = "SELECT ticket.TicketID, movie.MovieName, moviesession.SessionDate, moviesession.TimeStart, 
            tickettype.Name, seat.SeatNumber, theatre.TheatreNumber 
            FROM ticket
            INNER JOIN seatbysession on ticket.SeatBySessionID = seatbysession.SeatBySessionID
            INNER JOIN seat on seatbysession.SeatID = seat.SeatID
            INNER JOIN theatre on seatbysession.TheatreID = theatre.TheatreID
            INNER JOIN tickettype on ticket.TicketTypeID = tickettype.TicketTypeID
            INNER JOIN moviesession on seatbysession.MovieSessionID = moviesession.MovieSessionID
            INNER JOIN movie on moviesession.MovieID = movie.MovieID
            WHERE ticket.UserID = :userid";
            $stmt = $this->dbconn->prepare($sql);
            $stmt->bindValue(':userid', $_SESSION['UserID']);
            $stmt->execute();
            $result = $stmt->fetchAll();
            return $result;
        }
        catch (PDOException $ex) {
            throw $ex;
        }
    }
    // Update Ticket
    function updateTicket($seatUPDT, $ticketID) {
        $sql = "UPDATE ticket SET SeatBySessionID = :seatid
        WHERE TicketID = :ticketid";
        $stmt = $this->dbconn->prepare($sql);
        $stmt->bindValue(':seatid', $seatUPDT);
        $stmt->bindValue(':ticketid', $ticketID);
        return $stmt->execute();
    }
    // Delete Ticket
    function deleteTicket($ticketDelete) {
        $mysql = "DELETE FROM ticket WHERE TicketID = :ticketid";
        $stmt = $this->dbconn->prepare($mysql);
        $stmt->bindValue(':ticketid', $ticketDelete);
        return $stmt->execute();
    }
}
?>