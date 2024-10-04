import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";


import { Provider } from "react-redux";

import Register from "./pages/Register";
import Login from "./pages/Login";
import { useEffect } from "react";

// redux
import store from "./store/index";
import { fetchCurrentUser } from "./store/slices/userSlice";
import { fetchAllTopics } from "./store/slices/category/topicSlice";

//layouts
import RootLayout from "./layouts/RootLayout";
import ProfileLayout from "./layouts/ProfileLayout";
import ProfileForm from "./components/profile/editProfile";
import Notification from "./components/notification/Notification";
import Explore from "./pages/Explore";
// pages & components
import PortfolioPage from "./pages/Portfolio";
import ArtworkDetail from "./pages/DetailArtwork";
import UploadArtwork from "./pages/UploadArtwork";
import JobBoard from "./pages/Jobs";

function App() {
  useEffect(() => {
    store.dispatch(fetchCurrentUser());
    store.dispatch(fetchAllTopics());

    // eslint-disable-next-line
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Explore />} />
        <Route path="jobs" element={<JobBoard/>} />
        <Route path="/artwork/:artworkId" element={<ArtworkDetail />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path= "portfolio" element={<PortfolioPage/>}/>
       
        <Route path="edit-profile" element={<ProfileLayout />}>
          <Route index element={<ProfileForm />} />
        </Route>
        <Route path="project/new" element={<UploadArtwork/>} />
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
