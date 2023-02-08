import React, {Component} from "react"
export default class Search extends Component
{
    render()
    {   
        let a = this.props.searchBy
    
        return(
            <div id = "searchBox">
            <input type = "text" placeholder = "Search....." onChange={this.props.handleSearchChange}/>
            <label className="search-by">SearchBy:</label>
            <select id="searchBy" onClick={this.props.handleChange}>{this.props.searchBy.map(stuff => <option key={stuff} value={stuff}>{stuff}</option>)}</select>
            </div>
        )
    }
}