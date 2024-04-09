import { Navigate } from "react-router-dom";
import Home from "./Home";

const ProtectedRoute=()=>{








let token=localStorage.getItem('token');
if(!token){
    return <Navigate to="/login" />;
}
else {
   return <Home/>
}
}











export default ProtectedRoute