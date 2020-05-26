import React, { Component } from "react";

import "../css/styles.css";
export default class Home extends Component {
    render() {
        return (

            <div>
                <h1 id="text"> Welcome to out E-health monitor</h1> <br></br>

                <div className="info"><h3>You can find here information about patients and medication. <br></br>
                    Also you can find a lot of information about patient like:
                            <ul>
                        <li>Encounters</li>
                        <li>Care plan</li>
                        <li>Appointments</li>
                        <li>Allergy intolerance</li>
                    </ul>
                </h3>
                </div>
            </div>
        );
    }
}