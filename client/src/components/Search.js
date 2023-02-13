import React, {Component} from "react"
export default class Search extends Component
{
    render()
    {   
        let a = this.props.searchBy
    
        return(
            <div id = "searchBox">
            <input type = "text" placeholder = "Search 🔎" onChange={this.props.handleSearchChange}/>
            </div>
        )
    }
}