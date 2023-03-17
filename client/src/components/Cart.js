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
            price:0,
            names:[],
            ids:[],
            quantity:[],
            names:[],
            images:[]
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

                        let totalPrice=0;
                        let ids = [];
                        let quantity =[];
                        let names =[]
                        let images =[]

                        // let names=[]
                        this.state.shoes.map((shoe) => totalPrice+= (shoe.amount * shoe.price))
                        this.state.shoes.map((shoe) => ids.push(shoe.shoeID))
                        this.state.shoes.map((shoe) => quantity.push(shoe.amount))
                        this.state.shoes.map((shoe) => names.push(shoe.name))
                        this.state.shoes.map((shoe) => images.push(shoe.imageURL))



                        console.log(ids)
                        
                        this.setState({price:totalPrice, ids:ids, quantity:quantity, names:names,images:images})
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
                console.log(this.state.quantity)
                console.log(this.state.names)
                console.log(this.state.images)



                soldOrForSale = <BuyShoe shoes={this.state.shoes}  price={this.state.price}  ids={this.state.ids} quantity={this.state.quantity} names={this.state.names} images={this.state.images}/>
            // }
            // else
            // {
            //     soldOrForSale = "SOLD"
            // }
        }
        return (
                <div className="form-container">
                    {/* {console.log(this.state.price)} */}
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