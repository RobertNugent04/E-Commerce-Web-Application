import React, {Component} from "react"
import {Link} from "react-router-dom"

import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN} from "../config/global_constants"


export default class CarTableRow extends Component 
{    
    render() 
    {
        return (
            <tr>
                <td>{this.props.car.name}</td>
                <td>{this.props.car.brand}</td>
                <td>{this.props.car.gender}</td>
                <td>{this.props.car.category}</td>
                <td>{this.props.car.price}</td>
                <td>{this.props.car.items_left}</td>
                <td>
                    {localStorage.accessLevel > ACCESS_LEVEL_GUEST ? <Link className="green-button" to={"/EditCar/" + this.props.car._id}>Edit</Link> : null}
                    
                    {localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? <Link className="red-button" to={"/DeleteCar/" + this.props.car._id}>Delete</Link> : null}   
                </td>
            </tr>
        )
    }
}