import React, { Component } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import NavBar from "./NavBar"
import Footer from "./Footer"
import { ACCESS_LEVEL_NORMAL_USER, ACCESS_LEVEL_ADMIN, SERVER_HOST } from "../config/global_constants"
import CartTable from "./CartTable"
import BuyShoe from "./BuyShoe"

export default class Cart extends Component {
    constructor(props) {
        super(props)

        this.state = {
            shoes: [],
        }
    }

    componentDidMount() {
        axios.get(`${SERVER_HOST}/cart`)
            .then(res => {
                if (res.data) {
                    if (res.data.errorMessage) {
                        console.log(res.data.errorMessage)
                    }
                    else {
                        console.log("Records read")
                        this.setState({
                            shoes: res.data,
                         
                        })
                        console.log(res.data)
                    }
                }
                else {
                    console.log("Record not found")
                }
            })
    }

    render() {
        let soldOrForSale = null
        if(localStorage.accessLevel >= ACCESS_LEVEL_NORMAL_USER)
        {
            // if(this.props.car.sold !== true)
            // {
                soldOrForSale = <BuyShoe shoeID={this.state.shoes.shoeID} shoe_name={this.state.shoes.name} price={this.state.shoes.price} />
            // }
            // else
            // {
            //     soldOrForSale = "SOLD"
            // }
        }
        return (
                <div className="form-container">
                    <div class="navbar-container">
                        <NavBar />
                    </div><br/><br/><br/><br/>

                    <div className="shoe-container">
                    <CartTable cars={this.state.shoes} />
                    {soldOrForSale}

                </div>
                    <Footer />
                </div>
                )
    }
}