import React, {Component} from 'react';
import AuxWrapper from '../../hoc/AuxWrapper';
import Burguer from '../../components/Burguer/Burguer';
import BuildControls from '../../components/Burguer/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burguer/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';


class BurguerBuilder extends Component {

/*
    state = {
        ingredients:{
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        },
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false
    }

*/

    state = {
 //       ingredients: null,
 //       totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    // The best place to retrieve data will be the ComponentDidMount
    componentDidMount () {

      // Temporarily disable to test the reducer
      //  axios.get('https://react-my-burguer-5e6a4.firebaseio.com/ingredients.json').then( response => {
      //          this.setState({ingredients: response.data})
      //      });
            
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

  /*  addIngredientHandler = (type) => {
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
    }*/

 /*   removeIngredientHandler = (type) => {
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


    }*/

    purchaseHandler = () => {
            this.setState({purchasing:true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
       // alert('You continue!');

       this.setState({loading: true});

       const order = {
           ingredients: this.state.ingredients,
           price: this.state.totalPrice,
           customer: {
               name:'Paulo Fonseca',
               address:{
                   street: 'Rua das Caldas',
                   zipCode:'4300',
                   country:'Portugal'
               },
               email: 'test@test.com'
           },
           deliveryMethod: 'fastest'
       }
        
       // firebase wil create the db structure. It requires .json 
        axios.post('/orders.json',order)
            .then(response => {
                this.setState({loading: false, purchasing:false });
            })
            .catch(error => {
                this.setState({loading: false, });
            });

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


        // Before the ingredients are loaded, we will show a Spinner.
        // Once loaded, we'll render the burguer
        let orderSummary = null;
        let burguer = this.state.error ? "ingredients can't be loaded" : <Spinner/>;

        if (this.props.storeIngredients) {
            burguer = (
                <AuxWrapper>
                    <Burguer ingredients={this.props.storeIngredients}/>
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdded} 
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled = {disabledInfo}
                        purchaseable={this.state.purchaseable}
                        ordered={this.purchaseHandler}
                        price={this.props.storePrice}
                    />
                </AuxWrapper>
                );

             orderSummary= <OrderSummary 
                ingredients={this.props.storeIngredients}
                price={this.props.storePrice}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}/>;
        }

        if (this.state.loading) {
            orderSummary=<Spinner />
        }

        return( 
            <AuxWrapper>
                <Modal 
                    show={this.state.purchasing} 
                    modalClosed={this.purchaseCancelHandler}>
                   {orderSummary}
                </Modal>
               {burguer}
            </AuxWrapper>
        );
    }


}

 // maps a state from the store into a received prop. 
 // So we can access all ingredients from the store in this component as 'this.props.storeIngredients'
const mapStateToProps = state => {
    return {
        storeIngredients: state.ingredients,
        storePrice: state.totalPrice   
    };
}

// Maps store procedures to props
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT,ingredientName:ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT,ingredientName:ingName}),
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurguerBuilder, axios));