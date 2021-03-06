import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import store, { persistor } from "./store";
import Login from "./components/login.component";
import Register from "./components/signup.component";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import ProtectedRoute from "./routes/ProtectedRoute";
import Product from './components/product';
import Navigation from './components/Navigation';

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <div className="App container-product">
            <Router>
              <Switch>
                <ProtectedRoute path="/product" component={Product} />
                <React.Fragment>
                    <Navigation />
                    <Route exact path='/' component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login} />
                  </React.Fragment>
              </Switch>
            </Router>
          </div>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
