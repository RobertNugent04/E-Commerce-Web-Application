import React, {Component} from "react"
// import ShoeTableElement from "./ShoeTableElement"


export default class ShoeTable extends Component 
{
    render() 
    {
        return (
                <div>
                    {console.log(this.props)}
                    {this.props.cars.map((car) => <table className = "shoe">
                    <tr>
                    <td><h5>{car.shoe_name}</h5></td>
                    </tr>
                    {/* <tr>
                        <td><img src = {this.props.car.imageURL} alt = {this.props.car.name}></img></td>
                    </tr>
                    <tr>
                        <td>{this.props.car.brand}</td>
                    </tr>
                    <tr>
                        <td>€{this.props.car.price}</td>
                    </tr> */}
                    <tr>
                    </tr>
                </table>)}
                </div>     
        )
    }
}