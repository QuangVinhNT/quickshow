import { Route, Routes, useLocation } from "react-router-dom";
import { Footer, NavBar } from "./components";
import {
	Favourite,
	Home,
	MovieDetails,
	Movies,
	MyBookings,
	SeatLayout,
} from "./pages";
import { Toaster } from "react-hot-toast";

const App = () => {
	const isAdminRoute = useLocation().pathname.startsWith("/admin");

	return (
		<>
			<Toaster />
			{!isAdminRoute && <NavBar />}
			<Routes>
				<Route
					path="/"
					element={<Home />}
				/>
				<Route
					path="/movies"
					element={<Movies />}
				/>
				<Route
					path="/movies/:id"
					element={<MovieDetails />}
				/>
				<Route
					path="/movies/:id/:date"
					element={<SeatLayout />}
				/>
				<Route
					path="/my-bookings"
					element={<MyBookings />}
				/>
				<Route
					path="/favourite"
					element={<Favourite />}
				/>
			</Routes>
			{!isAdminRoute && <Footer />}
		</>
	);
};

export default App;
