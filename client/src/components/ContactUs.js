import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom"
import axios from "axios";
import LinkInClass from "../components/LinkInClass";

import NavBar from "./NavBar"
import Footer from "./Footer"
import ThankYou from "./ThankYou"

export default class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      subject: "",
      message: "",
      nameError: "",
      emailError: "",
      subjectError: "",
      messageError: "",
      successMessage: "",
      noErrors: true,
      wasSubmittedAtLeastOnce: false,
      redirectToThankYou: false 
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  setFormErrors = () => {
    let nameError = ""
    let emailError = ""
    let subjectError = ""
    let messageError = ""
    let noErrors = true
  
    if (!this.validateName()) {
      nameError = <p class="error">Name can't be empty</p>;
      noErrors = false
    }
    if (!this.validateEmail()) {
      emailError = <p class="error">Invalid email</p>;
      noErrors = false
    }
    if (!this.validateSubject()) {
      subjectError = <p class="error">Subject can't be empty</p>;
      noErrors = false
    }
    if (!this.validateMessage()) {
      messageError = <p class="error">Message must have at least 30 characters</p>;
      noErrors = false
    }
  
    this.setState({
      nameError,
      emailError,
      subjectError,
      messageError,
      noErrors,
      wasSubmittedAtLeastOnce: true,
    })
  
    return noErrors
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.setFormErrors()) {
    axios.post("http://localhost:4000/send-email", {
        name: this.state.name,
        email: this.state.email,
        subject: this.state.subject,
        message: this.state.message,
      })
      .then((response) => {
        this.setState({
          successMessage: "Email sent successfully",
          errorMessage: "",
          redirectToThankYou: true
        });
      });
    }
  };

  validateName()
    {    
        //Not empty
        return this.state.name !== "";
    }

    validateEmail(){

        const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return pattern.test(String(this.state.email))

    }

    validateSubject()
    {    
        //Not empty
        return this.state.subject !== "";
    }

    validateMessage(){

        return this.state.message.length > 30;

    }

    validate() {
        return {
            name: this.validateName(),
            email: this.validateEmail(),
            subject: this.validateSubject(),
            messagePassword : this.validateMessage()
        };
    }

  render() {

    if (this.state.redirectToThankYou) {
      return <Redirect to="./ThankYou" />
    }

    return (
      <div className="form-container">

<div class="navbar-container">
<NavBar/> 
                        </div> <br/> <br/> <br/> <br/> <br/> <br/> <center>
                    
                <h2 id="title2">Contact Us</h2>

        <form onSubmit={this.handleSubmit}>
            <input
              type="name"
              name="name"
              placeholder = "Name"
              autoComplete="name"
              value={this.state.name}
              onChange={this.handleInputChange}
            />
          <br />
          {""}
          {this.state.nameError}

            <input
              type="email"
              name="email"
              placeholder = "Email"
              autoComplete="email"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          <br />
          {""}
          {this.state.emailError}

            <input
              type="subject"
              name="subject"
              placeholder = "Subject"
              autoComplete="subject"
              value={this.state.subject}
              onChange={this.handleInputChange}
            />
                      {""}
          {this.state.subjectError}
          <br />
            <textarea
              name="message"
              placeholder = "Message"
              autoComplete="message"
              value={this.state.message}
              onChange={this.handleInputChange}
            />
                      {""}
          {this.state.messageError}
          <br /><br/>
          <LinkInClass value="Send" className="green-button" onClick={this.handleSubmit}/>
          <Link className="red-button" to={"/Home"}>Cancel</Link>
        </form>
        </center>
                <Footer/>
      </div>





      

    );
  }
}

