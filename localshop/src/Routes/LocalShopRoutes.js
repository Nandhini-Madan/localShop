import { Routes,Route } from "react-router-dom";
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import Products from "../components/Products";
import AdminPage from "../components/AdminPage";
import AddProduct from "../components/AddProduct";
import EditPage from "../components/EditPage";
import Homepage from "../components/HomePage";
import Footer from "../components/Footer";
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
                <Route path="/footer" element={<Footer/>}/>
                <Route  path="/" element={<Homepage/>}/>
            </Routes>
            </>
    )
}
export default LocalShopRoutes;