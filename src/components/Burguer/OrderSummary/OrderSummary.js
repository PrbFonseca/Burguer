import React from 'react';
import AuxWrapper from '../../../hoc/AuxWrapper';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {

    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
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
            <p><strong>Total Price: {props.price.toFixed(2)}</strong> </p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCanceled}>CANCEL</Button>
            <Button btnType="Success"  clicked={props.purchaseContinue}>CONTINUE</Button>
        </AuxWrapper>
    )

};

export default orderSummary;