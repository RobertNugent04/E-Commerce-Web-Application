import React, {Component} from "react"
import {Link} from "react-router-dom"
import Logout from "./Logout"
import Login from "./Login"
import Register from "./Register"

import { ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST } from "../config/global_constants"

export default class NavBar extends Component
{
    render()
    {   
        return(
        <div class="navbar">
            <p id="title">Rob's Shoe Exchange</p>
            <div id="menu-controls">
            <Link className="menu-item" to={"/Home"}>Home</Link>
            <Link className="menu-item" to={"/DisplayAllCars"}>Store</Link>
            <Link className="menu-item" to={"/ContactUs"}>Contact Us</Link>
            </div>
            
            
            
            {localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ?
                    <div className="stock">
                        <Link className="menu-item" to={"/Stock"}>View Stock Table</Link>
                    </div>

                    :
                        null
                    }
            
            <div id="account-controls">
            {localStorage.accessLevel > ACCESS_LEVEL_GUEST ?
            <div>
                        <Link className="green-button" to={"/Logout"}>Logout</Link>
                        <Link className="blue-button" to={"/ProfilePage"}>Profile</Link>
                        </div>
                    :

            <div>
                        <Link className="green-button" to={"/Login"}>Login</Link>
                        <Link className="blue-button" to={"/Register"}>Register</Link> 
                        </div>

                }
                </div>
                
        </div>
        )
    }
}

