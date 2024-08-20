import { BrowserRouter, Routes, Route } from "react-router-dom";
// pages & components
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import { Provider } from "react-redux";

import Register from "./pages/Register";
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
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          
          </div>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
