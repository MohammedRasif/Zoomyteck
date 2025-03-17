import Navbar from "../Navbar/Navbar";
import Banner from "../Pages/Banner";
import Featured from "../Pages/Featured";
import PaymentCart from "../Pages/PaymentCart";
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
           <PaymentCart></PaymentCart>
        </div>
    );
}

export default Home;
