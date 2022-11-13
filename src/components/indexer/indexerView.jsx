import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
	deleteDocument,
	getAllDocuments,
	getUserDocuments,
} from "../../actions/documentAction";
import { loadLogin } from "../../actions/loginAction";
import Logo from "../logo";
import jwt_decode from "jwt-decode";
import { Popover, Typography } from "@mui/material";
import { getAllDoctypes } from "../../actions/doctypeAction";
import { getAllDoctypefields } from "../../actions/doctypefieldAction";
import { getAllFields } from "../../actions/fieldAction";
import FilterList from "../common/filterList";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { thumbnail } from "@cloudinary/transformation-builder-sdk/actions/resize";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { forwardRef } from "react";

const Alert = forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function IndexerView() {
	const dispatch = useDispatch();

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

	const navigate = useNavigate();
	const [imageSrc, setImageSrc] = useState("");
	const [anchorEl, setAnchorEl] = useState(null);
	const [view, setView] = useState(false);

	const open = Boolean(anchorEl);
	const id = open ? "simple-popover" : undefined;
	let token = useSelector((state) => state.loginReducer.token);
	let decoded = {};
	let userDepartments = [];
	if (token) {
		decoded = jwt_decode(token);

		userDepartments = decoded.departments;
	}

	// useEffect(() => {
	// 	//dispatch(getAllDocuments());
	// 	dispatch(getUserDocuments(userDepartments));
	// }, []);
	let documents = useSelector((state) => state.documentReducer.documents);

	//----------Get image buffer from db and covnert to image base 64-----------
	let [imageFromDb, setImageFromDb] = useState();

	//--------------------------CLOUDINARY-----------------------------------------------
	const cld = new Cloudinary({
		cloud: {
			cloudName: "dc4ioiozw",
		},
	});
	const myImage = cld.image(imageSrc.slice(0, -4));

	myImage.format(imageSrc.slice(-3)); // Deliver as JPEG. */
	//myImage.resize(thumbnail().width(1000).height(1000))

	//--------------------------------------------------------------------------------------
	let [imageName, setImageName] = useState();
	if (imageFromDb) {
		function _arrayBufferToBase64(buffer) {
			var binary = "";
			var bytes = new Uint8Array(buffer);
			var len = bytes.byteLength;
			for (var i = 0; i < len; i++) {
				binary += String.fromCharCode(bytes[i]);
			}
			return window.btoa(binary);
		}
		const data = _arrayBufferToBase64(imageFromDb.data?.data);
		setTimeout(() => {
			setImageName(`data:${imageFromDb?.mimetype};base64,` + data);
		}, 100);
	}
	const handleDelete = (d) => {
		dispatch(deleteDocument(d));
		handleClickA();
	};

	const handleClick = (event, d) => {
		console.log(d.path.slice(14));
		setAnchorEl(event.currentTarget);
		setImageSrc(d.path.slice(14));
		setImageFromDb(d.documentImage);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleDocClick = (d) => {
		console.log("handling edit of document", d);
	};
	//---------------------------------------------------------------
	//--------------Handle Image Preview Click to get bigger image--------------------

	const handleImageView = () => {
		view === false ? setView(true) : setView(false);
		console.log("im,age clicked, showing image full image");
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

	//-------------------------------------on Delete alert box----------------------------------------------------
	const [openA, setOpenA] = useState(false);

	const handleClickA = () => {
		setOpenA(true);
	};

	const handleCloseA = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpenA(false);
	};

	return (
		<>
			<Snackbar open={openA} autoHideDuration={2000} onClose={handleCloseA}>
				<Alert onClose={handleCloseA} severity="warning" sx={{ width: "100%" }}>
					Document Deleted !
				</Alert>
			</Snackbar>

			<div className="row">
				<div className="col-2 h-screen border-r">
					<div className="w-full p-3 flex justify-center border-b">
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
				<div className="col flex-row">
					<div onClick={handleImageView}>
						{view ? (
							<div className="fixed z-50">
								{imageFromDb?.data ? (
									<img src={imageName} />
								) : (
									<AdvancedImage cldImg={myImage} />
								)}
							</div>
						) : null}
					</div>
					<div
						className={
							view === false
								? "mt-4 mx-4 overflow-y-scroll h-screen"
								: "blur mt-4 mx-4 overflow-y-scroll h-screen"
						}
					>
						<div onClick={handleImageView}>
							<Popover
								id={id}
								open={open}
								anchorEl={anchorEl}
								onClose={handleClose}
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "left",
								}}
								// transformOrigin={{
								// 	vertical: "top",
								// 	horizontal: "center",
								// }}
								// PaperProps={{
								// 	style: { width: "60%", height: "auto" },
								// }}
							>
								<Typography sx={{ p: 2 }}>
									{/* <img
									className="w-full h-full backdrop-blur"
									alt="Document Preview"
									src={`https://res.cloudinary.com/dc4ioiozw/image/upload/v1667557911/${imageSrc}`}
								/> */}

									{imageFromDb?.data ? (
										<img src={imageName} />
									) : (
										<AdvancedImage cldImg={myImage} />
									)}
								</Typography>
							</Popover>
						</div>

						{documents.map((d) => (
							<div
								key={d._id}
								className={
									d.sensitive === false
										? "text-xs border-l-4 shadow border-orange-400 px-3 h-[50px]  my-4  flex justify-center items-center"
										: "text-xs text-yellow-600 bg-black border-l-4 shadow border-yellow-400 px-3 h-[50px]   my-4  flex justify-center items-center"
								}
							>
								<div className="col">
									{Object.values(d.indexingInfo)[0] + ""}
								</div>
								<div className="col">{d.name}</div>
								<div className="col">{d.dcn}</div>
								<div className="col-3">{d.date.toString()}</div>
								<div className="col">{d.doctype}</div>

								<div className="col">{d.department}</div>
								<div className="">
									<Link to={`${d._id}`}>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="orange"
											className="w-8 h-8  p-1 bg-slate-100 border rounded-full"
										>
											<path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
										</svg>
									</Link>
								</div>
								<div
									onClick={(e) => handleClick(e, d)}
									style={{ cursor: "pointer" }}
									className="mx-2 border p-1 rounded-full bg-slate-100"
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
								<div className="col-1">
									<svg
										onClick={() => handleDelete(d)}
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="orange"
										className="w-8 h-8 border rounded-full p-1 bg-slate-100"
									>
										<path
											fill-rule="evenodd"
											d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
											clip-rule="evenodd"
										/>
									</svg>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
}

export default IndexerView;
