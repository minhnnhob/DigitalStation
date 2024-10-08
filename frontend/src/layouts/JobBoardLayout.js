import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import JobNavBar from "../components/NavBar/JobNavBar";

export default function JobBoardLayout() {
  return (
    <div className="container  justify-center min-w-full">
      <JobNavBar />
      <main className="main-content">
        <Outlet />
      </main>
      <Toaster
        position="top-left"
        autoClose={14}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition="Bounce"
      />
    </div>
  );
}
