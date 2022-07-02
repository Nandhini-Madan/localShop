import { Routes,Route } from "react-router-dom";
import Login from '../components/Login';
import SignUp from '../components/SignUp';
const LocalShopRoutes = () => {
    return (
            <>
            <Routes>
                <Route path="/login" element={<Login />}/>
                <Route path="/signup" element={<SignUp />}/>
                <Route path="/about" element={<Login />}/>
                <Route path="/login" element={<Login />}/>

            </Routes>
            </>
    )
}
export default LocalShopRoutes;