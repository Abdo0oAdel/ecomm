import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function AdminRoute({ children }) {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const user = useSelector((state) => state.auth.user);
	const location = useLocation();

	const adminClaimKey = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
	const isAdmin = user && (user[adminClaimKey] === "admin" || user.role === "admin" || user.isAdmin === true);

	if (!isAuthenticated) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	if (!isAdmin) {
		return <Navigate to="/" replace />;
	}

	return children;
}
