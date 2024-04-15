import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
    const { userInfo } = useSelector((store) => store.auth);

    return userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
};
export default AdminRoute;
