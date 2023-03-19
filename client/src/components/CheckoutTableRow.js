import React, {Component} from "react"
import {Link} from "react-router-dom"

import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, ACCESS_LEVEL_NORMAL_USER} from "../config/global_constants"


export default class CartTableRow extends Component
{
    render()
    {
        return (
                <table>
                    <tr>
                        <td><b>{this.props.car.name}:</b></td>
                    </tr>
                    <tr>
                        <td>€{this.props.car.price} x {this.props.car.amount}</td>
                    </tr>

                </table>
                )
    }
}