import React, { useEffect } from 'react';
import '../App.css';


export default function Reservations() {


    return(
        <div id="loopalumpa">
            <form id="seat-booking">
                <input id="seat-id" value="" readOnly />
                <input id="ticket-type" value="" readOnly />    
            </form>
        </div>
    )
}