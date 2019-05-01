import React from 'react';
import AuxWrapper from '../../hoc/AuxWrapper';
import classes from './Layout.css';

// Since we cannot export side-by-side jsx elements, we created an HOC - higher order component
// That the only thing it does is wrap the jsx elements 

const layout = (props) => (
    <AuxWrapper>
        <div>Tooldbar, SideDrawer, Backdrop</div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </AuxWrapper>
);

export default layout;