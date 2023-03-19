import React, { Component } from "react"
import { Link } from "react-router-dom"
import NavBar from "./NavBar"
import Footer from "./Footer"
import { ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST } from "../config/global_constants"

export default class AddedToCart extends Component {
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
                        <h1 id="title2">Added to Cart!</h1>
                        <h2>The product has been added to the cart</h2>
                    </center>
                    <Footer />
                </div>
                )
    }
}