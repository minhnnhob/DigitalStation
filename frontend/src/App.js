import { BrowserRouter, Routes, Route } from "react-router-dom";
// pages & components
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import { Provider } from "react-redux";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

// redux
import store from "./store/index";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
      <BrowserRouter>
        <NavBar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>  <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>  <Routes>
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
