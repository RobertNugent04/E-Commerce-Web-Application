import React, {Component} from "react"
export default class Search extends Component
{    constructor(props) {
    super(props);
    this.state = {
        search: ""
    };
}

handleInputChange = e => {
    this.setState({search: e.target.value});
}

handleSearchClick = () => {
    this.props.handleSearchChange(this.state.search);
}

    render()
    {   
    
        return(
            <div id = "searchBox">
            <input type = "text" placeholder = "Search 🔎" value={this.state.search} onChange={this.handleInputChange}/><input class="green-button" type="button" name="search" value="Search" onClick={this.handleSearchClick}/>
            </div>
        )
    }
}