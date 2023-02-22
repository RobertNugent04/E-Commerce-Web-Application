import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
import Form from "react-bootstrap/Form"

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


    render()
    {        
        return (
            <div className="form-container"> 
                {this.state.redirectToDisplayAllCars ? <Redirect to="/DisplayAllCars"/> : null}                                            
                    
                <Form>
                    <Form.Group controlId="model">
                        <Form.Label>Name</Form.Label>
                        <Form.Control ref = {(input) => { this.inputToFocus = input }} type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="brand">
                        <Form.Label>Brand</Form.Label>
                        <Form.Control type="text" name="brand" value={this.state.brand} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="gender">
                        <Form.Label>Gender</Form.Label>
                        <Form.Control type="text" name="gender" value={this.state.gender} onChange={this.handleChange} />
                    </Form.Group>
                    
                    <Form.Group controlId="category">
                        <Form.Label>Category</Form.Label>
                        <Form.Control type="text" name="category" value={this.state.category} onChange={this.handleChange} />
                    </Form.Group>
        
                    <Form.Group controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text" name="price" value={this.state.price} onChange={this.handleChange} />
                    </Form.Group>
                    
                    <Form.Group controlId="stock">
                        <Form.Label>Stock</Form.Label>
                        <Form.Control type="text" name="stock" value={this.state.stock} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="photos">
                    <Form.Label>Photos</Form.Label>
                    <Form.Control          
                        type = "file" multiple onChange = {this.handleFileChange}
                    /></Form.Group> 
  
                    <LinkInClass value="Update" className="green-button" onClick={this.handleSubmit}/>  
    
                    <Link className="red-button" to={"/DisplayAllCars"}>Cancel</Link>
                </Form>
            </div>
        )
    }
}