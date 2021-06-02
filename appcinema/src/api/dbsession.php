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
    // Request Limit of 1000 within 24 hours
    function requestlimit(){
        $time = time();
        array_push($this->limit,$time);
        $limitCount = count($this->limit);
        // 24 hours have been converted in 864000 seconds
        // If current request past 1000 requests limit within 24 hours, the system will stop and will be available after 24 hours from the current time
        if(time() - $this->lastTime < 864000){
            if($limitCount > 1000){
                die("Request limit exceeded within 24 hours");
                return false;
            } else {
                return true;
            }
        } else {
            // If the request time is below 24 hours
            return true;
        }
    }
    // This function saves the time of the last request that was made 
    function lastSessionRequest(){
        $_SESSION['last_request_time'] = time();
        return true;
    }
    // Domain Lock
    function domainlock(){
        if(!isset($data)){
            // If the user access the web service through this link, the user will be granted access, else they will not be granted access
            $data = isset($_SERVER['HTTP_REFERER'])? $_SERVER['HTTP_REFERER'] : "http://localhost/UX1prototype/";
            return true;
        } else {
            die("URL Not Valid");
            return false;
        } 
        // If the user access the web service through this IP Address, the user will be granted access, else they will not be granted access
        // if($data = " 172.30.211.6"){
        //     return true;
        // } else {
        //     die("URL Not Valid");
        //     return false;
        // } 
        // If the user didn't enter any URL, they will not be granted access
        if($data =""){
            die("URL Not Valid");
            return false;
        }
    }
    function ratelimit(){
        date_default_timezone_set("Australia/Brisbane");
        // The if statement check if the current session request is empty    
        if(isset($_SESSION['last_session_request'])){ 
            // If the current request time is equal or more that then the previous request time (Current Time - 1), any activity in the app will be stopped for 1 second
            if($_SESSION["last_session_request"] >= time() - 1){
                die;
                echo"Surpassed Rate Limit";
            } else {
                return true;
            }
        } else {
        // If the request was empty, the request time will be recorded into session
            $_SESSION["last_session_request"] = time();
        }
    }
}
?>