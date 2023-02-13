/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


import React, {Component} from "react"
import {Redirect} from "react-router-dom"
import axios from "axios"

import {SERVER_HOST} from "../config/global_constants"


export default class Reset extends Component 
{
    constructor(props) 
    {
        super(props)
        
        this.state = {
            redirectToDisplayAllCars:true   
        }
    }
    
    
       componentDidMount()
    {
        axios.get(`${SERVER_HOST}/reset`)
                .then(res =>
                {

                    if (res.data)
                    {
                        if (res.data.errorMessage)
                        {
                            console.log(res.data.errorMessage)
                        } else
                        {
                            console.log(res.data)
//                            this.setState({cars: res.data})
                        }
                    } else
                    {
                        console.log("Record not found")
                    }
                })
    }
  
  
    render() 
    {
        return (
            <div>  
    {console.log(this.props.match.params.id)}
    {console.log(this.state.redirectToDisplayAllCars)}
                {this.state.redirectToDisplayAllCars ? <Redirect
            to={{
            pathname: "/DisplayAllCars",

          }}
        /> : null}                      
            </div>
        )
    }
}