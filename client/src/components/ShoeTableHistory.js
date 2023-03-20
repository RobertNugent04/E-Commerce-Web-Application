import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom"
import axios from "axios";

import Return from "./Return"

import { ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST } from "../config/global_constants"

export default class ShoeTableHistory extends Component {
  constructor(props) 
  {
      super(props)
      
      this.state = {
redirectToReturned: false
      }
  }

  handleSelect = (car, index) => {
    this.updateStocks(car,index)
    car.shoesID.splice(index, 1);
    car.shoe_name.splice(index, 1);
    car.amount.splice(index, 1);
    car.size.splice(index, 1);
    this.updateSales(car); 
    this.setState({redirectToReturned: true})
    
  };

  updateStocks =(car,index)=>{
    console.log(car)
   const id= car.shoesID[index];
    const name =car.shoe_name[index];
   const amount = car.amount[index];
   console.log('name : ' + name + 'id: ' + id + "amount: " + amount)
   
   
   axios.put(`${SERVER_HOST}/salesUpdateStock/${id}/${amount}`, car)
   .then((response) => {
     console.log("Stock Updated:", response.data);
   })
   .catch((error) => {
     console.error("Error Updating Stock:", error);
   });
   
  }
  
  
  updateSales = (car) => {
    console.log("CAR=" + JSON.stringify(car))
    axios.put(`${SERVER_HOST}/sales/${car._id}`, car)
      .then((response) => {
        console.log("Sales data updated:", response.data);
      })
      .catch((error) => {
        console.error("Error updating sales data:", error);
      });
  };

  render() {

    if (this.state.redirectToReturned === true) {
      return <Redirect to="/Return" />
    }

    return (
      <div className="table-container">
        <center>
        <table className = "shoe">
          <thead>
            <tr>
              <th>Name</th>
              <th>Size</th>
              <th>Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { this.props.cars.flatMap((car, index) =>
      car.shoe_name.map((name, index) => (
        <tr key={index}>
          <td>{name.trim()}</td>
          <td>{car.size[index]}</td>
          <td>{car.amount[index]}</td>
          <td>
            <input
              className="green-button"
              type="button"
              name="cart"
              value="Return"
              onClick={() => this.handleSelect(car, index)}
            />
          </td>
        </tr>
      ))
    )}
    </tbody>
        </table>
        </center>
      </div>
    );
  }
}
