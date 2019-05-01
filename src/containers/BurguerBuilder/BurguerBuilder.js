import React, {Component} from 'react';
import AuxWrapper from '../../hoc/AuxWrapper';
import Burguer from '../../components/Burguer/Burguer';
import BuildControls from '../../components/Burguer/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burguer/OrderSummary/OrderSummary'

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
        totalPrice: 4,
        purchaseable: false,
        purchasing: false
    }

    updatePurchaseState (ingredients) {

        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el
            },0);

        this.setState({purchaseable: sum > 0});
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

        this.updatePurchaseState(updatedIngredients);
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
            this.updatePurchaseState(updatedIngredients);
        } 


    }

    purchaseHandler = () => {
            this.setState({purchasing:true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    // We'll use our default Aux component because we want to return adjacent JSX elements and we have no need
    // for another Div to wrap them
    render() {
        
        // Check which 'remove' buttons can be visible
        const disabledInfo = {
            ...this.state.ingredients
        };

        // If will set the state of the copied object to true or false
        // depending on the number of ingredients
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        return( 
            <AuxWrapper>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary ingredients={this.state.ingredients}/>
                </Modal>
                <Burguer ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler} 
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled = {disabledInfo}
                    purchaseable={this.state.purchaseable}
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice}
                />
            </AuxWrapper>
        );
    }


}

export default BurguerBuilder;