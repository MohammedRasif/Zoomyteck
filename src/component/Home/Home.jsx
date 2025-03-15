import Navbar from "../Navbar/Navbar";
import Banner from "../Pages/Banner";
import Featured from "../Pages/Featured";
import Streamlined from "../Pages/Streamlined";
import Testimonial from "../Pages/Testimonial";

const Home = () => {
    return (
        <div>
           <Navbar></Navbar>
           <Banner></Banner>
           <Featured></Featured>
           <Streamlined></Streamlined>
           <Testimonial></Testimonial>
        </div>
    );
}

export default Home;
