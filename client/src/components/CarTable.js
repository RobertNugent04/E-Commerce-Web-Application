import React, {Component} from "react"
import CarTableRow from "./CarTableRow"


export default class CarTable extends Component 
{
    render() 
    {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th className = "hide">Brand</th>
                        <th className = "hide">Gender</th>
                        <th className = "hide">Category</th>
                        <th className = "hide">Price</th>
                        <th>Stock</th>
                        <th> </th>
                    </tr>
                </thead>
                  
                <tbody>
                    {this.props.cars.map((car) => <CarTableRow key={car._id} car={car}/>)}
                </tbody>
            </table>      
        )
    }
}