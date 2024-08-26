import { useSelector } from "react-redux";

const AuthorizedPages = ({ children }) => {
  // const { loggedIn } = useSelector((state) => state.user);

  // Check if 'token' exists in cookies
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");

  if ( token) {
    return children;
  }

  return (
    <div>
      <h1> You are not authorized to view this page</h1>
    </div>
  );
};

export default AuthorizedPages;
