<?php
session_start();
class sessionOBJ {
    public $limit; 
    public $lastTime;
    public $last24hours;

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
    // Daily Request Limit within 24 hours
    function dailyrequestLimit() {
        $time = time();
        array_push($this->limit, $time);
        $requestCount = count($this->limit);
        // Request limit had been reduced down to 10 to test the Daily Request Rate Limiting
        // Daily Request Limit counter = 1000 requests
        // if ($requestCount > 1000) {
        //     return true;
        //     die("Request exceeded within 24 hours");
        // } else {
        //     return false;
        // }

        // Daily Request Limit counter = 500 requests
        if ($requestCount > 500) {
            return true;
            die("Request exceeded within 24 hours");
        } else {
            return false;
        }

        // Prevent requests after 24 hours
        // 24 hours converts to 864000 seconds 
        $this->last24hours = time() - 86400;
        // Once user logs out the session is destroyed and rate limiting resets
        foreach ($this->timeLimit as $time) {
            if ($time < $this->last24hours) {
                $key = array_search($time, $this->timeLimit);
                array_splice($this->timeLimit, $key);
            }
        }
    }
    // This function saves the time of the last request that was made 
    function lastSessionRequest(){
        $_SESSION['last_request_time'] = time();
        return true;
    }
    // Rate Limit
    function ratelimit(){
        date_default_timezone_set("Australia/Brisbane");
        // The if statement check if the current session request is empty    
        if(isset($_SESSION['last_session_request'])){ 
            // If the current request time is equal to the current time, any activity in the app will be stopped for 1 second
            if($_SESSION["last_session_request"] == time() - 0.5){
                http_response_code(429);
                die("Surpassed Rate Limit");
            } else {
                return false;
            }
        } else {
        // If the request was empty, the request time will be recorded into session
            $_SESSION["last_session_request"] = time();
        }
    }
}
?>