import { Popover, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
	getAllDocuments,
	getUserDocuments,
} from "../../actions/documentAction";
import { loadLogin, logout } from "../../actions/loginAction";
import Logo from "../logo";

import jwt_decode from "jwt-decode";

function GeneralUser() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	useEffect(() => {
		dispatch(loadLogin());
		//dispatch(getAllDocuments());
		dispatch(getUserDocuments(userDepartments));
	}, []);
	let token = "";
	let decoded = {};
	token = useSelector((state) => state.loginReducer.token);
	if (token !== "") {
		decoded = jwt_decode(token);
	}
	let userDepartments = decoded.departments;
	const [imageSrc, setImageSrc] = useState("");
	const [anchorEl, setAnchorEl] = useState(null);

	const open = Boolean(anchorEl);
	const id = open ? "simple-popover" : undefined;

	const documents = useSelector((state) => state.documentReducer.documents);

	const handleLogout = () => {
		dispatch(logout());
		navigate("/login");
	};

	const handleClick = (event, d) => {
		setAnchorEl(event.currentTarget);
		setImageSrc(d.path.slice(14));
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<div className="row">
				<div className="col-3 border-r h-screen flex justify-center">
					<div className="mt-5">
						<Logo />
					</div>
					<div className=""></div>
				</div>
				<div className="col">
					<div
						style={{ cursor: "pointer" }}
						onClick={handleLogout}
						className="w-[10%] items-center flex justify-center mt-2 bg-red-500 text-white"
					>
						LOG OUT
					</div>
					<div className="m-5">
						<Popover
							id={id}
							open={open}
							anchorEl={anchorEl}
							onClose={handleClose}
							anchorOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
						>
							<Typography sx={{ p: 2 }}>
								<img alt="Document Preview" src={`${imageSrc}`} />
								This is an image preview pop over
							</Typography>
						</Popover>
						{documents.map((d) => (
							<div
								className="flex my-4 h-[50px] shadow px-4 justify-center items-center justify-between border-l-4 border-orange-400"
								key={d._id}
							>
								<div
									onClick={(e) => handleClick(e, d)}
									style={{ cursor: "pointer" }}
									className="bg-gradient-to-r from-indigo-300 to-purple-400 p-1 rounded mr-2"
								>
									View
								</div>
								<div className="col">{d.name}</div>
								<div className="col">{d.dcn}</div>
								<div className="col">{d.doctype}</div>
								<div className="col">{d.department}</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
}

export default GeneralUser;
