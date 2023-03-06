import React, { Component } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import Filter from "./Filter"
import CarTable from "./CarTable"
import ShoeTable from "./ShoeTable"
import Logout from "./Logout"
import Search from "./Search"
import Sort from "./Sort"
import NavBar from "./NavBar"
import Footer from "./Footer"
import { ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST } from "../config/global_constants"

export default class DisplayAllCars extends Component {
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
                        <h1 id="title2">Rob's Shoe Exchange</h1>           
                    </center>
                    <Footer />
                </div>
                )
    }
}