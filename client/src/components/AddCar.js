import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"


import axios from "axios"

import LinkInClass from "../components/LinkInClass"

import {ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../config/global_constants"


export default class AddCar extends Component
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
            stock: ``,
            selectedFiles:null,
            redirectToDisplayAllCars:localStorage.accessLevel < ACCESS_LEVEL_ADMIN
        }
    }


    componentDidMount() 
    {     
        this.inputToFocus.focus()        
    }
 
 
    handleChange = (e) => 
    {
        this.setState({[e.target.name]: e.target.value})
    }
    
    handleFileChange = (e) => 
    {
        this.setState({selectedFiles: e.target.files})
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

        let formData = new FormData()  

        formData.append("name", this.state.name)
        formData.append("brand", this.state.brand)
        formData.append("gender", this.state.gender)
        formData.append("category", this.state.category) 
        formData.append("price", this.state.price) 
        formData.append("items_left", this.state.stock)
        
        if(this.state.selectedFiles)
        {
            for(let i = 0; i < this.state.selectedFiles.length; i++)
            {
                formData.append("shoePhotos", this.state.selectedFiles[i])
            }
        }


        // const carObject = {
        //     name: this.state.name,
        //     brand: this.state.brand,
        //     gender: this.state.gender,
        //     category: this.state.category,
        //     price: this.state.price,
        //     items_left: this.state.stock,
        // }

        axios.post(`${SERVER_HOST}/cars`, formData, {headers:{"authorization":localStorage.token}})
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
        return pattern.test(String(this.state.stock))
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
                {this.state.redirectToDisplayAllCars ? <Redirect to="/DisplayAllCars"/> : null}                                            
                    
                <div>
                    <div controlId="model">
                        <label>Name</label>
                        <input ref = {(input) => { this.inputToFocus = input }} type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                        {" "}
                        {nameError}
                    </div>

                    <div controlId="brand">
                        <label>Brand</label>
                        <input type="text" name="brand" value={this.state.brand} onChange={this.handleChange} />
                        {" "}
                        {brandError}
                    </div>

                    <div controlId="gender">
                        <label>Gender</label>
                        <input type="text" name="gender" value={this.state.gender} onChange={this.handleChange} />
                    </div>
                    
                    <div controlId="category">
                        <label>Category</label>
                        <input type="text" name="category" value={this.state.category} onChange={this.handleChange} />
                    </div>
        
                    <div controlId="price">
                        <label>Price</label>
                        <input type="text" name="price" value={this.state.price} onChange={this.handleChange} />
                        {" "}
                        {priceError}
                    </div>
                    
                    <div controlId="stock">
                        <label>Stock</label>
                        <input type="text" name="stock" value={this.state.stock} onChange={this.handleChange} />
                        {" "}
                        {stockError}
                    </div>

                    <div controlId="photos">
                    <label>Photos</label>
                    <input          
                        type = "file" multiple onChange = {this.handleFileChange}
                    /></div> 
  
                    <LinkInClass value="Update" className="green-button" onClick={this.handleSubmit}/>  
    
                    <Link className="red-button" to={"/DisplayAllCars"}>Cancel</Link>
                </div>
            </div>
        )
    }
}