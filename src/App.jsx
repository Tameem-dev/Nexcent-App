import "./App.css";
import Insight from "./component/Insights/insight";
import Navbar from "./component/Navbar/navbar";
import Client from "./component/Client/client";
import Community from "./component/Community/community";
import Unseen from "./component/Unseen/unseen";
import Helping from "./component/Helping/helping";
import Design from "./component/Design/design";
import Testimonial from "./component/Testimonial/testimonial";
import Marketing from "./component/Marketing/marketing";
import Footer from "./component/Footer/footer";

function App() {
  return (
    <>
      <Navbar />
      <Insight />
      <Client />
      <Community />
      <Unseen />
      <Helping />
      <Design />
      <Testimonial />
      <Marketing />
      <Footer />
    </>
  );
}

export default App;
