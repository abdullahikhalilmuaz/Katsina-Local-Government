import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import LandingPage from "./pages/LandingPage";
import PrimaryHome from "./pages/PrimaryHome";
import PrimaryRegister from "./pages/PrimaryRegister";
import SecondaryHome from "./pages/SecondaryHome";
import SecondaryRegister from "./pages/SecondaryRegister";
import "./App.css";
import Notfoundpage from "./pages/Notfoundpage";
import ViewStaff from "./pages/ViewStaff";

export default function App() {
  const [openState, setOpenState] = useState(false);
  const [views, setViews] = useState(false);

  return (
    <>
      <BrowserRouter>
        {!views && <Header setOpenState={setOpenState} openState={openState} />}
        <Routes>
          {/* Not found route */}
          <Route path="*" element={<Notfoundpage />} />

          {/* there will be a landing page for both the admin and user, they can both choose to login or signup form there... */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/landing-page" element={<LandingPage />} />

          {/* if localstorage, / will be home, else will be landing page. and they will be two homw, admin home as primary and user as secondary home */}

          {/* ADMIN part, home below */}
          <Route path="/primary-home" element={<PrimaryHome />} />
          {/* primary || admin register */}
          <Route path="/primary-register" element={<PrimaryRegister />} />

          {/* USER part, home below */}
          <Route path="/secondary-home" element={<SecondaryHome />} />
          {/* secondary || user register */}
          <Route path="/secondary-register" element={<SecondaryRegister />} />

          <Route
            path="/view-staff"
            element={<ViewStaff setViews={setViews} />}
          />
        </Routes>
        {console.log(views)}
      </BrowserRouter>
    </>
  );
}
