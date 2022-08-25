import React from "react";
import Login from "./Login";
import { logoutUser } from "../fetchData/Auth";

const Wrapper = (props) => {
	const { handleUser, handleLoginOpen, loginOpen, user } = props;

	const handleLogout = async () => {
		const res = await logoutUser(user, handleUser);

		if (res.ok) handleUser(null);

		alert(res.message);
	};
	return (
		<div>
			{loginOpen && (
				<Login
					handleUser={handleUser}
					handleLoginOpen={handleLoginOpen}
				></Login>
			)}

			<div>
				{!user ? (
					<button
						key={1}
						className="ml-auto mt-2"
						onClick={() => handleLoginOpen(!loginOpen)}
					>
						Login
					</button>
				) : (
					<button
						key={1}
						className="ml-auto mt-2"
						onClick={() => handleLogout()}
					>
						Logout
					</button>
				)}
			</div>
			{props.children}
		</div>
	);
};

export default Wrapper;
