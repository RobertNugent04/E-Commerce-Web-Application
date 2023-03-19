import React, {Component} from "react"
import axios from "axios"
import {Link} from "react-router-dom"


import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN,SERVER_HOST} from "../config/global_constants"


export default class CarTableRow extends Component 
{    

    componentDidMount() 
    {
        this.props.car.photos.map(photo => 
        {
            return axios.get(`${SERVER_HOST}/cars/photo/${photo.filename}`)
            .then(res => 
            {
                if(res.data)
                {  
                    console.log(res.data)          
                    if (res.data.errorMessage)
                    {
                        console.log(res.data.errorMessage)    
                    }
                    else
                    {           
                        document.getElementById(photo._id).src = `data:;base64,${res.data.image}`    
                        console.log(`data:;base64,${res.data.image}` )                                                     
                    }   
                }
                else
                {
                    console.log("Record not found")
                }
            })
        })
    }
    render() 
    {
        return (
            <tr>
                <td>{this.props.car.name}</td>
                <td className = "hide">{this.props.car.brand}</td>
                <td className = "hide">{this.props.car.gender}</td>
                <td className = "hide">{this.props.car.category}</td>
                <td className = "hide">{this.props.car.price}</td>
                <td>{this.props.car.items_left}</td>
                <td>
                    {localStorage.accessLevel > ACCESS_LEVEL_GUEST ? <Link className="green-button" to={"/EditCar/" + this.props.car._id}>Edit</Link> : null}
                    
                    {localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? <Link  className="red-button" to={"/DeleteCar/" + this.props.car._id}>Delete</Link> : null}   
                    
                
                </td>
            </tr>
        )
    }
}