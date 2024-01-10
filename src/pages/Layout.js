import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <nav>
                <h1 className="layout-title">eLibrary</h1>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                     <li>
                        <Link to="/search">Search</Link>
                    </li>
                     <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
            </nav>

            <Outlet />
        </>
    )
};

export default Layout;
