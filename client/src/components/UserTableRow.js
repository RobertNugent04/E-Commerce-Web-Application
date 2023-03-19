import React, {Component} from "react"
import {Link} from "react-router-dom"

import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN} from "../config/global_constants"


export default class UserTableRow extends Component 
{    
    render() 
    {
        return (
            <tr>
                <td>{this.props.car.name}</td>
                <td className = "hide">{this.props.car.email}</td>
                {/* <td className = "hide">{this.props.car.gender}</td>
                <td className = "hide">{this.props.car.category}</td>
                <td className = "hide">{this.props.car.price}</td> */}
                <td>
                    {localStorage.accessLevel > ACCESS_LEVEL_GUEST ? <Link className="green-button" to={"/EditUser/" + this.props.car._id}>Edit</Link> : null}
                    
                    {localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? <Link  className="red-button" to={"/UserDelete/" + this.props.car._id}>Delete</Link> : null}   
                    
                
                </td>
                
            </tr>
        )
    }
}