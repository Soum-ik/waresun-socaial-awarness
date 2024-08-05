import Cookies from "js-cookie";
import DeshboardComponentsTabs from "../Deshboard/Components/tabs/DeshboardComponentsTabs";
import AdminLogin from "../Deshboard/Components/AdminLogin";

function Deshboard() {
    const token = Cookies.get("adminToken");

    return (token ?
        <DeshboardComponentsTabs />
        : <AdminLogin />);

}

export default Deshboard;
