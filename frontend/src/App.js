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

import DetailJob from "./pages/JobDetail";
import AdminLayout from "./layouts/AdminLayout";
import DetailStudio from "./components/studio/DetailStudio";
import JobApplication from "./pages/JobApplication";
import Collections from "./pages/Collections";
import { ManageJobLayout } from "./layouts/ManageJobLayout";
import Recuitment from "./pages/Recuitment";
import { StudioLayout } from "./layouts/StudioLayout";
import DetailUserApplication from "./pages/DetailUserApplication";
import JobPosting from "./pages/JobPosting";
import OwnerJob from "./pages/OwnerJob";
import UpdateOwnerJob from "./pages/UpdateOwnerJob";
import RecruimentByJob from "./pages/RecruimentByJob";
import JobFreelace from "./pages/JobFreelace";
import RecruitmentDetail from "./pages/RecruitmentDetail";

import ArtworkForm from "./components/artwork/ArtworkForm";

import AdminTopic from "./components/topic/AdminTopic";
import Portfolios from "./pages/Portfolios";

function App() {
  useEffect(() => {
    store.dispatch(fetchCurrentUser());
    // eslint-disable-next-line
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<RootLayout />}>
          {/* Explore */}
          <Route index element={<Explore />} />
          {/* Job Route */}
          <Route path="job" element={<JobBoardLayout />}>
            <Route index element={<JobBoard />} />
            <Route path="job-listings" element={<JobBoard />} />
            <Route path="studios" element={<StudiosListing />} />
            <Route path="saved-jobs" element={<SavedJobsListing />} />
            <Route path="job-freelance" element={<JobFreelace />} />
          </Route>
          <Route path="/job/:jobId" element={<DetailJob />} />

          <Route path="job_manage" element={<ManageJobLayout />}>
            <Route index element={<JobApplication />} />
            <Route path="recuitment/*" element={<Recuitment />}></Route>
            <Route path=":recuitmentId" element={<DetailUserApplication />} />

            <Route path="job-application" element={<JobApplication />} />
            <Route path="job_posting/*" element={<OwnerJob />}></Route>
            <Route path="job_posting/:jobId" element={<UpdateOwnerJob />} />
            <Route path="job_posting/new" element={<JobPosting />} />
            <Route
              path="job_posting/recruitment/:jobId"
              element={<RecruimentByJob />}
            />
          </Route>

          <Route
            path="job_manage/applicant/:applicantId"
            element={<RecruitmentDetail />}
          />

          <Route path="/artwork/:artworkId" element={<ArtworkDetail />} />
          <Route path="project/new" element={<UploadArtwork />} />
          <Route path ="edit-artwork/:artworkId" element={<ArtworkForm />} />

          {/* Account */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="portfolio" element={<PortfolioPage />} />
          <Route path="collections" element={<Collections />} />
          <Route path="portfolio/:id" element={<Portfolios />} />

          <Route path="profile" element={<ProfileLayout />}>
            <Route index element={<ProfileForm />} />
          </Route>

          <Route path="studio/:id" element={<DetailStudio />} />

          {/* Studio Route */}

          <Route path="studio" element={<StudioLayout />} />

        

          <Route path="*" element={<div>Not Found</div>} />
        </Route>

          {/* Admin Route */}

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<div>Dashboard</div>} />
            <Route path="dashboard" element={<AdminTopic/>} />
            <Route path="manage-users" element={<div>Users</div>} />
            <Route path="manage-topics" element={<AdminTopic/>} />
          </Route>

      </>
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
