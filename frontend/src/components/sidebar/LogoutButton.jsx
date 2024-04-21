import axios from "axios";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const LogoutButton = () => {
    // const { loading, logout } = useLogout();
    const navigate = useNavigate()
    const { setAuthUser } = useAuthContext();
    const handleSubmit = async () => {
        try {
            const data = await axios.post("api/auth/logout")
            if (data) {
                localStorage.removeItem("chat-user");
                setAuthUser(null)
                alert("Log-Out Successfully")
                navigate('/login')
            } else {
                alert("server error -- failed to logout")
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='mt-auto flex items-center cursor-pointer' onClick={handleSubmit}>
            <BiLogOut className='w-6 h-6 text-white mr-2' />
            <span className='text-white'>Logout</span>
        </div>
    );
};
export default LogoutButton;