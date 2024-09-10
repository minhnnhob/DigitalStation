import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";

export default function RootLayout() {
  return (
    <div className="root-layout">
      {" "}
      <NavBar />
      <div className="pages">
        <Outlet />
      </div>
    </div>
  );
}
