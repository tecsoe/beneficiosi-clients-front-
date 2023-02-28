import Navbar from "./Navbar";
import Footer from "./Footers";

const AppLayout = ({ children }) => {
  return <div className="min-h-screen bg-gray-50 text-sm text-gray-900 open-sans">
    <Navbar />

    {children}

    {/* FOOTER */}
    <Footer />
  </div>;
};

export default AppLayout;