import logo from "./logo.svg";
import "./App.css";
import { Button } from "@cred/neopop-web/lib/components";
import Navbar from "./components/navBar";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadLogin } from "./actions/loginAction";
import { useEffect } from "react";
import NewNavBar from "./components/NewNavBar";
function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(loadLogin());
	}, []);
	return (
		<>
			<Navbar />
			{/* <NewNavBar /> */}
			<Outlet />
		</>
	);
}

export default App;
