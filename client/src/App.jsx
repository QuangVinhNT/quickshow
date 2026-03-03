import { Route, Routes, useLocation } from "react-router-dom";
import { Footer, NavBar } from "./components";
import {
	AddShows,
	Dashboard,
	Favourite,
	Home,
	Layout,
	ListBookings,
	ListShows,
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
				<Route path="/admin/*" element={<Layout/>}>
					<Route index element={<Dashboard />}/>
					<Route path="add-shows" element={<AddShows />}/>
					<Route path="list-shows" element={<ListShows />}/>
					<Route path="list-bookings" element={<ListBookings />}/>
				</Route>
			</Routes>
			{!isAdminRoute && <Footer />}
		</>
	);
};

export default App;
