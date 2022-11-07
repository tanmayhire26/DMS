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
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { focusOn } from "@cloudinary/transformation-builder-sdk/qualifiers/gravity";
import { thumbnail } from "@cloudinary/transformation-builder-sdk/actions/resize";
import { FocusOn } from "@cloudinary/transformation-builder-sdk/qualifiers/focusOn";
import { sendNotification } from "../../actions/notifyAction";

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

	//state variable to know if document to view is sensitive and user doesn't have clearance
	let [clear, setClear] = useState(true);

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
	const [isImageClicked, setIsImageClicked] = useState(false);

	//state variable to view full image n absolute position on clicking on pop over
	const [view, setView] = useState(false);
	const open = Boolean(anchorEl);
	const id = open ? "simple-popover" : undefined;

	const documents = useSelector((state) => state.documentReducer.documents);

	//--------------------------CLOUDINARY-----------------------------------------------
	const cld = new Cloudinary({
		cloud: {
			cloudName: "dc4ioiozw",
		},
	});
	const myImage = cld.image(imageSrc.slice(0, -4));

	console.log(imageSrc.slice(0, -4));
	myImage.format(imageSrc.slice(-3)); // Deliver as JPEG. */
	//myImage.resize(thumbnail().width(1000).height(1000))

	//--------------------------------------------------------------------------------------

	const handleLogout = () => {
		handleClick1();
		return setTimeout(() => {
			navigate("/login");
			dispatch(logout());
		}, 1500);
	};

	const handleClick = (event, d) => {
		if (d.sensitive === true && decoded?.clearance === false) {
			setClear(false);
			setAnchorEl(event.currentTarget);
			setImageSrc(d.path.slice(14));
			dispatch(sendNotification(d, decoded?.userName));
		} else {
			setClear(true);
			setAnchorEl(event.currentTarget);
			setImageSrc(d.path.slice(14));
		}
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	//----------------------------------------------------
	//---------Handle Image lcikc on click on the document pop over in absolute position-----------------

	const handleImageView = () => {
		view ? setView(false) : setView(true);
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
		dispatch(getUserDocuments(userDepartments, selectedDepartment, d));
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

	//---------------------------------------handleImageClick for edit Profile---------------------------------------------------

	const handleImageClick = () => {
		isImageClicked === false
			? setIsImageClicked(true)
			: setIsImageClicked(false);
	};

	return (
		<>
			<Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}>
				<Alert onClose={handleClose1} severity="warning" sx={{ width: "100%" }}>
					Logged Out!
				</Alert>
			</Snackbar>
			<div className="row">
				<div className="col-2 border-r h-screen flex-row">
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
							selectedDepartment={selectedDepartment}
							selectedDoctype={selectedDoctype}
						/>
					</div>
				</div>
				<div className="col">
					<div className="flex position-absolute right-[3%] mt-2">
						<div className="flex">
							{isImageClicked === true ? (
								<div className="text-xs bg-slate-100 shadow mr-3 mt-1 flex justify-center items-center">
									Click to edit profile
								</div>
							) : null}
							<Link to={`profile/${decoded?._id}/General User`}>
								<img
									onMouseEnter={handleImageClick}
									onMouseLeave={handleImageClick}
									className="h-[50px] w-[50px] rounded-full"
									alt="Profile Photo"
									src={`/profile-images/${profileImageSrc}`}
								/>
							</Link>
						</div>
						<div className="flex-row ml-2">
							<div className="text-xs text-orange-600 font-bold">{`Hi ${profileImageName}`}</div>
							<div className="text-xs text-purple-600">{`${decoded.role}`}</div>

							<div
								style={{ cursor: "pointer" }}
								onClick={handleLogout}
								className="w-[60px] text-xs h-[15px] items-center flex justify-center font-bold text-red-500"
							>
								LOG OUT
							</div>
						</div>
					</div>
					<div>
						<div onClick={handleImageView}>
							{view ? (
								<div className="absolute z-50">
									<AdvancedImage cldImg={myImage} />
								</div>
							) : null}
						</div>
						<div className={view === false ? "mt-[10%]" : "blur mt-[10%]"}>
							<div onClick={handleImageView}>
								<Popover
									id={id}
									open={open}
									anchorEl={anchorEl}
									onClose={handleClose}
									anchorOrigin={{
										vertical: "center",
										horizontal: "center",
									}}
									// transformOrigin={{
									// 	vertical: "bottom",
									// 	horizontal: "top",
									// }}
									// PaperProps={{
									// 	style: { position:"absolute",top:"10%" },
									// }}
								>
									<Typography sx={{ p: 2 }}>
										{/* <img alt="Document Preview" src={`/documents/${imageSrc}`} /> */}
										{clear === false ? (
											<Alert severity="info">
												You don't have access to this document — Admin will be
												notified!
											</Alert>
										) : (
											<AdvancedImage cldImg={myImage} />
										)}
									</Typography>
								</Popover>
							</div>
							{documents.map((d) => (
								<div
									className={
										d.sensitive === false
											? "text-xs border-l-4 shadow border-orange-400 px-3 h-[50px]  my-4  flex justify-center items-center"
											: "text-xs text-yellow-600 bg-black border-l-4 shadow border-yellow-400 px-3 h-[50px]   my-4  flex justify-center items-center"
									}
									key={d._id}
								>
									<div
										onClick={(e) => handleClick(e, d)}
										style={{ cursor: "pointer" }}
										className="mr-2"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="orange"
											class="w-5 h-5"
										>
											<path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
											<path
												fill-rule="evenodd"
												d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
												clip-rule="evenodd"
											/>
										</svg>
									</div>
									<div className="col">{Object.values(d.indexingInfo)[0]}</div>
									<div className="col">{d.name}</div>
									<div className="col">{d.dcn}</div>
									<div className="col">{d.doctype}</div>
									<div className="col">{d.department}</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default GeneralUser;
