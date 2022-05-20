import "./App.css";
import React, { useState, createContext, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import theme from "./theme";
import Home from "../src/containers/Home";
import Landing from "./containers/landing";
import SignIn from "./containers/signin";
import SignUp from "./containers/signup";
import UpdatePassword from "./containers/updatePassword";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import OptionsContext from "./context/optionsContext";

export const DropDownOptionsContext = createContext();
export const ModalContext = createContext();

class DebugRouter extends Router {
  constructor(props) {
    super(props);
    console.log("initial history is: ", JSON.stringify(this.history, null, 2));
    this.history.listen((location, action) => {
      console.log(
        `The current URL is ${location.pathname}${location.search}${location.hash}`
      );
      console.log(
        `The last navigation action was ${action}`,
        JSON.stringify(this.history, null, 2)
      );
    });
  }
}

function App() {
  // let history = useHistory();
  // let location = useLocation();
  const [visible, setVisible] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const tkn = localStorage.getItem("fincta_token");
    setToken(tkn);
    console.log(tkn);
    // this.backListener = history.listen(location => {
    //   if (location.action === "POP") {
    //     // Do your stuff
    //   }
    // });
  }, []);

  const asyncLocalStorage = {
    setItem: function (key, value) {
      return Promise.resolve().then(function () {
        localStorage.setItem(key, value);
      });
    },
    getItem: function (key) {
      return Promise.resolve().then(function () {
        return localStorage.getItem(key);
      });
    },
  };

  return (
    <OptionsContext>
      <ModalContext.Provider value={{ visible, setVisible }}>
        <ThemeProvider theme={theme}>
          <DebugRouter>
            <Switch>
              {token ? (
                <>
                  {/* <Route exact path="/landing" component={Landing} />  */}
                  <Route exact path="/dashboard" component={Landing} />
                  <Route exact path="/performance" component={Landing} />
                  {/* financialStatements */}
                  <Route
                    exact
                    path="/financialStatements"
                    component={Landing}
                  />
                  <Route
                    exact
                    path="/financialStatements/incomeStatement"
                    component={Landing}
                  />
                  <Route
                    exact
                    path="/financialStatements/balanceSheet"
                    component={Landing}
                  />
                  <Route
                    exact
                    path="/financialStatements/cashFlowStatement"
                    component={Landing}
                  />
                  {/* transactions */}
                  <Route exact path="/transactions" component={Landing} />
                  <Route
                    exact
                    path="/transactions/income"
                    component={Landing}
                  />
                  <Route
                    exact
                    path="/transactions/expense"
                    component={Landing}
                  />
                  <Route exact path="/transactions/asset" component={Landing} />
                  {/* ------------------------------- */}
                  <Route
                    exact
                    path="/transactions/asset/inventory"
                    component={Landing}
                  />
                  <Route
                    exact
                    path="/transactions/asset/inventory/inventoryTransaction"
                    component={Landing}
                  />
                  {/* ------------------------------- */}
                  <Route
                    exact
                    path="/transactions/asset/fixedAssets"
                    component={Landing}
                  />
                  <Route
                    exact
                    path="/transactions/asset/fixedAssets/assetTransaction"
                    component={Landing}
                  />
                  {/* ------------------------------- */}
                  <Route
                    exact
                    path="/transactions/asset/receivable"
                    component={Landing}
                  />
                  {/* ------------------------------- */}
                  <Route
                    exact
                    path="/transactions/liability"
                    component={Landing}
                  />
                  <Route
                    exact
                    path="/transactions/liability/payable"
                    component={Landing}
                  />
                  {/* ------------------------------- */}
                  <Route
                    exact
                    path="/transactions/liability/loan"
                    component={Landing}
                  />
                  <Route
                    exact
                    path="/transactions/liability/loan/loanInstallments"
                    component={Landing}
                  />
                  {/* ---------------------- */}
                  <Route exact path="/calculators" component={Landing} />
                  <Route exact path="/feedback" component={Landing} />
                  {/* <Redirect exact from="*" to="/dashboard" /> */}
                </>
              ) : (
                <>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/whyfincta" component={Home} />
                  <Route exact path="/products" component={Home} />
                  <Route exact path="/pricing" component={Home} />
                  <Route exact path="/resources" component={Home} />
                  <Route exact path="/contactus" component={Home} />

                  <Route exact path="/signin" component={SignIn} />
                  <Route exact path="/signup" component={SignUp} />
                  <Route
                    exact
                    path="/updatepassword"
                    component={UpdatePassword}
                  />

                  {/* <Route component={Home} /> */}

                  {/* <Redirect from="*" to="/" /> */}
                </>
              )}
            </Switch>
          </DebugRouter>
        </ThemeProvider>
      </ModalContext.Provider>
    </OptionsContext>
  );
}

export default App;
