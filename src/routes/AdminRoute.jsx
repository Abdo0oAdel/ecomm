import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function AdminRoute({ children, allowedRoles = ["admin"] }) {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const user = useSelector((state) => state.auth.user);
	const location = useLocation();

	const roleClaimKey = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
	const userRole = user?.[roleClaimKey] || user?.role;

	if (!isAuthenticated) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	// Check if user's role is in the allowed roles
	const hasAccess = allowedRoles.some(role => 
		userRole?.toLowerCase() === role.toLowerCase()
	);

	if (!hasAccess) {
		// If user is a seller but trying to access admin-only route, redirect to product management
		if (userRole?.toLowerCase() === "seller") {
			return <Navigate to="/admin/ProductManagement" replace />;
		}
		return <Navigate to="/" replace />;
	}

	return children;
}
