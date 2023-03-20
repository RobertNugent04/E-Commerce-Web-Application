import React, { Component } from "react"
import { Link } from "react-router-dom"
import NavBar from "./NavBar"
import Footer from "./Footer"
import { ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST } from "../config/global_constants"

export default class Return extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
                <div className="form-container">
                    <div class="navbar-container">
                        <NavBar />
                    </div><br/><br/><br/><br/>
                    <center>
                        <h1 id="title2">Request Recieved!</h1>
                        <h2>Your return request is being processed!</h2>
                    </center>
                    <Footer />
                </div>
                )
    }
}