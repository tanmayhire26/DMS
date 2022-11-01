import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AlertBox(props) {
	const { openIndexer } = props;
	const [open, setOpen] = React.useState(false);
	setOpen(openIndexer);
	// const handleClick = () => {
	// 	setOpen(true);
	// };

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	return (
		<>
			<Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
				<Alert onClose={handleClose} severity="warning" sx={{ width: "100%" }}>
					Logged Out !
				</Alert>
			</Snackbar>
		</>
	);
}

export default AlertBox;
