import React, {Component} from "react"
import CartTableRow from "./CartTableRow"


export default class CartTable extends Component 
{
    render() 
    {
        return (
                <div>
                    {this.props.cars.map((car) => <CartTableRow key={car._id} car={car}/>)}
                </div>     
        )
    }
}