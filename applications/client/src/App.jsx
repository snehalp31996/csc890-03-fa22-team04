import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarComp from "./components/Navbar";
import Home from "./containers/home/Home";
import About from "./containers/about/About";
import Login from "./containers/account/Login";
import Register from "./containers/account/Register";
import AboutSnehal from "./containers/about/AboutSnehal";
import AboutManali from "./containers/about/AboutManali";
import CodeToText from "./containers/codeToText/CodeToText";
import TextToCode from "./containers/textToCode/TextToCode";
import CodeToCode from "./containers/codeToCode/CodeToCode";
import Feedback from "./containers/feedback/Feedback";
import ErrorPage from "./containers/errorPage/ErrorPage";
import Logout from "./containers/account/Logout";
import { createContext } from "react";
import { useReducer } from "react";
import { initialState, reducer } from "../src/reducer/UseReducer";
export const UserContext = createContext();
const Routing = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />}></Route>
      <Route exact path="/about" element={<About />}></Route>
      <Route exact path="/aboutSnehal" element={<AboutSnehal />}></Route>
      <Route exact path="/aboutManali" element={<AboutManali />}></Route>
      <Route exact path="/codeToText" element={<CodeToText />}></Route>
      <Route exact path="/textToCode" element={<TextToCode />}></Route>
      <Route exact path="/codeToCode" element={<CodeToCode />}></Route>
      <Route exact path="/feedback" element={<Feedback />}></Route>
      <Route exact path="/login" element={<Login />}></Route>
      <Route exact path="/register" element={<Register />}></Route>
      <Route exact path="/logout" element={<Logout />}></Route>
      <Route path="*" element={<ErrorPage />}></Route>
    </Routes>
  )
}
const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState);
  return (

    <Router>
      <UserContext.Provider value={{ state, dispatch }}>
        <NavbarComp />
        <Routing />
      </UserContext.Provider>
    </Router>

  );
}

export default App;
