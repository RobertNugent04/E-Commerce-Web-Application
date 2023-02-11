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
                        <th>Brand</th>
                        <th>Gender</th>
                        <th>Category</th>
                        <th>Price</th>
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