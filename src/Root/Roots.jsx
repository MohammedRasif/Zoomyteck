import { Outlet } from "react-router-dom";


const Roots = () => {
    return (
        <div>
            {/* <Navbar/> */}
            <Outlet/>
            {/* <Footer/> */}
        </div>
    );
}

export default Roots;
