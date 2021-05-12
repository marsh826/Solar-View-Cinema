import React from 'react';
import '../App.css';

export default function Footer() {
    return(
        <div className="main-footer">
            <div className="container">
                <div className="row">
                    <div className="col1">
                        <ul className="footer-list">
                            <h5>About Us</h5>
                            <h5>Help Document</h5>
                            <h5>66 Ernest, South Brisbane QLD 4101</h5>    
                        </ul>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <p className="col-sm">
                        &copy;{new Date().getFullYear()} Solar View Cinema | All rights reserved | Privacy Policy
                    </p>
                </div>
            </div>
        </div>
    )
}