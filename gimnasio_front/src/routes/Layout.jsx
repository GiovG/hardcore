import { Outlet } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import Navbar from "../components/Layout/Navbar";
import FooterBar  from "../components/Layout/Footer";

export default function Layout() {
    return (<>
        <AuthProvider>
            <div
                className={`hero is-fullheight is-flex is-flex-direction-column`}
            >
                    <Navbar />
                    <Outlet />
            </div>
        </AuthProvider>
        <div className="footer">
                <FooterBar appName={"AverageJoe"}/>
            </div></>
    );
}