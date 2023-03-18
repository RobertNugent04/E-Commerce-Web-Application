import React, {Component} from "react"
import {Link} from "react-router-dom"

import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, ACCESS_LEVEL_NORMAL_USER} from "../config/global_constants"


export default class CartTableRow extends Component
{
    render()
    {
        return (
                <table className = "shoe">
                    <tr>
                    <td><h5>{this.props.car.name}</h5></td>
                    </tr>
                    <tr>
                    <Link to={`/Product?shoeID=${this.props.car._id}`}><td><img src={this.props.car.imageURL} alt={this.props.car.name}></img></td></Link>
                    </tr>
                    <tr>
                        <td>{this.props.car.brand}</td>
                    </tr>
                    <tr>
                        <td>Size: {this.props.car.size}</td>
                    </tr>
                    <tr>
                        <td>Price: €{this.props.car.price}</td>
                    </tr>
                    <tr>
                        <td>Amount: {this.props.car.amount}<br></br></td>
                    </tr>
                    <tr>
                        <td>
                        <div className="shoeButtons">
                
                            {localStorage.accessLevel >= ACCESS_LEVEL_NORMAL_USER ? <Link className="red-button" to={"/CartDelete/" + this.props.car._id + "/" +this.props.car.amount }>Delete</Link> : null}   
                        </div>                    
                        </td>
                    </tr>
                    <tr>
                    </tr>
                </table>
                )
    }
}