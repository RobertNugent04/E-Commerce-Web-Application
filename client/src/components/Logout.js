import React, {Component} from "react"
import {Redirect} from "react-router-dom"
import axios from "axios"
import NavBar from "./NavBar"
import Footer from "./Footer"

import {Link} from "react-router-dom"
import LinkInClass from "../components/LinkInClass"
import {ACCESS_LEVEL_GUEST, SERVER_HOST} from "../config/global_constants"


export default class Logout extends Component
{
    constructor(props)
    {
        super(props)
        
        this.state = {
            isLoggedIn:true
        }
    }
    
    
    handleSubmit = (e) => 
    {
        e.preventDefault()
        
        axios.post(`${SERVER_HOST}/users/logout`)
        .then(res => 
        {     
            if(res.data)
            {
                if (res.data.errorMessage)
                {
                    console.log(res.data.errorMessage)    
                }
                else
                { 
                    console.log("User logged out")
                   localStorage.clear() 
                    
                    localStorage.name = "GUEST"
                    localStorage.accessLevel = ACCESS_LEVEL_GUEST
                    this.setState({isLoggedIn:false}) 
                }
            }
            else
            {
                console.log("Logout failed")
            }
        }) 
    }


    render()
    {
        return (
            
            
            <form className="form-container" noValidate = {true} id = "loginOrRegistrationForm">
            <div class="navbar-container">
                        <NavBar/>
                    </div> <br/> <br/> <br/> <br/> <br/> <br/> <center>
                <h2>Log Out?</h2>
                <p>Are you sure you want to logout?</p> 
                
                <div>   
        
                {!this.state.isLoggedIn ? <Redirect to="/DisplayAllCars"/> : null} 
                  
            <LinkInClass value="Log out" className="red-button" onClick={this.handleSubmit}/> 
            <Link className="green-button" to={"/DisplayAllCars"}>Cancel</Link>
                    
            </div> 
            </center>
                <Footer/>
            </form>
        )
    }
}