import React, { Component } from "react"

export default class Filter extends Component {
  render() {
    const shoes = this.props.shoes
    const genders = [...new Set(shoes.map(shoe => shoe.gender))]; // Get unique genders from the data
    const brands = [...new Set(shoes.map(shoe => shoe.brand))];
    const colors = [...new Set(shoes.map(shoe => shoe.color))];
    const categories = [...new Set(shoes.map(shoe => shoe.category))];

    return (
      <div className="filter-container">
        <div>
          <span className="filter-heading">Filter by Gender: </span><br></br>
          {genders.map(gender => (
            <label key={gender}>
              <input type="checkbox" name="genders" value={gender} onChange={this.props.handleFilterChange} />
              {gender}
              <br></br></label>
          ))}
        </div><br></br>

        <div>
        <span className="filter-heading">Filter by Brand: </span><br></br>
          {brands.map(brand => (
            <label key={brand}>
              <input type="checkbox" name="brands" value={brand} onChange={this.props.handleFilterChange} />
              {brand}
              <br></br></label>
          ))}
        </div><br></br>

        <div>
        <span className="filter-heading">Filter by Color: </span><br></br>
          {colors.map(color => (
            <label key={color}>
              <input type="checkbox" name="colors" value={color} onChange={this.props.handleFilterChange} />
              {color}
              <br></br></label>
          ))}
        </div><br></br>

        <div>
        <span className="filter-heading">Filter by Category: </span><br></br>
          {categories.map(category => (
            <label key={category}>
              <input type="checkbox" name="categories" value={category} onChange={this.props.handleFilterChange} />
              {category}
              <br></br></label>
          ))}
        </div><br></br>
        </div>
    )
  }
}
