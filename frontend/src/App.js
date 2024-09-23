import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
// pages & components


import { Provider } from "react-redux";

import Register from "./pages/Register";
import Login from "./pages/Login";
import { useEffect } from "react";

// redux
import store from "./store/index";
import { fetchCurrentUser } from "./store/slices/userSlice";

//layouts
import RootLayout from "./layouts/RootLayout";
import ProfileLayout from "./layouts/ProfileLayout";
import ProfileForm from "./components/profile/editProfile";
import Notification from "./components/notification/Notification";
import Explore from "./pages/Explore";
import PortfolioPage from "./pages/Portfolio";
import ArtworkDetail from "./pages/DetailArtwork";

function App() {
  useEffect(() => {
    store.dispatch(fetchCurrentUser());

    // eslint-disable-next-line
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Explore />} />
        <Route path="/artwork/:artworkId" element={<ArtworkDetail />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path= "portfolio" element={<PortfolioPage/>}/>
        <Route path="edit-profile" element={<ProfileLayout />}>
          <Route index element={<ProfileForm />} />
        </Route>
      </Route>
    )
  );

  return (
    <div className="App">
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
        <Notification />
      </Provider>
    </div>
  );
}

export default App;
