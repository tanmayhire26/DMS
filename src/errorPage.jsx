import { Alert } from "@mui/material";
import { useRouteError } from "react-router-dom";

function ErrorPage() {
	const error = useRouteError();
	return (
		<>
			<div
				className="w-screen h-screen flex justify-center items-center bg-no-repeat bg-center bg-cover"
				style={{ backgroundImage: "url(/errorImage.jpg)" }}
			>
				<Alert severity="error">{error.statusText || error.message}</Alert>
			</div>
		</>
	);
}

export default ErrorPage;
