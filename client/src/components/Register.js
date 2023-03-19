import React, { Component } from "react"
import { Redirect, Link } from "react-router-dom"
import axios from "axios"
import NavBar from "./NavBar"
import Footer from "./Footer"

import LinkInClass from "../components/LinkInClass"

import { SERVER_HOST } from "../config/global_constants"


export default class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            selectedFile:null, 
            isRegistered: false
        }
    }


    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
       
    }

    handleFileChange = (e) => {
        this.setState({ selectedFile: e.target.files[0] });
        console.log(e.target.files[0])
    }


    handleSubmit = (e) => {
        e.preventDefault()

        this.setState({ wasSubmittedAtLeastOnce: true });

        const formInputsState = this.validate();

        let formData = new FormData()  
        formData.append("profilePhoto", this.state.selectedFile)

        axios.post(`${SERVER_HOST}/users/register/${this.state.name}/${this.state.email}/${this.state.password}`, formData, {headers: {"Content-type": "multipart/form-data"}})
            .then(res => {
                if (res.data) {
                    if (res.data.errorMessage) {
                        console.log(res.data.errorMessage)
                    }
                    else // user successfully registered
                    {
                        console.log("User registered and logged in")

                        localStorage.name = res.data.name
                        localStorage.accessLevel = res.data.accessLevel
                        localStorage.token = res.data.token
                        localStorage.profilePhoto = res.data.profilePhoto
                        localStorage.email = res.data.email
                        localStorage.cart_item = res.data.cart_item


                        this.setState({ isRegistered: true , wasSubmittedAtLeastOnce: false})
                    }
                }
                else {
                    console.log("Registration failed")
                }
            })
    }

    validateName()
    {    
        //Not empty
        return this.state.name !== "";
    }

    validateEmail(){

        const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return pattern.test(String(this.state.email))

    }

    validatePassword()
    {    
        //Pattern to match value with at least one letter, one number and one special character and has minimum 8 characters
        const pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$£%^&*()_+{}|:"<>?`~\-\[\]\\;',.\/])[A-Za-z\d!@#$£%^&*()_+{}|:"<>?`~\-\[\]\\;',.\/]{8,}$/;
        return pattern.test(String(this.state.password))
    }

    validateConfirmPassword(){

        return this.state.confirmPassword === this.state.password;

    }

    validate() 
    {
        return {
            name: this.validateName(),
            email: this.validateEmail(),
            password: this.validatePassword(),
            confirmPassword : this.validateConfirmPassword()
        };
    }

    render() {

        let nameError = ""
        let emailError = ""
        let passwordError = ""
        let confirmPasswordError = ""

        if(this.state.wasSubmittedAtLeastOnce)
        {

            if (!this.validateName()) {
                nameError = <p class="error">Name can't be empty</p>;
            }
            if (!this.validateEmail()) {
                emailError = <p class="error">Invalid email</p>;
            }
            if (!this.validateConfirmPassword()) {
                confirmPasswordError = <p class="error">Passwords don't match</p>;
            }
        if (!this.validatePassword()) {
            passwordError = <p class="error">Password must have at least: <ul>
                                            <li>one letter</li>
                                            <li>one number</li>
                                            <li>one special character</li>
                                            <li>8 total characters</li></ul></p>;
        }else {
            passwordError = "";
        }
    }

        return (
            <div className="form-container">
            <div class="navbar-container">
                        <NavBar/>
                    </div> <br/> <br/> <br/> <br/> <br/> <br/> <center>

                {this.state.isRegistered ? <Redirect to="/DisplayAllCars" /> : null}

                <h2 id="title2">User Registration</h2>

                <input
                    name="name"
                    type="text"
                    placeholder="Name"
                    autoComplete="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                    ref={(input) => { this.inputToFocus = input }}
                /><br />
                                                                        {" "}
                        {nameError}

                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    autoComplete="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                /><br />
                                                        {" "}
                        {emailError}

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    autoComplete="password"
                    title="Password must be at least ten-digits long and contains at least one lowercase letter, one uppercase letter, one digit and one of the following characters (£!#€$%^&*)"
                    value={this.state.password}
                    onChange={this.handleChange}
                /><br />
                                        {" "}
                        {passwordError}

                <input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm password"
                    autoComplete="confirmPassword"
                    value={this.state.confirmPassword}
                    onChange={this.handleChange}
                />
                                                        {" "}
                        {confirmPasswordError}
                <br /><br />
                
                <input
                    type="file"
                    onChange={this.handleFileChange}
                /><br/><br/>

                <LinkInClass value="Register" className="green-button" onClick={this.handleSubmit} />
                <Link className="red-button" to={"/DisplayAllCars"}>Cancel</Link>
                </center>
               
                <Footer/>
                </div>
            
        )
    }
}