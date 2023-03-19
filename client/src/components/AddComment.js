import React, { Component } from "react"
import { Redirect, Link } from "react-router-dom"


import axios from "axios"

import LinkInClass from "../components/LinkInClass"

import { ACCESS_LEVEL_ADMIN, SERVER_HOST } from "../config/global_constants"

import NavBar from "./NavBar"
import Footer from "./Footer"


export default class AddCar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            message: ``,
            brand: ``,
        }
    }


    componentDidMount() {
        // this.inputToFocus.focus()
    }


    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
        console.log(this.state.message)
    }

    handleFileChange = (e) => {
        this.setState({ selectedFiles: e.target.files })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        this.setState({ wasSubmittedAtLeastOnce: true });

        const commentObject = {
            userName: localStorage.name,
            comment:this.state.message

        }


        axios.put(`${SERVER_HOST}/comment/${this.props.match.params.name}`, commentObject, { headers: { "authorization": localStorage.token } })
            .then(res => {
                if (res.data) {
                    if (res.data.errorMessage) {
                        console.log(res.data.errorMessage)
                    }
                    else {
                        console.log("Record added")
                        this.setState({ redirectToDisplayAllCars: true })
                    }
                }
                else {
                    console.log("Record not added")
                }
            })
    }

    render() {


        return (
            
            <div className="form-container">

                <div class="navbar-container">
                    <NavBar />
                </div> <br /> <br /> <br /> <br /> <br /> <br /> <center>

                    <h2 id="title2">Comment</h2>
                    {this.state.redirectToDisplayAllCars ? <Redirect to="/DisplayAllCars" /> : null}

                    <div>
                        <div controlId="brand">
                            <input type="text" style={{height:"100px"}} name="message" placeholder="Message"  onChange={this.handleChange} />
                            {" "}

                        </div>
                    <br></br>


                    

                        <LinkInClass value="Add" className="green-button" onClick={this.handleSubmit} />

                        <Link className="red-button" to={"/DisplayAllCars"}>Cancel</Link>
                    </div>
                </center>
                <Footer />
            </div>
        )
    }
}