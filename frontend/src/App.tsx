import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import User from "./pages/Users";
import Wrapper from "./components/Wrapper";

function App() {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

	const [isLoginOpen, setIsLoginOpen] = useState(!user);

	const handleLoginOpen = (state) => {
		setIsLoginOpen(state);
	};

	const handleUser = (user) => {
		setUser(user);
	};

	return (
		<Wrapper
			handleUser={handleUser}
			handleLoginOpen={handleLoginOpen}
			loginOpen={isLoginOpen}
			user={user}
		>
			<Routes>
				<Route path="/:id" element={<User user={user} />} />
			</Routes>
		</Wrapper>
	);
}

export default App;
