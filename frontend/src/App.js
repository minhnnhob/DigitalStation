import { BrowserRouter, Routes, Route } from "react-router-dom";
// pages & components
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import NavBar from "./components/NavBar/NavBar";
import { Provider, useSelector } from "react-redux";

import Register from "./pages/Register";
import Login from "./pages/Login";
import { useEffect } from "react";

// redux
import store from "./store/index";
import { fetchCurrentUser, fetchUserInfo } from "./store/slices/userSlice";
import NotFound from "./components/notFound/NotFound";

function App() {
  useEffect(() => {
    store.dispatch(fetchCurrentUser());

    // eslint-disable-next-line
  }, []);

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
              <Route path="/profile" element={<Profile />} />
                <Route path="/profile/resume" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
