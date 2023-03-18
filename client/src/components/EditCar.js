import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
import axios from "axios"

import LinkInClass from "../components/LinkInClass"

import {ACCESS_LEVEL_NORMAL_USER, SERVER_HOST} from "../config/global_constants"

import NavBar from "./NavBar"
import Footer from "./Footer"

export default class EditCar extends Component 
{
    constructor(props) 
    {
        super(props)

        this.state = {
            name: ``,
            brand: ``,
            gender: ``,
            category: ``,
            price: ``,
            items_left: ``,
            redirectToDisplayAllCars:localStorage.accessLevel < ACCESS_LEVEL_NORMAL_USER
        }
    }

    componentDidMount() 
    {      
        this.inputToFocus.focus()
  
        axios.get(`${SERVER_HOST}/cars/${this.props.match.params.id}`, {headers:{"authorization":localStorage.token}})
        .then(res => 
        {     
            if(res.data)
            {
                if (res.data.errorMessage)
                {
                    console.log(res.data.errorMessage)    
                }
                else
                { 
                    this.setState({
                        name: res.data.name,
                        brand: res.data.brand,
                        gender: res.data.gender,
                        category: res.data.category,
                        price: res.data.price,
                        items_left: res.data.items_left
                    })
                }
            }
            else
            {
                console.log(`Record not found`)
            }
        })
    }


    handleChange = (e) => 
    {
        this.setState({[e.target.name]: e.target.value})
    }


    handleSubmit = (e) => 
    {
        e.preventDefault()

        this.setState({ wasSubmittedAtLeastOnce: true });

        const formInputsState = this.validate();
        
        if (Object.keys(formInputsState).every(index => formInputsState[index])) 
        {
            const carObject = {
                model: this.state.model,
                colour: this.state.colour,
                stock: this.state.stock,
                price: this.state.price,
                wasSubmittedAtLeastOnce: false
            }

            axios.post(`${SERVER_HOST}/cars`, carObject)
            .then(res => 
            {   
                if(res.data)
                {
                    if (res.data.errorMessage)
                    {
                        console.log(res.data.errorMessage)    
                    }
                    else
                    {   
                        console.log("Record added")
                        this.setState({redirectToDisplayAllCars:true})
                    } 
                }
                else
                {
                    console.log("Record not added")
                }
            })
        }

        const carObject = {
            name: this.state.name,
            brand: this.state.brand,
            gender: this.state.gender,
            category: this.state.category,
            price: this.state.price,
            items_left: this.state.items_left
        }

        axios.put(`${SERVER_HOST}/cars/${this.props.match.params.id}`, carObject, {headers:{"authorization":localStorage.token}})
        .then(res => 
        {             
            if(res.data)
            {
                if (res.data.errorMessage)
                {
                    console.log(res.data.errorMessage)    
                }
                else
                {      
                    console.log(`Record updated`)
                    this.setState({redirectToDisplayAllCars:true})
                }
            }
            else
            {
                console.log(`Record not updated`)
            }
        })
    }

    validateName()
    {    
        //Not empty
        return this.state.name !== "";
    }
    
    
    validateBrand()
    {    
        //Not empty
        return this.state.brand !== "";
    }
    
    validatePrice()
    {    
        const price = parseInt(this.state.price)
        return (price >= 10 && price <= 1000)
    }
    
    validateStock()
    {    
        const pattern = /^[0-9]{1,6}$/
        return pattern.test(String(this.state.items_left))
    }


    validate() 
    {
        return {
            name: this.validateName(),
            brand: this.validateBrand(),
            stock: this.validateStock(),
            price: this.validatePrice()
        };
    }

    render() 
    {

        let nameError = ""
        let brandError = ""
        let priceError = ""
        let stockError = ""

        if(this.state.wasSubmittedAtLeastOnce)
        {

        if (!this.validateName()) {
            nameError = <p>Name can't be empty</p>;
        }
        if (!this.validateBrand()) {
            brandError = <p>Brand can't be empty</p>;
        }
        if (!this.validatePrice()) {
            priceError = <p>Price must be within valid range(10 - 1000)</p>;
        }
        if (!this.validateStock()) {
            stockError = <p>Must be a positive whole number less than 7 digits</p>;
        }
    }

        return (
            <div className="form-container">

<div class="navbar-container">
<NavBar/> 
                        </div> <br/> <br/> <br/> <br/> <br/> <br/> <center>
                    
                <h2 id="title2">Edit Shoe</h2>
    
                {this.state.redirectToDisplayAllCars ? <Redirect to="/DisplayAllCars"/> : null}  
                        
                <div>
                    <div controlId="model">
                        <input ref = {(input) => { this.inputToFocus = input }} type="text" name="name" placeholder = "Name" value={this.state.name} onChange={this.handleChange} />
                        {" "}
                        {nameError}
                    </div>

                    <div controlId="brand">
                        <input type="text" name="brand" placeholder = "Brand" value={this.state.brand} onChange={this.handleChange} />
                        {" "}
                        {brandError}
                    </div>

                    <div controlId="gender">
                        <input type="text" name="gender" placeholder = "Gender" value={this.state.gender} onChange={this.handleChange} />
                    </div>
                    
                    <div controlId="category">
                        <input type="text" name="category" placeholder = "Category" value={this.state.category} onChange={this.handleChange} />
                    </div>
        
                    <div controlId="price">
                        <input type="text" name="price" placeholder = "Price" value={this.state.price} onChange={this.handleChange} />
                        {" "}
                        {priceError}
                    </div>
                    
                    <div controlId="items_left">
                        <input type="text" name="items_left" placeholder = "Number in Stock" value={this.state.items_left} onChange={this.handleChange} />
                        {" "}
                        {stockError}
                    </div><br></br>
  
                    <LinkInClass value="Update" className="green-button" onClick={this.handleSubmit}/>  
    
                    <Link className="red-button" to={"/DisplayAllCars"}>Cancel</Link>
                    </div>
        </center>
                <Footer/>
      </div>
        )
    }
}