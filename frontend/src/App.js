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
import JobBoardLayout from "./layouts/JobBoardLayout";
import StudiosListing from "./pages/Studios";
import SavedJobsListing from "./pages/SaveJob";
import JobPreferences from "./pages/JobPreferences";
import DetailJob from "./pages/JobDetail";
import AdminLayout from "./layouts/AdminLayout";
import DetailStudio from "./components/studio/DetailStudio";



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
        <Route path="job" element={<JobBoardLayout/>}>
          <Route index element={<JobBoard />} />
          <Route path="job-listings" element={<JobBoard />} />
          <Route path="studios" element={< StudiosListing/>} />
          <Route path="saved-jobs" element={<SavedJobsListing />} />
          <Route path="job-preferences" element={<JobPreferences />} />
          
        </Route>
        <Route path="/job/:jobId" element={<DetailJob />} />

        <Route path="/artwork/:artworkId" element={<ArtworkDetail />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path= "portfolio" element={<PortfolioPage/>}/>
       
        <Route path="edit-profile" element={<ProfileLayout />}>
          <Route index element={<ProfileForm />} />
        </Route>
        <Route path="project/new" element={<UploadArtwork/>} />

        <Route path="studio/:id" element={<DetailStudio />} />

      {/* Admin Route */}

      <Route path="admin" element={<AdminLayout/>} >
        <Route index element={<div>Users</div>} />
        <Route path="dashboard" element={<div>Jobs</div>} />
        <Route path="manage-users" element={<div>Jobs</div>} />
        <Route path="manage-topics" element={<div>Toic</div>} />
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
