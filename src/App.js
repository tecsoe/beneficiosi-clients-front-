import AppLayout from './components/AppLayout';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import { useAuth } from './contexts/AuthContext';
import { useEffect, useState } from 'react';
import CustomAlert from "./components/CustomAlert";

const App = () => {

  const { customLoading, customAlert, setCustomAlert } = useAuth();

  const [dots, setDots] = useState("");

  useEffect(() => {

    let id;

    if (customLoading.show) {
      id = setInterval(() => {
        setDots((oldDots) => oldDots.length < 3 ? oldDots + "." : "");
      }, 500);
    }

    return () => {
      if (id) clearInterval(id);
    }
  }, [customLoading]);

  const handleClose = () => {
    setCustomAlert({ show: false, message: "", severity: null })
  }

  return (
    <Router>
      {
        customLoading.show ?
          <div className="w-full h-full bg-white flex bg-opacity-80 z-50 fixed">
            <div className="m-auto">
              <div className="spinner">
                <div className="double-bounce1 bg-main"></div>
                <div className="double-bounce2 bg-main"></div>
              </div>
              <div className="text-gray-700 text-2xl">{customLoading.message}{dots}</div>
            </div>

          </div>
          :
          null
      }

      <CustomAlert show={customAlert.show} message={customAlert.message} duration={5000} onClose={handleClose} severity={customAlert.severity} />

      <AppLayout>
        <Routes />
      </AppLayout>
    </Router>
  );
};

export default App;
