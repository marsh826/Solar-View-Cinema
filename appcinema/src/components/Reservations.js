import React, { useEffect } from 'react';
import '../App.css';


export default function Reservations() {
    function DarkModeCheck() {
        if(localStorage.getItem("DarkMode") === 'Enabled') {
        //   document.getElementById("loopalumpa").classList.add("darkmodePrimary");
            console.log("darkmode is enabled");
        } else {
          document.getElementById("loopalumpa").classList.remove("darkmodePrimary");
        }
        console.log("function is called");
    }

    useEffect(() => {
        DarkModeCheck();
    }, []);

    return(
        <div id="loopalumpa">
            Hi HihoHuha
        </div>
    )
}