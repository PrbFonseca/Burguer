import React from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.css';

// Since we cannot export side-by-side jsx elements, we created an HOC - higher order component
// That the only thing it does is wrap the jsx elements 

const layout = (props) => (
    <Aux>
        <div>Tooldbar, SideDrawer, Backdrop</div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;