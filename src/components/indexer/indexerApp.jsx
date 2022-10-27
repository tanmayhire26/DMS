import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { loadLogin } from "../../actions/loginAction";
import IndexerNavbar from "./indexerNavbar";

function IndexerApp() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(loadLogin());
	}, []);

	return (
		<>
			<IndexerNavbar />
			<Outlet />
		</>
	);
}

export default IndexerApp;
