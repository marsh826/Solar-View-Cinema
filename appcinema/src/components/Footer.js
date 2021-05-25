import React from 'react';
import '../App.css';

export default function Footer() {
    return(
        <div className="footer">
            <div className="container">
                <div className="row">
                    <div className="footer-content">
                        <ul className="footer-list">
                            <h5>About Us</h5>
                            <h5>Help Document</h5>
                            <h5>66 Ernest, South Brisbane QLD 4101</h5>    
                        </ul>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <h4 className="col-sm">
                        &copy;{new Date().getFullYear()} Solar View Cinema | All rights reserved | Privacy Policy
                    </h4>
                </div>
            </div>
        </div>
    )
}