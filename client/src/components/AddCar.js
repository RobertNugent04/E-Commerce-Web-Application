import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"


import axios from "axios"

import LinkInClass from "../components/LinkInClass"

import {ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../config/global_constants"

import NavBar from "./NavBar"
import Footer from "./Footer"


export default class AddCar extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            name: ``,
            brand: ``,
            gender: ``,
            color: ``,
            category: ``,
            price: ``,
            stock: ``,
            size:"",
            sizes:[""],
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
        formData.append("color", this.state.color)
        formData.append("category", this.state.category) 
        formData.append("price", this.state.price) 
        formData.append("items_left", this.state.stock)
        this.state.sizes.forEach(size => {
            formData.append("sizes", size)
        })
        
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

    validateColor()
    {    
        //Not empty
        return this.state.color !== "";
    }

    validateCategory()
    {    
        //Not empty
        return this.state.category !== "";
    }

    validateGender()
    {    
        //Not empty
        return this.state.gender !== "";
    }

    validateSize()
    {    
        //Not empty
        return this.state.size !== "";
    }

    validate() 
    {
        return {
            name: this.validateName(),
            brand: this.validateBrand(),
            stock: this.validateStock(),
            price: this.validatePrice(),
            color: this.validateColor(),
            category: this.validateCategory(),
            gender: this.validateGender(),
            size: this.validateSize()
        };
    }

    handleAddSize = () => {
        // Add an empty string to the sizes array
        this.setState(prevState => ({ sizes: [...prevState.sizes, ""] }))
    }

    handleChangeSize = (e, index) => {
        // Update the size at the specified index in the sizes array
        this.setState({size: e.target})
        const { value } = e.target
        this.setState(prevState => ({
            sizes: [
                ...prevState.sizes.slice(0, index),
                value,
                ...prevState.sizes.slice(index + 1)
            ]
        }))
    }

    render()
    {        

        let nameError = ""
        let brandError = ""
        let priceError = ""
        let stockError = ""
        let colorError = ""
        let categoryError = ""
        let genderError = ""
        let sizeError = ""

        if(this.state.wasSubmittedAtLeastOnce)
        {

        if (!this.validateName()) {
            nameError = <p class="error">Name can't be empty</p>;
        }
        if (!this.validateBrand()) {
            brandError = <p class="error">Brand can't be empty</p>;
        }
        if (!this.validateColor()) {
            colorError = <p class="error">Color can't be empty</p>;
        }
        if (!this.validatePrice()) {
            priceError = <p class="error">Price must be within valid range(10 - 1000)</p>;
        }
        if (!this.validateStock()) {
            stockError = <p class="error">Must be a positive whole number less than 7 digits</p>;
        }
        if (!this.validateCategory()) {
            categoryError = <p class="error">Category can't be empty</p>;
        }
        if (!this.validateGender()) {
            genderError = <p class="error">Gender can't be empty</p>;
        }
        if (!this.validateSize()) {
            sizeError = <p class="error">Size can't be empty</p>;
        }
    }

        return (
            <div className="form-container">

<div class="navbar-container">
<NavBar/> 
                        </div> <br/> <br/> <br/> <br/> <br/> <br/> <center>
                    
                <h2 id="title2">Add Shoe</h2> 
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
                        {" "}
                        {genderError}
                    </div>
                    
                    <div controlId="color">
                        <input type="text" name="color" placeholder = "Color" value={this.state.color} onChange={this.handleChange} />
                        {" "}
                        {colorError}
                    </div>

                    <div controlId="category">
                        <input type="text" name="category" placeholder = "Category" value={this.state.category} onChange={this.handleChange} />
                        {" "}
                        {categoryError}
                    </div>
        
                    <div controlId="price">
                        <input type="text" name="price" placeholder = "Price" value={this.state.price} onChange={this.handleChange} />
                        {" "}
                        {priceError}
                    </div>
                    
                    <div controlId="stock">
                        <input type="text" name="stock" placeholder = "Number in Stock" value={this.state.stock} onChange={this.handleChange} />
                        {" "}
                        {stockError}
                    </div>

                    {this.state.sizes.map((size, index) => (
            <div key={index} controlId={`size-${index}`}>
                <input
                    type="text"
                    name={`size-${index}`}
                    placeholder={`size ${index + 1}`}
                    value={size}
                    onChange={e => this.handleChangeSize(e, index)}
                />
            </div>
        ))}
                        {" "}
                        {sizeError}

<input type="button" value="Add size" onClick={this.handleAddSize}/>

                    <div controlId="photos">
                    <input          
                        type = "file" placeholder = "Photo" multiple onChange = {this.handleFileChange}
                    /></div><br></br> 
  
                    <LinkInClass value="Add" className="green-button" onClick={this.handleSubmit}/>  
    
                    <Link className="red-button" to={"/DisplayAllCars"}>Cancel</Link>
                    </div>
        </center>
                <Footer/>
      </div>
        )
    }
}