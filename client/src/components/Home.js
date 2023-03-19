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

// Get day of the week for Tuesday Discounts
const today = new Date();
const dayOfWeek = today.getDay()

export default class DisplayAllCars extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="form-container">
                <div class="navbar-container">
                    <NavBar />
                </div><br /><br /><br /><br />
                <center>
                    <h1 id="title2">Rob's Shoe Exchange</h1>
                    <h2>Step into Style and Comfort with Rob's Shoe Exchange!</h2>
                    <p>Welcome to Rob's Shoe Exchange, the premier online destination for footwear lovers everywhere! At Rob's, we know that finding the perfect pair of shoes can make all the difference in your day-to-day life. That's why we've curated a vast selection of high-quality shoes from the world's top brands, all available to browse and purchase from the comfort of your own home. Whether you're looking for stylish sneakers, comfortable work shoes, or anything in between, we've got you covered. With competitive prices, fast shipping, and unparalleled customer service, Rob's Shoe Exchange is your one-stop-shop for all your footwear needs. So why wait? Start exploring our collection today and step up your shoe game!</p>
                    <br></br>

                    {dayOfWeek === 2 ? // if today is tuesday it announce the tuesday Sale
                        <div><h1 id="title2">Tuesday Sale!</h1>
                            <h2>10% Discount on all Purchases at Checkout!</h2><br></br>
                            <Link className="blue-button" to={"/DisplayAllCars"}>View Store</Link></div>

                        :
                        null

                    }

                </center>
                <Footer />
            </div>
        )
    }
}