import React, {Component} from 'react';
import AuxWrapper from '../../../hoc/AuxWrapper';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    componentDidUpdate () {
        console.log('[OrderSummry] Will update');
    }


    render() {

        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
                </li>
            )
        });
        
        return(
            <AuxWrapper>
                <h3>Your order</h3>
                <p>A delicious burguer with the following ingredients</p>

                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong> </p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
                <Button btnType="Success"  clicked={this.props.purchaseContinue}>CONTINUE</Button>
            </AuxWrapper>
        );


    }

   

};

export default OrderSummary;