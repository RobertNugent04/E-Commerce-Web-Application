import React, { Component } from "react"

export default class Filter extends Component {
  render() {
    const shoes = this.props.shoes
    const genders = [...new Set(shoes.map(shoe => shoe.gender))]; // Get unique genders from the data
    const brands = [...new Set(shoes.map(shoe => shoe.brand))];
    const colors = [...new Set(shoes.map(shoe => shoe.color))];
    const sizes = [...new Set(shoes.flatMap(shoe => shoe.sizes))];

    return (
      <div>
        <div>
          <span>Filter by Gender: </span>
          {genders.map(gender => (
            <label key={gender}>
              <input type="checkbox" name="genders" value={gender} onChange={this.props.handleFilterChange} />
              {gender}
            </label>
          ))}
        </div>

        <div>
          <span>Filter by Brand: </span>
          {brands.map(brand => (
            <label key={brand}>
              <input type="checkbox" name="brands" value={brand} onChange={this.props.handleFilterChange} />
              {brand}
            </label>
          ))}
        </div>

        <div>
          <span>Filter by Color: </span>
          {colors.map(color => (
            <label key={color}>
              <input type="checkbox" name="colors" value={color} onChange={this.props.handleFilterChange} />
              {color}
            </label>
          ))}
        </div>
      </div>
    )
  }
}
