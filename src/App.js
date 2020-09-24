import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import LoginPanel from './LoginPanelRedux';
import PokemonBrowser from './PokemonBrowserRedux';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    rest.needLogin === true
      ? <Redirect to='/login' />
      : <Component {...props} />
  )} />
)

class App extends React.Component {




  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login"
            component={LoginPanel} />
          <PrivateRoute path="/"
                        exact={true}
                        needLogin={this.props.needLogin}
                        component={PokemonBrowser} />
          <PrivateRoute path="/pokemon/:pokemonId"
                        exact={true}
                        needLogin={this.props.needLogin}
                        component={PokemonBrowser} />
        </Switch>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = (state) => ({
  currentUserId: state.authentication.id,
  needLogin: !(state.authentication.id),
})

const mapDispatchToProps = (dispatch) => ({

})


export default connect(mapStateToProps, mapDispatchToProps)(App);
