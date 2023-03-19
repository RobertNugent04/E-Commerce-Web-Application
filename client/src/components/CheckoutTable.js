import React, {Component} from "react"
import CheckoutTableRow from "./CheckoutTableRow"

const today = new Date();
const dayOfWeek = today.getDay()


export default class CartTable extends Component 
{
    render() 
    {
        return (
                <div>
                    {this.props.cars.map((car) => <CheckoutTableRow key={car._id} car={car}/>)}
                    <hr></hr>
    
                    {dayOfWeek === 2 ? // if today is tuesday it will strikethrough the checkout price
                            <div><strike> Total Price: €{this.props.cars.reduce((total, car) => total + car.price * car.amount, 0)}</strike> <i>*Tuesday Discount: 10% </i></div>

                            :
                            null

                        }

                        {dayOfWeek === 2 ? // if today is tuesday it will display the discounted price
                            <div><h2>Total Price: €{this.props.cars.reduce((total, car) => total + car.price * car.amount * 0.9, 0)}</h2></div>

                            :
                            <div><h2>Total Price: €{this.props.cars.reduce((total, car) => total + car.price * car.amount, 0)}</h2></div>

                        }
                </div> 
        )
    }
}