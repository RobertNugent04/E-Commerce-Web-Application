import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
import axios from "axios"

import LinkInClass from "../components/LinkInClass"
import {ACCESS_LEVEL_GUEST, SERVER_HOST} from "../config/global_constants"

import NavBar from "./NavBar"
import Footer from "./Footer"

export default class Login extends Component
{
    constructor(props)
    {
        super(props)
        
        this.state = {
            users: [],
            email:"",
            password:"",
            isLoggedIn:false,
            cart_item:0,
            wasSubmittedAtLeastOnce: false,
            emailMatch: [],
            passwordMatches: false
        }
    }
    
    componentDidMount() 
    {

        axios.get(`${SERVER_HOST}/users`)
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
                    console.log(res.data)
                    console.log("Records read")   
                    this.setState({users: res.data}) 
                }   
            }
            else
            {
                console.log("Record not found")
            }
        })
    }
    
    handleChange = (e) => 
    {
        this.setState({[e.target.name]: e.target.value})
    }
    
    
    handleSubmit = (e) => 
    {

        const emailExists = this.state.users.find(user => user.email === this.state.email);
        this.setState({emailMatch: emailExists})

        console.log(emailExists)
        if(emailExists !== undefined){
        if (emailExists.password === this.state.password) {
            this.setState({passwordMatches: true})
          }
          else{
            this.setState({passwordMatches: false})
          }
        }

        this.setState({ wasSubmittedAtLeastOnce: true });

        axios.post(`${SERVER_HOST}/users/login/${this.state.email}/${this.state.password}`)
        .then(res => 
        {     
            // default if not logged in
            localStorage.name = "GUEST"
            localStorage.accessLevel = ACCESS_LEVEL_GUEST 
            if(res.data)
            {
                if (res.data.errorMessage)
                {
                    console.log(res.data.errorMessage)    
                }
                else // user successfully logged in
                { 
                    console.log("User logged in")
                    console.log(res.data)
                    localStorage.name = res.data.name
                        localStorage.accessLevel = res.data.accessLevel
                        localStorage.token = res.data.token
                        localStorage.profilePhoto = res.data.profilePhoto
                        localStorage.email = res.data.email
                        localStorage.cart_item= res.data.cart_item
                    
                    this.setState({isLoggedIn:true})
                }        
            }
            else
            {
                console.log("Login failed")
            }
        })                
    }


    render()
    {        
        let loginError = ""  

        if(this.state.wasSubmittedAtLeastOnce)
        {
            if(this.state.emailMatch === undefined){
            loginError = <p class="error">Login Details are incorrect!</p>;
            }
        }
        return (
            <form className="form-container" noValidate = {true} id = "loginOrRegistrationForm">
            <div class="navbar-container">
                        <NavBar/> 
                        </div> <br/> <br/> <br/> <br/> <br/> <br/> <center>
                    
                <h2 id="title2">Login</h2>
                
                {this.state.isLoggedIn ? <Redirect to="/DisplayAllCars"/> : null} 
                
                {loginError}
                {""}

                <input 
                    type = "email" 
                    name = "email" 
                    placeholder = "Email"
                    autoComplete="email"
                    value={this.state.email} 
                    onChange={this.handleChange}
                /><br/>
                    
                <input 
                    type = "password" 
                    name = "password" 
                    placeholder = "Password"
                    autoComplete="password"
                    value={this.state.password} 
                    onChange={this.handleChange}
                /><br/><br/>
                
                <LinkInClass value="Login" className="green-button" onClick={this.handleSubmit}/> 
                <Link className="red-button" to={"/DisplayAllCars"}>Cancel</Link> 
                </center>
                <Footer/>
            </form>
        )
    }
}