import React, { Component } from "react";
import axios from "axios";

import { ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST } from "../config/global_constants"

export default class ShoeTableHistory extends Component {

  handleSelect = (car, index) => {
    car.shoesID.splice(index, 1);
    car.shoe_name.splice(index, 1);
    car.amount.splice(index, 1);
    car.size.splice(index, 1);
    this.updateSales(car); 
    this.forceUpdate();

  };

  updateSales = (car) => {
    axios.put(`${SERVER_HOST}/sales/${car._id}`, car)
      .then((response) => {
        console.log("Sales data updated:", response.data);
      })
      .catch((error) => {
        console.error("Error updating sales data:", error);
      });
  };

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Size</th>
              <th>Amount</th>
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
      </div>
    );
  }
}
