<?php
session_start();
class sessionOBJ {
    public $limit; 
    public $lastTime;
    // This records the the time of the last session request into the last time variable
    public function __construct() {
        $this->limit = array("");
        $_SESSION['last_session_request'] = time();
        $this->lastTime = $_SESSION['last_session_request'];
    }
    // Check if the user is logged in or not
    function logged_in_check() {
        if(!isset($_SESSION["UserID"])){
            return false;
        } else {
            return true;
        }
    }
    // User Log Out 
    function logout() {
        // Session wil be unset and destroyed upon log out
        session_unset();
        session_destroy();
        return true;
    }
}
?>