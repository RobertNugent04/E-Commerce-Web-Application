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

        if(localStorage.cart_item === "undefined"){

            localStorage.cart_item = 0;

        }

        return(
        <div class="navbar">
            <p id="title" className = "hide">Rob's Shoe Exchange</p>
            <div id="menu-controls">
            <Link className="menu-item" class="navButton" to={"/Home"}>Home</Link>
            <Link className="menu-item" class="navButton" to={"/DisplayAllCars"}>Store</Link>
            <Link id = "contactUsButton" className="menu-item" class="navButton" to={"/ContactUs"}>Contact Us</Link>
            { localStorage.accessLevel >ACCESS_LEVEL_GUEST ?
            <Link className="menu-item" class="navButton" to={"/Cart"}>Cart({localStorage.cart_item})</Link>:
            null}
            </div>
            
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

