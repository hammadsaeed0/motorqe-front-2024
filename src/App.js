import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import Register from "./screens/auth/register";
import ContactUs from "./screens/contactUs";
import { Dealar } from "./screens/auth/register/Dealar";
import Home from "./screens/home";
import ChoosePlane from "./screens/ChoosePlane";
import NewLists from "./screens/newLists";
import CarDetails from "./screens/carDetails";
import CarPhotos from "./screens/carPhotos";
import ContactDetails from "./screens/contactDetails";
import CarInspection from "./screens/carInspection";
// import GarageBookingConfirmation from "./screens/garageBookingConfirmation";
import CarDetailPage from "./screens/carDetailPage";
import MyAccount from "./screens/Dashboard/Pages/MyAccount/MyAccount";
import MyGarage from "./screens/Dashboard/Pages/MyGarage/MyGarage";
import FavouritCars from "./screens/Dashboard/Pages/FavouritCars/FavouritCars";
import Inbox from "./screens/Dashboard/Pages/Chat/index";
import News from "./screens/news";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./routes/PrivateRoute";
import { AnimatePresence } from "framer-motion";
import PublicRoute from "./routes/PublicRoute";
import { useEffect, useState } from "react";
import ForgottenEmail from "./screens/auth/Forgotten/ForgottenEmail";
import ForgottenPassword from "./screens/auth/Forgotten/ForgottenPassword";
import GarageDetailsUpload from "./screens/GarageDashboard/Pages/garageDetailsUpload";
import GarageBookingConfirmation from "./screens/GarageDashboard/Pages/garageBookingConfirmation";
import GaragePageWhite from "./screens/GarageDashboard/Pages/GaragePageWhite";
import ListingBookingConfirmation from "./screens/listingConfirmation";
import UpgradePlan from "./screens/upgradePlan";
import MyGarageAccount from "./screens/GarageDashboard/Pages/MyAccount/MyAccount";
import MyWorkshopServices from "./screens/GarageDashboard/Pages/myWorkshopServices";
import GarageBooking from "./screens/GarageDashboard/Pages/GarageRequests";
import SellerGarageBooking from "./screens/Dashboard/Pages/GarageBooking/GarageBooking";
import SingleGarageDetails from "./screens/GarageDashboard/Pages/singleGarageDetails";
import GarageDateTime from "./screens/GarageDashboard/Pages/garageBooking/GarageDateTime";
import GarageConfirm from "./screens/GarageDashboard/Pages/garageBooking/BookingConfirm";
import UpdateCarDetails from "./screens/Dashboard/Pages/UpdateCarDetails";
import FeaturedPlan from "./screens/FeaturesPlan";
import FeaturedConfirmation from "./screens/FeaturesPlan/Confirmation";
import GaragePrivateRoute from "./routes/GaragePrivateRoute";
import GaragePublicRoute from "./routes/GaragePublicRoute";
import CompareCar from "./screens/compareCars";
import DetailsNews from "./screens/news/DetailsNews";
import ImportantCars from "./screens/Dashboard/ImportantCars";
import SplashScreen from "./components/SplashScreen";
function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const serviceProviderId = localStorage.getItem("serviceProvider");
  const Navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(true);
  const handleSplashEnd = () => setShowSplash(false);
  return (
    <div>
    
        <>
          <ToastContainer />

          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route
                path="/choose_plane"
                element={
                  // <PublicRoute>
                  <ChoosePlane />
                  // </PublicRoute>
                }
              />
              <Route path="/register" element={<Register />} />
              <Route
                path="/forgotten_email"
                element={
                  // <PublicRoute>
                  <ForgottenEmail />
                  // </PublicRoute>
                }
              />
              <Route
                path="/forgotten_password"
                element={<ForgottenPassword />}
              />
              <Route
                path="/ListingBookingConfirmation"
                element={<ListingBookingConfirmation />}
              />

              <Route path="/new_lists" element={<NewLists />} />
              <Route path="/car_details_page/:id" element={<CarDetailPage />} />
              <Route element={<PrivateRoute />}>
                <Route path="/important-cars" element={<ImportantCars />} />
                <Route path="/car_photos" element={<CarPhotos />} />
                <Route path="/contact_details" element={<ContactDetails />} />
                <Route path="/car_inspection" element={<CarInspection />} />

                <Route path="/featured-plan/:id" element={<FeaturedPlan />} />
                <Route
                  path="/FeaturedConfirmation"
                  element={<FeaturedConfirmation />}
                />

                {/* seller Dashboard */}

                <Route path="/dashboard/my-account" element={<MyAccount />} />
                <Route
                  path="/dashboard/upgrade-plan/:id"
                  element={<UpgradePlan />}
                />
                <Route path="/dashboard/my-garage" element={<MyGarage />} />
                <Route
                  path="/dashboard/favourite-cars"
                  element={<FavouritCars />}
                />
                <Route
                  path="/dashboard/garage-bookings"
                  element={<SellerGarageBooking />}
                ></Route>
                <Route path="/dashboard/my-inbox" element={<Inbox />} />
              </Route>
              <Route path="/car_details" element={<CarDetails />} />
              <Route
                path="/update_car_detail/:id"
                element={<UpdateCarDetails />}
              />

              {/* /garage-dashboard */}

              {/* Private routes */}
              <Route
                path="/garage/garage-details/:id"
                element={<SingleGarageDetails />}
              />
              <Route
                path="/garage/garage-date-time/:id"
                element={<GarageDateTime />}
              />
              <Route
                path="/garage/garage-confirm/:id"
                element={<GarageConfirm />}
              />
              <Route
                path="/garage-dashboard/garagePageWhite"
                element={<GaragePageWhite />}
              />
              <Route element={<GaragePrivateRoute />}>
                <Route
                  path="/garage-dashboard/dashboard/my-inbox"
                  element={<Inbox />}
                />

                <Route
                  path="/garage_booking_confirmation/:id"
                  element={<GarageBookingConfirmation />}
                />

                <Route
                  path="/garage-dashboard/GarageDetails-upload"
                  element={<GarageDetailsUpload />}
                />
                <Route
                  path="/garage/dashboard/garage-bookings"
                  element={<GarageBooking />}
                />
                <Route
                  path="/garage/dashboard/my-account"
                  element={<MyGarageAccount />}
                />
              </Route>

              {/* Public route for workshop services */}
              <Route
                path="/garage/dashboard/workshop-services"
                element={<MyWorkshopServices />}
              />

              {/* Redirect all other routes if serviceProviderId does not exist
<Route
  path="*"
  element={
    serviceProviderId ? (
      <Navigate to="/garage/dashboard/workshop-services" />
    ) : (
      <Navigate to="/register" />
    )
  }
/> */}

              <Route path="/contactus" element={<ContactUs />} />

              <Route path="/compare-car" element={<CompareCar />} />
              <Route path="/dealar" element={<Dealar />} />
              <Route path="/news" element={<News />} />
              <Route path="/new-details/:id" element={<DetailsNews />} />
            </Routes>
          </AnimatePresence>
        </>
      
    </div>
  );
}

export default App;
