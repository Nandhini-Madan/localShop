import { Routes,Route } from "react-router-dom";
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import Products from "../components/Products";
import AdminPage from "../components/AdminPage";
import AddProduct from "../components/AddProduct";
import EditPage from "../components/EditPage";
const LocalShopRoutes = () => {
    return (
            <>
            <Routes>
                <Route path="/login" element={<Login />}/>
                <Route path="/signup" element={<SignUp />}/>
                <Route path="/products" element={<Products/>}/>
                <Route path="/adminPage" element={<AdminPage />}/>
                <Route path="/AddProduct" element={<AddProduct/>}/>
                <Route path="/editPage" element={<EditPage/>}/>

            </Routes>
            </>
    )
}
export default LocalShopRoutes;