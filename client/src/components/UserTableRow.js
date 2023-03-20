import React, { Component } from "react"
import { Link } from "react-router-dom"

import { ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN } from "../config/global_constants"


export default class UserTableRow extends Component {
    render() {
        return (
            <tr>
                {this.props.car.name == "Administrator" ?

                    null
                    : 
                    [
                        <td>{this.props.car.name}</td>,
                        <td className="hide">{this.props.car.email}</td>,
                        <td>
                            <Link className="green-button" to={"/EditUser/" + this.props.car._id}>Edit</Link> 

                           <Link className="red-button" to={"/UserDelete/" + this.props.car._id}>Delete</Link> 


                        </td>
                        ]
                    
                    
                }
            </tr>
        )
    }
}