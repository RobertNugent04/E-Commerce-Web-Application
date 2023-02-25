import React, { Component } from "react"
import { Redirect, Link } from "react-router-dom"
import Form from "react-bootstrap/Form"

import axios from "axios"

import LinkInClass from "../components/LinkInClass"
import { ACCESS_LEVEL_GUEST } from "../config/global_constants"


import { ACCESS_LEVEL_ADMIN, SERVER_HOST } from "../config/global_constants"


export default class AddCar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: localStorage.getItem("name"),
            picture: null,
            email: ''
        }
    }


    // componentDidMount() 
    // {     
    //     this.inputToFocus.focus()        
    // }


    // handleChange = (e) => 
    // {
    //     this.setState({[e.target.name]: e.target.value})
    // }

    // handleFileChange = (e) => 
    // {
    //     this.setState({selectedFiles: e.target.files})
    // }



    // handleSubmit = (e) => 
    // {
    //     e.preventDefault()

    //     let formData = new FormData()  

    //     formData.append("name", this.state.name)
    //     formData.append("brand", this.state.brand)
    //     formData.append("gender", this.state.gender)
    //     formData.append("category", this.state.category) 
    //     formData.append("price", this.state.price) 
    //     formData.append("items_left", this.state.stock)

    //     if(this.state.selectedFiles)
    //     {
    //         for(let i = 0; i < this.state.selectedFiles.length; i++)
    //         {
    //             formData.append("shoePhotos", this.state.selectedFiles[i])
    //         }
    //     }


    // const carObject = {
    //     name: this.state.name,
    //     brand: this.state.brand,
    //     gender: this.state.gender,
    //     category: this.state.category,
    //     price: this.state.price,
    //     items_left: this.state.stock,
    // }

    // axios.post(`${SERVER_HOST}/cars`, formData, {headers:{"authorization":localStorage.token}})
    //     .then(res => 
    //     {   
    //         if(res.data)
    //         {
    //             if (res.data.errorMessage)
    //             {
    //                 console.log(res.data.errorMessage)    
    //             }
    //             else
    //             {   
    //                 console.log("Record added")
    //                 this.setState({redirectToDisplayAllCars:true})
    //             } 
    //         }
    //         else
    //         {
    //             console.log("Record not added")
    //         }
    //     })
    // }


    render() {
        return (
            <div id="profilePage">
                {

                    localStorage.accessLevel > ACCESS_LEVEL_GUEST
                        ?


                        <div id="profileContainer">

                            {
                                localStorage.profilePhoto !== "undefined"
                                    ? <div className="profilePict"><img id="profilePhoto" src={`data:;base64,${localStorage.profilePhoto}`} alt="" /></div>
                                    : <div>

                                        <img id="profilePhoto" src={".\client\images\profile_picture.png"} alt="" />
                                    </div>


                            }

                            <div id="profileName">
                                <Form.Label>Name :</Form.Label>
                                <p>{localStorage.getItem("name")}</p>
                            </div>

                            <div id="profileEmail">
                                <Form.Label>Email :</Form.Label>
                                <p>{localStorage.getItem("email")}</p>
                            </div>


                        </div>


                        :
                        <div>

                            <img id="profilePhoto" src={"./images/profile_picture.png"} alt="" />
                        </div>

                }

            </div>
        )
    }
}