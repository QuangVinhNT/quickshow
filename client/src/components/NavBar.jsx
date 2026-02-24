import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { MenuIcon, SearchIcon, TicketPlus, XIcon } from "lucide-react";
import { useState } from "react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const NavBar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { user } = useUser();
	const { openSignIn } = useClerk();
	const navigate = useNavigate();
	return (
		<div className="fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5">
			<Link
				className="max-md:flex-1"
				to={"/"}
			>
				<img
					src={assets.logo}
					alt=""
					className="w-36 h-auto"
				/>
			</Link>
			<div
				className={`absolute top-0 left-0 font-medium text-lg justify-center h-screen md:h-auto z-50 flex flex-col items-center gap-8 py-3 bg-black/70 backdrop-blur overflow-hidden transition-[width] duration-300 md:static md:flex-row md:px-8 md:rounded-full md:bg-white/10 md:border border-gray-300/20 ${isOpen ? "max-md:w-full" : "max-md:w-0"}`}
			>
				<XIcon
					className="md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer"
					onClick={() => setIsOpen(!isOpen)}
				/>
				<Link
					to={"/"}
					onClick={() => {
						scrollTo(0, 0);
						setIsOpen(false);
					}}
				>
					Home
				</Link>
				<Link
					to={"/movies"}
					onClick={() => {
						scrollTo(0, 0);
						setIsOpen(false);
					}}
				>
					Movies
				</Link>
				<Link
					to={"/"}
					onClick={() => {
						scrollTo(0, 0);
						setIsOpen(false);
					}}
				>
					Threaters
				</Link>
				<Link
					to={"/"}
					onClick={() => {
						scrollTo(0, 0);
						setIsOpen(false);
					}}
				>
					Releases
				</Link>
				<Link
					to={"/favourite"}
					onClick={() => {
						scrollTo(0, 0);
						setIsOpen(false);
					}}
				>
					Favourites
				</Link>
			</div>
			<div className="flex items-center gap-8">
				<SearchIcon className="max-md:hidden w-6 h-6 cursor-pointer" />
				{!user ? (
					<button
						onClick={openSignIn}
						className="px-4 py-1 sm:px-7 sm:py-2 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer"
					>
						Login
					</button>
				) : (
					<UserButton>
						<UserButton.MenuItems>
							<UserButton.Action
								label="My Bookings"
								labelIcon={<TicketPlus width={15} />}
								onClick={() => navigate("/my-bookings")}
							/>
						</UserButton.MenuItems>
					</UserButton>
				)}
			</div>
			<MenuIcon
				className="md:hidden ml-4 w-8 h-8 cursor-pointer"
				onClick={() => setIsOpen(!isOpen)}
			/>
		</div>
	);
};

export default NavBar;
