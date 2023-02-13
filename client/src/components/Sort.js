import React, { Component } from "react"
export default class Sort extends Component {

    
    render() {

        let SortButton = <button className="button" type="button" id="sort-btn" onClick={this.props.handleSortClick}>{this.props.switchKey}</button>

        return (
            <div className="inpt-tags">
                
                <select onClick={this.props.handleSortChange}>{this.props.sortColumn.map(stuff => <option key={stuff} value={stuff}>{stuff}</option>)}</select>
                {SortButton}
            </div>
        )
    }
}