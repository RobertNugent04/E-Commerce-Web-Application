import React, { Component } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import NavBar from "./NavBar"
import Footer from "./Footer"
import { ACCESS_LEVEL_NORMAL_USER, ACCESS_LEVEL_ADMIN, SERVER_HOST } from "../config/global_constants"
import CartTable from "./CartTable"
import CheckoutTable from "./CheckoutTable"
import BuyShoe from "./BuyShoe"

// Get day of the week for Tuesday Discounts
const today = new Date();
const dayOfWeek = today.getDay()

export default class Cart extends Component {
    constructor(props) {
        super(props)

        this.state = {
            shoes: [],
            price:0,
            names:[],
            ids:[],
            quantity:[],
            names:[],
            images:[],
            sizes:[],
            embeddedImage:false,
            imageFiles:[]
        }
    }

    componentDidMount() {
        axios.get(`${SERVER_HOST}/cart/${localStorage.email}`)
            .then(res => {
                if (res.data) {
                    if (res.data.errorMessage) {
                        console.log(res.data.errorMessage)
                    }
                    else {
                        console.log("Records read")
                        
                        this.setState({shoes: res.data })
                        console.log(res.data)

                        let totalPrice=0;
                        let ids = [];
                        let quantity =[];
                        let names =[];
                        let images =[];
                        let sizes = [];
                        

                        // let names=[]
                        this.state.shoes.map((shoe) => totalPrice+= (shoe.amount * shoe.price))
                        this.state.shoes.map((shoe) => ids.push(shoe.shoeID))
                        this.state.shoes.map((shoe) => names.push(shoe.name))
                        this.state.shoes.map((shoe) => images.push(shoe.imageURL))
                        this.state.shoes.map((shoe) => sizes.push(shoe.size))
                        this.state.shoes.map((shoe) => quantity.push(shoe.amount))


                        console.log(ids)
                        
                        this.setState({price:totalPrice, ids:ids, quantity:quantity, names:names,images:images, sizes:sizes})
                        console.log(totalPrice)
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
                console.log(this.state.price)
                console.log(this.state.ids)
                console.log("AMOUNT" + this.state.quantity)
                console.log(this.state.names)
                console.log(this.state.sizes)


                if (dayOfWeek === 2) { // Applies 10% Discount on Tuesdays
                    soldOrForSale = <BuyShoe shoes={this.state.shoes}  price={this.state.price * 0.9}  ids={this.state.ids} quantity={this.state.quantity} names={this.state.names} images={this.state.images} sizes={this.state.sizes}/>
                } else {
                    soldOrForSale = <BuyShoe shoes={this.state.shoes}  price={this.state.price}  ids={this.state.ids} quantity={this.state.quantity} names={this.state.names} images={this.state.images} sizes={this.state.sizes}/>
                }

             // }
            // else
            // {
            //     soldOrForSale = "SOLD"
            // }

        }
        console.log(this.state.shoes)
        return (
                <div className="form-container">
                    {/* {console.log(this.state.price)} */}
                    <div class="navbar-container">
                        <NavBar />
                    </div><br/><br/>

                    <div className = "superContainer">
                    <div className="shoe-container">
                    <CartTable cars={this.state.shoes} /><br></br><br></br><br></br>
                    </div>
                    <div className = "checkout">
                        <div className="checkoutPricing">
                    <CheckoutTable cars={this.state.shoes} />
                    <center>
                    {soldOrForSale}
                    </center>
                    </div>
                    </div>
                    </div>
                

                </div>
                )
    }
}