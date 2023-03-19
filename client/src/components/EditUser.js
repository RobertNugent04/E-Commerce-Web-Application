import React, { Component } from "react"
import { Redirect, Link } from "react-router-dom"
import axios from "axios"

import LinkInClass from "../components/LinkInClass"

import { ACCESS_LEVEL_NORMAL_USER, SERVER_HOST } from "../config/global_constants"

import NavBar from "./NavBar"
import Footer from "./Footer"

export default class EditCar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: ``,
            email: ``,
            // gender: ``,
            cart_item: ``,
            profilePhotoFilename: ``,
            items_left: ``,
            redirectToDisplayAllCars: localStorage.accessLevel < ACCESS_LEVEL_NORMAL_USER
        }
    }

    componentDidMount() {
        this.inputToFocus.focus()

        axios.get(`${SERVER_HOST}/users/${this.props.match.params.id}`, { headers: { "authorization": localStorage.token } })
            .then(res => {
                if (res.data) {
                    if (res.data.errorMessage) {
                        console.log(res.data.errorMessage)
                    }
                    else {
                        console.log(res.data)
                        this.setState({
                            name: res.data.name,
                            email: res.data.email,
                            gender: res.data.gender,
                            cart_item: res.data.cart_item,
                            profilePhotoFilename: res.data.profilePhotoFilename
                        })
                    }
                }
                else {
                    console.log(`Record not found`)
                }
            })
    }


    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }


    handleSubmit = (e) => {
        e.preventDefault()
        
        this.setState({ wasSubmittedAtLeastOnce: true });

        const formInputsState = this.validate();
        console.log(this.state.profilePhoto)

        if (Object.keys(formInputsState).every(index => formInputsState[index])) {
            const carObject = {
                model: this.state.model,
                colour: this.state.colour,
                stock: this.state.stock,
                price: this.state.price,
                wasSubmittedAtLeastOnce: false
            }

            axios.post(`${SERVER_HOST}/cars`, carObject)
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

        const carObject = {
            name: this.state.name,
            email: this.state.email,
            // gender: this.state.gender,
            cart_item: this.state.cart_item,
            // price: this.state.price,
            profilePhotoFilename: this.state.profilePhotoFilename
        }

        axios.put(`${SERVER_HOST}/users/${this.props.match.params.id}`, carObject, { headers: { "authorization": localStorage.token } })
            .then(res => {
                if (res.data) {
                    if (res.data.errorMessage) {
                        console.log(res.data.errorMessage)
                    }
                    else {
                        console.log(`Record updated`)
                        this.setState({ redirectToDisplayAllCars: true })
                    }
                }
                else {
                    console.log(`Record not updated`)
                }
            })
    }

    validateName() {
        //Not empty
        return this.state.name !== "";
    }


    validateEmail() {
        //Not empty
        return this.state.email !== "";
    }

    validateCartItem() {
        const items = parseInt(this.state.cart_item)
        return ( items>= 0)
    }

    // validateStock() {
    //     const pattern = /^[0-9]{1,6}$/
    //     return pattern.test(String(this.state.items_left))
    // }


    validate() {
        return {
            name: this.validateName(),
            brand: this.validateEmail()
            // stock: this.validateStock(),
            // price: this.validatePrice()
        };
    }


    resetCart = (e) =>{
        this.setState({cart_item:0})
        axios.delete(`${SERVER_HOST}/cartdelete/${this.state.email}`)
        .then(res =>
        {

            if (res.data)
            {
                if (res.data.errorMessage)
                {
                    console.log(res.data.errorMessage)
                } else
                {
                    console.log('cart reseted')
//                            this.setState({cars: res.data})
                }
            } else
            {
                console.log("cart not reseted")
            }
        })
        window.alert("Cart Reseted click Update to confirm");
    }

    resetProfilePhoto = (e) =>{
        this.setState({profilePhotoFilename:null})
        console.log("profilePhoto" + this.state.profilePhotoFilename)
        window.alert("Profile Photo Reseted click Update to confirm");
    }

    render() {

        let nameError = ""
        let brandError = ""
        let priceError = ""
        let stockError = ""

        if (this.state.wasSubmittedAtLeastOnce) {

            if (!this.validateName()) {
                nameError = <p>Name can't be empty</p>;
            }
            if (!this.validateEmail()) {
                brandError = <p>Brand can't be empty</p>;
            }
            if (!this.validateCartItem()) {
                priceError = <p>Cart item can not be below 0</p>;
            }
            // if (!this.validateStock()) {
            //     stockError = <p>Must be a positive whole number less than 7 digits</p>;
            // }
        }

        return (
            <div className="form-container">
                {console.log(this.state.profilePhotoFilename)}
                <div class="navbar-container">
                    <NavBar />
                </div> <br /> <br /> <br /> <br /> <br /> <br /> <center>

                    <h2 id="title2">Edit User</h2>

                    {this.state.redirectToDisplayAllCars ? <Redirect to="/Users" /> : null}

                    <div>
                        <div controlId="model">
                            <input ref={(input) => { this.inputToFocus = input }} type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.handleChange} />
                            {" "}
                            {nameError}
                        </div>

                        <div controlId="brand">
                            <input type="text" name="brand" placeholder="Brand" value={this.state.email} onChange={this.handleChange} />
                            {" "}
                            {brandError}
                        </div>

                        {/* <div controlId="gender">
                            <input type="text" name="gender" placeholder="Gender" value={this.state.cart_item} onChange={this.handleChange} />
                        </div> */}

                    <br></br>

                        <LinkInClass value="Update" className="green-button" onClick={this.handleSubmit} />
                        <Link className="red-button" onClick={this.resetProfilePhoto}>Reset Profile Photo</Link>
                        <Link className="red-button" onClick={this.resetCart}>Reset Cart</Link>

                        <Link className="red-button" to={"/Users"}>Cancel</Link>
                    </div>
                </center>
                <Footer />
            </div>
        )
    }
}