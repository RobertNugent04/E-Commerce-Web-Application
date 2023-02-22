import React, {Component} from "react"
import {Link} from "react-router-dom"
export default class NavBar extends Component
{
    render()
    {   
        return(
        <div class="navbar">
            <Link className="menu-item" to={"/DisplayAllCars"}>Home</Link>
            <a href="#" class="menu-item-item">Link 1</a>
            <a href="#" class="menu-item">Link 2</a>
            <a href="#" class="menu-item">Link 3</a>
            <a href="ProfilePage" class="menu-item">Link 4</a>
            
        </div>
        )
    }
}

