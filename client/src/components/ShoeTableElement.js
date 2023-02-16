import React, {Component} from "react"
import {Link} from "react-router-dom"

import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN} from "../config/global_constants"


export default class ShoeTableElement extends Component
{
    render()
    {
        return (
                <table className = "shoe">
                    <tr>
                    <td><h5>{this.props.car.name}</h5></td>
                    </tr>
                    <tr>
                        <td><img src = {this.props.car.imageURL} alt = {this.props.car.name}></img></td>
                    </tr>
                    <tr>
                        <td>{this.props.car.brand}</td>
                    </tr>
                    <tr>
                        <td>€{this.props.car.price}</td>
                    </tr>
                    <tr>
                        <td>
                            {localStorage.accessLevel > ACCESS_LEVEL_GUEST ? <Link className="green-button" to={"/EditCar/" + this.props.car._id}>Edit</Link> : null}
                
                            {localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? <Link className="red-button" to={"/DeleteCar/" + this.props.car._id}>Delete</Link> : null}   
                        </td>
                    </tr>
                </table>
                )
    }
}