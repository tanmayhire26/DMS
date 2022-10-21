import { Popover, Typography } from "@mui/material";
import { useState } from "react";
import RegisterForm from "./forms/registerForm";
import Logo from "./logo";

function User() {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const id = open ? "simple-popover" : undefined;
	
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<div className="row flex divide-x">
				<div className="col-2 divide-y flex-row justify-center h-screen">
					<div className="mt-3 flex justify-center pb-3">
						<Logo />
					</div>
					<div></div>
				</div>
				<div className="col">
					<h2>Department page</h2>
					<button onClick={handleClick} className="btn  btn-success">
						Add User
					</button>
					<Popover
						id={id}
						open={open}
						anchorEl={anchorEl}
						onClose={handleClose}
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "left",
						}}
					>
						<Typography sx={{ p: 2 }}>
							<RegisterForm />
						</Typography>
					</Popover>
				</div>
			</div>
		</>
	);
}

export default User;
