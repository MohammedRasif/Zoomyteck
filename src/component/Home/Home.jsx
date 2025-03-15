import Navbar from "../Navbar/Navbar";
import Banner from "../Pages/Banner";
import Featured from "../Pages/Featured";
import Streamlined from "../Pages/Streamlined";

const Home = () => {
    return (
        <div>
           <Navbar></Navbar>
           <Banner></Banner>
           <Featured></Featured>
           <Streamlined></Streamlined>
        </div>
    );
}

export default Home;
