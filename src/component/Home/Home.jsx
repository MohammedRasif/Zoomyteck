
import Banner from "../Pages/Banner";
import Featured from "../Pages/Featured";
import PaymentCart from "../Pages/PaymentCart";
import Proposals from "../Pages/Proposals";
import Streamlined from "../Pages/Streamlined";
import Testimonial from "../Pages/Testimonial";

const Home = () => {
    
    return (
        <div className="bg-gradient-to-r from-[#EAEFFB] via-[#F5F3E6] to-[#EAEFFB]">
           {/* <Navbar></Navbar> */}
           <Banner></Banner>
           <Featured></Featured>
           <Streamlined></Streamlined>
           <Testimonial></Testimonial>
           <PaymentCart></PaymentCart>
           <Proposals></Proposals>
           
        </div>
    );
}

export default Home;
