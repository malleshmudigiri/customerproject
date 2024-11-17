import React, { useState } from 'react';

import LeftHeader from "../LeftHeader/index.js";
import "./index.css";
import Header from "../Header/index.js";

const Home = () => {

    return (
        <div className="HomeContainer">

            <table>
                <thead>
                <tr>
                    <th colSpan="2"><Header/></th>
                </tr>
                </thead>
                <tbody>
                    <tr >
                        <td style={{ textAlign: 'center', verticalAlign: 'middle' ,height: '350px' }}>
                            <LeftHeader/>
                        </td>
                        <td style={{ height: '350px',textAlign: 'center', verticalAlign: 'middle' }} className="homeData" >
                                <h1 className="homeTab">Home</h1>
                                <p className="homeDescription">
                                    Welcome to UpwardIQ
                                    Bulk upload customer Data Application
                                </p>
                        </td>

                    </tr>

                </tbody>
            </table>
        </div>


    )

}

export default Home;