import React, {Component} from "react"
import Form from "react-bootstrap/Form"
import {Redirect, Link} from "react-router-dom"
import axios from "axios"

import LinkInClass from "../components/LinkInClass"

import {ACCESS_LEVEL_NORMAL_USER, SERVER_HOST} from "../config/global_constants"

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
                    
                    <Form.Group controlId="items_left">
                        <Form.Label>Stock</Form.Label>
                        <Form.Control type="text" name="items_left" value={this.state.items_left} onChange={this.handleChange} />
                    </Form.Group>
  
                    <LinkInClass value="Update" className="green-button" onClick={this.handleSubmit}/>  
    
                    <Link className="red-button" to={"/DisplayAllCars"}>Cancel</Link>
                </Form>
            </div>
        )
    }
}