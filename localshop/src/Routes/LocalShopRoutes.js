import { Routes,Route } from "react-router-dom";
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import Products from "../components/Products";
import AdminPage from "../components/AdminPage";
const LocalShopRoutes = () => {
    return (
            <>
            <Routes>
                <Route path="/login" element={<Login />}/>
                <Route path="/signup" element={<SignUp />}/>
                <Route path="/products" element={<Products/>}/>
                <Route path="/adminPage" element={<AdminPage />}/>

            </Routes>
            </>
    )
}
export default LocalShopRoutes;