import React, { Component } from "react"
// import ShoeTableElement from "./ShoeTableElement"


export default class ShoeTable extends Component {
   


render() {
    let names = this.props.cars.map((car)=>car.shoe_name);
    let amount = this.props.cars.map((car)=>car.amount);
    let amountsep=[]
    // amount.forEach(element => {
    //     for(let i =0; i<element.length;i++){
    //         amountsep.concat(element[i])
    //     }
    // });

    return (
        <div>
            <table>
                <th>name</th>
                <th>amount</th>
                <tr>
                    {console.log(amountsep)}
                   <td> {names.map((name) =>
                        <tr> {name}</tr>
                    )}</td>
                    <td> {amount.map((name) =>
                        <tr> {name}</tr>
                    )}</td>
                </tr>
                
                
            </table>
        </div>
    )
}
}