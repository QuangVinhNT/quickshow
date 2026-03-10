import { useState } from "react";
import { AppContext } from "./AppContext";
import axios from "axios";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AppProvider = ({ children }) => {
	const [isAdmin, setIsAdmin] = useState(false);
	const [shows, setShows] = useState([]);
	const [favouriteMovies, setFavouriteMovies] = useState([]);
	const { user } = useUser();
	const { getToken } = useAuth();
	const location = useLocation();
	const navigate = useNavigate();

	const fetchIsAdmin = async () => {
		try {
			const { data } = await axios.get("/api/admin/is-admin", {
				headers: { Authorization: `Bearer ${await getToken()}` },
			});
			setIsAdmin(data.isAdmin);
			if (!data.isAdmin && location.pathname.startsWith("/admin")) {
				navigate("/");
				toast.error("You are not authorized to access admin dashboard");
			}
		} catch (error) {
			console.error(error);
		}
	};

	const fetchFavouriteMovies = async () => {
		try {
			const { data } = await axios.get("/api/user/favourites", {
				headers: {
					Authorization: `Bearer ${await getToken()}`,
				},
			});
			if (data.success) {
				setFavouriteMovies(data.movies);
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const fetchShows = async () => {
		try {
			const { data } = await axios.get("/api/show/all");
			if (data.success) {
				setShows(data.shows);
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		if (user) {
			const loadData = async () => {
				await fetchIsAdmin();
				await fetchFavouriteMovies();
			};
			loadData();
		}
	}, [user]);

	useEffect(() => {
		const loadShows = async () => {
			await fetchShows();
		};
		loadShows();
	}, []);
	const value = {
		axios,
		user,
		getToken,
		navigate,
		isAdmin,
		shows,
		favouriteMovies,
    fetchIsAdmin,
    fetchFavouriteMovies
	};
	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
