import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect, Switch, Link} from 'react-router-dom';

/*Info Component & List Component*/
import Info from './product/Info';
import ProductList from './product/List';

/*Import CSS*/
import '../static/css/product.less'

class Product extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {

        return <section>
            <Switch>
                <Route path="/product/list" exact component={ProductList}/>
                <Route path="/product/info" component={Info}/>
                <Redirect from="/product" to="/product/list" component={ProductList}/>
            </Switch>
        </section>
    }
}

export default connect()(Product);