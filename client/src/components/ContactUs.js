import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom"
import axios from "axios";
import LinkInClass from "../components/LinkInClass";

import NavBar from "./NavBar"
import Footer from "./Footer"

class ContactUs extends Component {
  state = {
    name: "",
    email: "",
    subject: "",
    message: "",
    successMessage: "",
    errorMessage: "",
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const {name, email, subject, message } = this.state;
    axios.post("http://localhost:4000/send-email", {
        name: name,
        email: email,
        subject: subject,
        message: message,
      })
      .then((response) => {
        this.setState({
          successMessage: "Email sent successfully",
          errorMessage: "",
        });
      })
      .catch((error) => {
        this.setState({
          successMessage: "",
          errorMessage: "Error sending email",
        });
      });
  };

  render() {
    const { name, email, subject, message, successMessage, errorMessage } = this.state;

    return (
      <div className="form-container">

<div class="navbar-container">
<NavBar/> 
                        </div> <br/> <br/> <br/> <br/> <br/> <br/> <center>
                    
                <h2 id="title2">Contact Us</h2>

        {successMessage && <div className="success">{successMessage}</div>}
        {errorMessage && <div className="error">{errorMessage}</div>}
        <form onSubmit={this.handleSubmit}>
            <input
              type="name"
              name="name"
              placeholder = "Name"
              autoComplete="name"
              value={name}
              onChange={this.handleInputChange}
            />
          <br />
            <input
              type="email"
              name="email"
              placeholder = "Email"
              autoComplete="email"
              value={email}
              onChange={this.handleInputChange}
            />
          <br />
            <input
              type="subject"
              name="subject"
              placeholder = "Subject"
              autoComplete="subject"
              value={subject}
              onChange={this.handleInputChange}
            />
          <br />
            <textarea
              name="message"
              placeholder = "Message"
              autoComplete="message"
              value={message}
              onChange={this.handleInputChange}
            />
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

export default ContactUs;
