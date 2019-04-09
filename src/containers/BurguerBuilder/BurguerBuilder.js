import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burguer from '../../components/Burguer/Burguer';
import BuildControls from '../../components/Burguer/BuildControls/BuildControls';

// Define a constant with the ingredient prices
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurguerBuilder extends Component {

    state = {
        ingredients:{
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        },
        totalPrice: 4
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount +1;

        const updatedIngredients =  {
            ...this.state.ingredients
        }  
        
        updatedIngredients[type] = updatedCount;

        // Calculate the new total price
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        // Update the state 
        this.setState({totalPrice: newPrice, ingredients:updatedIngredients});
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];

        if (oldCount>0) {
            const updatedCount = oldCount -1;

            const updatedIngredients =  {
                ...this.state.ingredients
            }  
            
            updatedIngredients[type] = updatedCount;
    
            // Calculate the new total price
            const priceReduction= INGREDIENT_PRICES[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - priceReduction;
    
            // Update the state 
            this.setState({totalPrice: newPrice, ingredients:updatedIngredients});
        } 


    }

    // We'll use our default Aux component because we want to return adjacent JSX elements and we have no need
    // for another Div to wrap them
    render() {
       return( 
        <Aux>
            <Burguer ingredients={this.state.ingredients}/>
            <BuildControls 
                ingredientAdded={this.addIngredientHandler} 
                ingredientRemoved={this.removeIngredientHandler}
            />
        </Aux>
       );
    }


}

export default BurguerBuilder;