import React, {Component} from "react"
import UserTableRow from "./UserTableRow"


export default class UserTable extends Component 
{
    render() 
    {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th className = "hide">Email</th>
                        {/* <th className = "hide">Gender</th>
                        <th className = "hide">Category</th>
                        <th className = "hide">Price</th>
                        <th>Stock</th> */}
                        <th> </th>
                    </tr>
                </thead>
                  
                <tbody>
                    {this.props.cars.slice(1).map((car) => <UserTableRow key={car._id} car={car}/>)}
                </tbody>
            </table>      
        )
    }
}