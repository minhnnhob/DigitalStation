import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";

export default function RootLayout() {
  return (
    <div className="root-layout">
      <NavBar />

      <div className="flex justify-center min-w-sm w-full px-10 mx-auto">
        <Outlet />
      </div>
    </div>
  );
}
