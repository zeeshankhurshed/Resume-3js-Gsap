import React, { Suspense } from "react";
import Loader from "./components/Loader";
import Layout from "./components/Layout";
import NotFound from "./components/NotFound";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
 import { ToastContainer } from 'react-toastify';


// const Home = React.lazy(() => import("./pages/Home"));
const Login = React.lazy(() => import("./pages/Login"));
const Signup = React.lazy(() => import("./pages/Signup"));
const AddVideo = React.lazy(() => import("./pages/AddVideo"));
const Videos = React.lazy(() => import("./pages/Videos"));

const App = () => {
  return (
    <>
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Layout Wrapper Route */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="addVideo" element={<AddVideo />} />
          <Route path="videos" element={<Videos />} />
          {/* Future routes */}
          {/* <Route path="dashboard" element={<Dashboard />} /> */}
          {/* <Route path="profile" element={<Profile />} /> */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
    <ToastContainer/>
    </>
  );
};

export default App;