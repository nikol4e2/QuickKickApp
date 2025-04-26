import AdminNav from "../AdminPanel/components/navBar/AdminNav";
import {Outlet} from "react-router-dom";


const AdminLayout = () =>{
    return (
        <div className="admin-layout">
            <AdminNav />
            <main>
                <Outlet />.
            </main>
        </div>
    )
}

export default AdminLayout;