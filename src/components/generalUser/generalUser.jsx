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

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { forwardRef } from "react";
import FilterList from "../common/filterList";
import { getAllDoctypes } from "../../actions/doctypeAction";
import { getAllDoctypefields } from "../../actions/doctypefieldAction";
import { getAllFields } from "../../actions/fieldAction";

const Alert = forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function GeneralUser() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	let dtfieldsForSearchObjects = [];
	const [doctypefieldsReq, setDoctypefieldsReq] = useState([]);
	let fieldsForSearchObjects = [];
	let [doctypes, setDoctypes] = useState([]);
	let [selectedDepartment, setSelectedDepartment] = useState("");
	let [selectedDoctype, setSelectedDoctype] = useState("");
	const doctypefieldObjects = useSelector(
		(state) => state.doctypefieldReducer.doctypefields
	); //arrays of all doctypefield objects from db

	const fieldObjects = useSelector((state) => state.fieldReducer.fields); //array of all field objects from db
	const doctypeObjects = useSelector((state) => state.doctypeReducer.doctypes);
	useEffect(() => {
		dispatch(loadLogin());
		dispatch(getAllDoctypes());
		dispatch(getAllDoctypefields());
		dispatch(getAllFields());
		//dispatch(getAllDocuments());
		dispatch(getUserDocuments(userDepartments, ""));
	}, []);

	let token = "";
	let decoded = {};
	token = useSelector((state) => state.loginReducer.token);
	if (token !== "") {
		decoded = jwt_decode(token);
	}
	const [open1, setOpen1] = useState(false);

	const handleClick1 = () => {
		setOpen1(true);
	};

	const handleClose1 = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen1(false);
	};
	const profileImageName = decoded.userName;
	const profileImageSrc = decoded.userName + ".jpg";
	let userDepartments = decoded.departments;
	const [imageSrc, setImageSrc] = useState("");
	const [anchorEl, setAnchorEl] = useState(null);

	const open = Boolean(anchorEl);
	const id = open ? "simple-popover" : undefined;

	const documents = useSelector((state) => state.documentReducer.documents);

	const handleLogout = () => {
		handleClick1();
		return setTimeout(() => {
			navigate("/login");
			dispatch(logout());
		}, 1500);
	};

	const handleClick = (event, d) => {
		setAnchorEl(event.currentTarget);
		setImageSrc(d.path.slice(14));
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	//let's handle department filter click
	const handleDepClick = (d) => {
		let tempDoctypes = doctypeObjects.filter((dt) => dt.department === d);
		setDoctypes(tempDoctypes);
		setSelectedDepartment(d);

		dispatch(getUserDocuments(userDepartments, d));
	};

	//let's handle the doctype filter click
	const handleDTClick = (d) => {
		setSelectedDoctype(d);
		dispatch(getUserDocuments(userDepartments, selectedDepartment, d.name));
		//----------------------------------get fields for search-------------------------------
		dtfieldsForSearchObjects = doctypefieldObjects?.filter(
			(dtf) => dtf.docType === d._id
		);

		//let's create a fields objects arr which has fields from the required doctype field object array
		for (let i = 0; i < dtfieldsForSearchObjects.length; i++) {
			let tempFieldObj = fieldObjects.find(
				(f) => f._id === dtfieldsForSearchObjects[i].field
			);
			if (tempFieldObj.length !== 0) {
				fieldsForSearchObjects.push(tempFieldObj);
			}
		}

		//we will append fieldObj property to doctypeFields

		for (let j = 0; j < dtfieldsForSearchObjects.length; j++) {
			dtfieldsForSearchObjects[j]["fieldObj"] = fieldsForSearchObjects[j];
		}

		console.log(dtfieldsForSearchObjects);
		setDoctypefieldsReq(dtfieldsForSearchObjects);
	};

	//---------------------------------------------Search by doctypeFieldId--------------------------------------------
	const handleSearch = (e, dtf) => {
		//console.log("handling search", dtf.fieldObj.name.name);
		let searchQuery = e.target.value;
		console.log(searchQuery);
		dispatch(
			getUserDocuments(
				userDepartments,
				selectedDepartment,
				selectedDoctype,
				searchQuery,
				dtf
			)
		);
	};

	return (
		<>
			<Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}>
				<Alert onClose={handleClose1} severity="warning" sx={{ width: "100%" }}>
					Logged Out!
				</Alert>
			</Snackbar>
			<div className="row">
				<div className="col-3 border-r h-screen flex-row">
					<div className="mt-5  flex justify-center ">
						<Logo />
					</div>
					<div className="mt-5 flex-row justify-center">
						<FilterList
							departments={userDepartments}
							handleDepClick={handleDepClick}
							handleDTClick={handleDTClick}
							doctypes={doctypes}
							doctypefieldsReq={doctypefieldsReq}
							handleSearch={handleSearch}
						/>
					</div>
				</div>
				<div className="col">
					<div className="flex position-absolute right-[10%]">
						<div>
							<img
								className="h-[50px] w-[50px] rounded-full"
								alt="Profile Photo"
								src={`/profile-images/${profileImageSrc}`}
							/>
						</div>
						<div className="flex-row ml-2">
							<div className="text-xs text-orange-600">{`Hi ${profileImageName}`}</div>
							<div className="text-xs text-purple-600">{`${decoded.role}`}</div>

							<div
								style={{ cursor: "pointer" }}
								onClick={handleLogout}
								className="w-[60px] p-1 text-xs h-[15px] items-center flex justify-center ml-2 bg-red-500 text-white"
							>
								LOG OUT
							</div>
						</div>
					</div>

					<div className="mt-[10%]">
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
								<img alt="Document Preview" src={`/documents/${imageSrc}`} />
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
