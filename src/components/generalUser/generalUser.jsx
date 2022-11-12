import { Popover, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
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
import ViewComments from "./views/viewComments";
import {
	getAllTags,
	getTagsByDoc,
} from "../../actions/customiseDocuments/tagAction";
import ViewTags from "./views/viewTags";
import CustomTagsSearch from "../common/customSearch";
import { Popup } from "semantic-ui-react";

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

	//----------Comments---------
	const [documentV, setDocumentV] = useState({});
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
		dispatch(getAllTags());
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

	myImage.format(imageSrc.slice(-3));
	// Deliver as JPEG. */
	//myImage.resize(thumbnail().width(1000).height(1000))

	//--------------------------------------------------------------------------------------

	//----------Append Tags Array to documents-------------
	const tags = useSelector((state) => state.tagReducer.tags);
	documents.forEach((d) => {
		let tagsD = tags.filter((t) => t.documentId === d._id);
		d["tags"] = tagsD;
	});

	//----------------------------------------------------------------

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


	//-----------------------------------Handle View Comments----------------------------------------------------------------------
	const [viewComments, setViewComments] = useState(false);
	const handleViewComments = (d) => {
		setDocumentV(d);
		viewComments ? setViewComments(false) : setViewComments(true);
	};

	return (
		<>
			<Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}>
				<Alert onClose={handleClose1} severity="warning" sx={{ width: "100%" }}>
					Logged Out!
				</Alert>
			</Snackbar>
			<div className="row">
				<div className="col-2 border-r h-[100%] flex-row">
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
					<div className="">
						<CustomTagsSearch />
					</div>
				</div>
				<div className="col overflow-y-scroll h-screen">
					{/* View Comments component as a pop up div */}
					{viewComments ? (
						<div className="absolute z-10 h-screen flex justify-center items-center ml-[10%]">
							<ViewComments
								documentViewed={documentV}
								handleViewComments={handleViewComments}
							/>
						</div>
					) : null}

					<div className="bg-slate-200 flex absolute right-[3%] p-2 rounded-full mt-2">
						<div className="flex">
							<Popup
								className="p-1 text-xs bg-black text-white"
								content="Edit Profile"
								trigger={
									<Link to={`profile/${decoded?._id}/General User`}>
										<img
											className="h-[50px] w-[50px] rounded-full"
											alt="Profile Photo"
											src={`/profile-images/${profileImageSrc}`}
										/>
									</Link>
								}
							/>
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
						<div className="" onClick={handleImageView}>
							{view ? (
								<div className="fixed z-50">
									<AdvancedImage cldImg={myImage} />
								</div>
							) : null}
						</div>
						<div className={view === false ? "mt-[10%] " : "blur mt-[10%]"}>
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
							<div className="">
								{documents.map((d) => (
									<div className="flex-row">
										<div className="text-xs flex">
											{d.tags?.map((dt) => (
												<div className="bg-purple-500 text-white rounded-full p-1">
													{dt.tag}
												</div>
											))}
										</div>
										<div
											className={
												documentV._id === d._id
													? "text-xs border-l-4 shadow bg-indigo-300 border-orange-400 px-3 h-[50px] mb-4  flex justify-center items-center"
													: d.sensitive === false
													? "text-xs border-l-4 shadow border-orange-400 px-3 h-[50px]  mb-4  flex justify-center items-center"
													: "text-xs text-yellow-600 bg-black border-l-4 shadow border-yellow-400 px-3 h-[50px]   mb-4  flex justify-center items-center"
											}
											key={d._id}
										>
											<div className="col">
												{Object.values(d.indexingInfo)[0] + ""}
											</div>
											<div className="col">{d.name}</div>
											<div className="col">{d.dcn}</div>
											<div className="col">{d.doctype}</div>
											<div className="col">{d.department}</div>

											<div className="col flex gap-2">
												<svg
													onClick={() => handleViewComments(d)}
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth="2.5"
													stroke="orange"
													className="cursor-pointer w-8 h-8 p-1 bg-slate-100 border rounded-full"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
													/>
												</svg>

												<svg
													onClick={(e) => handleClick(e, d)}
													style={{ cursor: "pointer" }}
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 24 24"
													fill="orange"
													className="w-8 h-8 p-1 bg-slate-100 border rounded-full"
												>
													<path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
													<path
														fillRule="evenodd"
														d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
														clipRule="evenodd"
													/>
												</svg>

												<NavLink to={`${d._id}`}>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 24 24"
														fill="orange"
														className="w-8 h-8  p-1 bg-slate-100 border rounded-full"
													>
														<path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
													</svg>
												</NavLink>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default GeneralUser;
