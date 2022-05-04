import React, { useEffect } from "react";
import "./App.css";
import { loadUser } from "./actions/user";
import { useDispatch } from "react-redux";

//Token Settings
import { getUserToken, storeUserToken } from "./utils/Token";

//Components
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import OTPBar from "./component/OTPBar";

//Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashBoard from "./pages/DashBoard";
import ArticleRead from "./pages/ArticleRead";
import Settings from "./pages/Settings";
import MyArticles from "./pages/MyArticles";
import CreateArticle from "./pages/CreateArticle";
import EditArticle from "./pages/EditArticle";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";

//Routing
import PrivateRoute from "./routing/PrivateRoute";
import { Route, Switch } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

if (getUserToken()) {
  storeUserToken(getUserToken());
}
//configure toasts
toast.configure();

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());

    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <Navbar />
      <OTPBar />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route
          exact
          path="/reset-password/:token/:otp"
          element={<ResetPassword />}
        />

        <PrivateRoute exact path="/dashboard" element={<DashBoard />} />
        <PrivateRoute exact path="/article/:id" element={<ArticleRead />} />
        <PrivateRoute exact path="/settings" element={<Settings />} />
        <PrivateRoute exact path="/myarticles" element={<MyArticles />} />
        <PrivateRoute exact path="/create" element={<CreateArticle />} />
        <PrivateRoute exact path="/edit/:id" element={<EditArticle />} />
        <Route element={<NotFound />} />
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
