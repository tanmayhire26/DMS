import { Popover, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getAllDepartments } from "../actions/departmentAction";
import {
	changeClearance,
	deleteUser,
	getAllUsers,
	getFilteredUsers,
} from "../actions/userAction";
import UserFilterList from "./common/userFilterList";
import RegisterForm from "./forms/registerForm";
import Logo from "./logo";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ImageCreator from "./common/imageCreator";

function User() {
	const dispatch = useDispatch();

	//state vriables for filter
	const [selectedRole, setSelectedRole] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const [departmentsFilter, setDepartmentsFilter] = useState([]);

	//--profile image-----
	const [profileImage, setProfileImage] = useState("default.png");
	const [anchorEl, setAnchorEl] = useState(null);

	const open = Boolean(anchorEl);
	const id = open ? "simple-popover" : undefined;
	let departNamesOfUser = [];
	useEffect(() => {
		dispatch(getAllUsers());
		//dispatch(getFilteredUsers());
		dispatch(getAllDepartments());
	}, []);
	let users = useSelector((state) => state.userReducer.users);
	const departments = useSelector(
		(state) => state.departmentReducer.departments
	);

	const [user, setUser] = useState({});

	const handleUserClick = (u) => {
		setUser(u);
	};

	const handleDelete = (u) => {
		dispatch(deleteUser(u));
	};

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	//let's append departmentNamesArr to users object

	for (let i = 0; i < users.length; i++) {
		let userDepartmentObjects = [];
		let tempUserDepartmentsIds = users[i].departments;
		for (let j = 0; j < tempUserDepartmentsIds.length; j++) {
			let tempDepartmentObj = departments.find(
				(d) => d._id === tempUserDepartmentsIds[j]
			);
			if (tempDepartmentObj) {
				userDepartmentObjects.push(tempDepartmentObj.name);
			}
		}
		users[i]["departmentNames"] = userDepartmentObjects;
	}

	const handleRoleClick = (r) => {
		dispatch(getFilteredUsers(r, ""));
		setSelectedRole(r);
	};

	const handleUsernameSearch = (e) => {
		let searchValue = e.target.value;
		searchValue.trim();
		dispatch(getFilteredUsers(selectedRole, searchValue));
		setSearchQuery(searchValue);
	};

	//Filter users according to their departments array
	const handleDepartmentsFilter = (departmentsArr) => {
		dispatch(getFilteredUsers(selectedRole, searchQuery, departmentsArr));
		setDepartmentsFilter(departmentsArr);
	};

	//-----------------Security clearance to view sensitive documents----------------------------
	const handleClearance = (e, u) => {
		dispatch(changeClearance(u));
	};

	return (
		<>
			<ToastContainer />
			<div className="row flex divide-x">
				<div className="col-2 divide-y flex-row justify-center h-screen">
					<div className="mt-3 flex justify-center pb-3">
						<Logo />
					</div>
					<div className="ml-5">
						<UserFilterList
							handleRoleClick={handleRoleClick}
							onDepartmentsChange={handleDepartmentsFilter}
							selectedRole={selectedRole}
						/>
					</div>
				</div>
				<div className="col">
					<div className="flex mt-3 justify-center p-3 shadow w-3/6">
						<div className="">
							<label className="form-label" htmlFor="username">
								Search by username
							</label>
							<input
								type="text"
								className="form-control outline outline-2 outline-orange-400"
								id="username"
								onChange={handleUsernameSearch}
							/>
						</div>
						<button
							onClick={handleClick}
							className="rounded-full mt-[6%] ml-[10%] w-2/6 h-1/6 bg-orange-300 p-1"
						>
							Add User
						</button>
					</div>
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
					<div className="mt-5">
						{users.map((u) => (
							<div
								key={u._id}
								className="flex w-full shadow border-l-4 border-orange-300 p-3 bg-white mb-3"
							>
								<div className="col-2 flex">
									<div
										className={`text-4xl ${
											u.isActive ? "text-green-500" : "text-red-500"
										} font-bold mx-2`}
									>
										.
									</div>
									{u.profileImage ? (
										<div className="">
											<ImageCreator imageFromDb={u.profileImage} />
										</div>
									) : (
										<img
											className="rounded-full h-[50px] w-[50px]"
											src={require(`../../../../BackEnd/Document-management/indexerImages/${profileImage}`)}
										/>
									)}
								</div>
								<div className="col-2 flex">
									{u.userName}
									<div onClick={(e) => handleClearance(e, u)}>
										{u.clearance === true ? (
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="yellow"
												viewBox="0 0 24 24"
												stroke-width="1.5"
												stroke="black"
												class="w-6 h-6"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
												/>
											</svg>
										) : (
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke-width="1.5"
												stroke="currentColor"
												class="w-6 h-6"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z"
												/>
											</svg>
										)}
									</div>
								</div>

								<div className="col-5 w-full text-sm flex gap-3 flex-wrap">
									{u.departmentNames.map((ud) => (
										<div>{ud}</div>
									))}
								</div>
								<div className="col-2">{u.role}</div>
								<div className="flex col-3">
									<Link to={`${u._id}/${u.role}`}>
										<svg
											onClick={() => handleUserClick(u)}
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="orange"
											className="w-8 h-8 mr-7 p-1 bg-slate-100 border rounded-full"
										>
											<path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
										</svg>
									</Link>

									<svg
										onClick={() => handleDelete(u)}
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

export default User;
