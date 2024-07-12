import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// import Test from "./pages/img-upload";
const App = () => {
  return (
    <>
      <ToastContainer />
      <Outlet />
      {/* <Test /> */}
    </>
  );
};

export default App;
