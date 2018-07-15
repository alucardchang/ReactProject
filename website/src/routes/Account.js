import React from 'react';
import {connect} from 'react-redux';
import {Switch, Route, Redirect} from 'react-router-dom';

/*Sub Component*/
import Login from './account/Login';
import Register from './account/Register';
import Info from './account/Info';
// import Tip from './account/Tip';

/*API Function*/
import {checkLogin} from '../api/account';

/*CSS*/
import '../static/css/account.less'

class Account extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            login: false
        }
    }

    async componentWillMount() {
        //判断是否已经登陆
        // console.log("Will mount");
        let result = await checkLogin(),
            login = parseFloat(result.code) === 0 ? true : false;
        this.setState({login});
    }

    /*当登陆成功或注销时，由于一级路由组件Account之前没有被销毁，走的是更新流程，所以需要再次检测是否已经登陆*/
    async componentWillReceiveProps() {
        let result = await checkLogin(),
            login = parseFloat(result.code) === 0 ? true : false;
        this.setState({login});
    }

    render() {
        // console.log("Render");
        let {login} = this.state;
        // console.log(login);
        return <section>
            <Switch>
                <Route path='/account/info' render={() => {
                    if (login) {
                        return <Info/>
                    }
                    return <Login/>
                }}/>
                <Route path='/account/register' component={Register}/>
                <Redirect from='/account' to='/account/info'/>
            </Switch>
        </section>
    }
}

export default connect()(Account);