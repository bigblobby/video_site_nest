import React, {Suspense} from 'react';
import '../scss/app.scss';
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Route, Switch, Link } from 'react-router-dom';
import { routerMiddleware, ConnectedRouter } from 'connected-react-router';
import rootReducer from "./reducers";
import history from "./history";
import Header from "./components/Header";
import PrivateRoute from "./routes/PrivateRoute";
import GuestRoute from "./routes/GuestRoute";
import Notifier from "./components/Notifier";

const middleware = [
    thunk,
    routerMiddleware(history)
];

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;

const store = createStore(
    rootReducer(history),
    composeEnhancers(
        applyMiddleware(...middleware)
    ),
);

const Homepage = React.lazy(() => import("./pages/Homepage"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const RegisterPage = React.lazy(() => import("./pages/RegisterPage"));
const ForgotPasswordPage = React.lazy(() => import("./pages/ForgotPasswordPage"));
const UserChannelPage = React.lazy(() => import("./pages/UserChannelPage"));
const UserProfilePage = React.lazy(() => import("./pages/UserProfilePage"));
const UserVerifyPage = React.lazy(() => import("./pages/UserVerifyPage"));

function Routes() {
    return (
        <Provider store={ store }>
            <ConnectedRouter history={history}>
                <div className="site-content">
                    <Header />
                    <Notifier />

                    <Suspense fallback={'Loading'}>
                        <Switch>
                            <Route exact path="/" component={Homepage} />
                            <GuestRoute exact path="/login" verify component={LoginPage} />
                            <GuestRoute exact path="/register" verify component={RegisterPage} />
                            <Route exact path="/forgot-password" component={ForgotPasswordPage} />
                            <Route exact path="/user/channel/:username" component={UserChannelPage} />
                            <PrivateRoute exact path="/user/profile" component={UserProfilePage} />
                            <Route exact path="/user/verify/:token" component={UserVerifyPage} />
                        </Switch>
                    </Suspense>
                </div>
            </ConnectedRouter>
        </Provider>
    )
}

export default Routes;

