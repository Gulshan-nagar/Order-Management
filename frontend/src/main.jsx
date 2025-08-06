import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";

import StoreContextProvider from "./context/StoreContext.jsx"; 
createRoot(document.getElementById("root")).render(
  
    <StoreContextProvider>
      <App/>
      <ToastContainer />

    </StoreContextProvider>
 
);
