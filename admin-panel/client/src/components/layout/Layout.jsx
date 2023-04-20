import React, { useEffect } from "react";
import "./layout.css";
import Sidebar from "../sidebar/Sidebar";
import TopNav from "../topnav/TopNav";
import Routes from "../Routes";
import { BrowserRouter, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ThemeAction from "../../redux/actions/ThemeAction";
import appAction from "../../redux/actions/appAction";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";

const Layout = (props) => {
  const themeReducer = useSelector((state) => state.ThemeReducer);
  const appReducer = useSelector((state) => state.appReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    const themeClass = localStorage.getItem("themeMode", "theme-mode-light");

    const colorClass = localStorage.getItem("colorMode", "theme-mode-light");

    dispatch(ThemeAction.setMode(themeClass));

    dispatch(ThemeAction.setColor(colorClass));
    dispatch(appAction.getUsers()); // use directly action in redux
    props.getUsers(); // use redux action through prop
  }, []);

  return (
    <BrowserRouter>
      <Route
        render={(props) => (
          <div className={`layout ${themeReducer.mode} ${themeReducer.color}`}>
            <Sidebar {...props} />
            <div className="layout__content">
              <TopNav />
              <div className="layout__content-main">
                <Routes />
              </div>
            </div>
            <ToastContainer
              newestOnTop={false}
              rtl={false}
              pauseOnFocusLoss
              theme="light"
            />
          </div>
        )}
      />
    </BrowserRouter>
  );
};
const mapStateToProp = (state) => {
  return {
    data: state.users,
  };
};
const mapDispathToProp = (dispatch) => {
  return {
    getUsers: () => dispatch(appAction.getUsers()),
    addUser: (newUser) => dispatch(appAction.addUser(newUser)),
  };
};
export default connect(mapStateToProp, mapDispathToProp)(Layout);
