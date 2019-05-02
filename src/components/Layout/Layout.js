import React , {Component} from 'react';
import AuxWrapper from '../../hoc/AuxWrapper';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

// Since we cannot export side-by-side jsx elements, we created an HOC - higher order component
// That the only thing it does is wrap the jsx elements 

class Layout extends Component {

    state = {
        showSideDrawer:true
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer:false});
    }

    render () {
        
        return(
            <AuxWrapper>
                <Toolbar />
                <SideDrawer 
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </AuxWrapper>
        );
    };

}

export default Layout;