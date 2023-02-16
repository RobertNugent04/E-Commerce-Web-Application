import React, {Component} from "react"
import ShoeTableElement from "./ShoeTableElement"


export default class ShoeTable extends Component 
{
    render() 
    {
        return (
                <div>
                    {this.props.cars.map((car) => <ShoeTableElement key={car._id} car={car}/>)}
                </div>     
        )
    }
}