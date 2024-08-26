import { useSelector } from "react-redux";

const AuthorizedComponent = ({ children }) => {
    // const { loggedIn } = useSelector((state) => state.user);

    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");

    if (token) {
        return children;
    }

    return (
        <div>
            <h1> You are not authorized to view this component</h1>
        </div>
    );
};

export default AuthorizedComponent;
