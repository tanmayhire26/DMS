import { Popover, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { legacy_createStore } from "redux";
import { getAllDepartments } from "../actions/departmentAction";
import {
	deleteUser,
	getAllUsers,
	getFilteredUsers,
} from "../actions/userAction";
import UserFilterList from "./common/userFilterList";
import RegisterForm from "./forms/registerForm";
import Logo from "./logo";

function User() {
	const dispatch = useDispatch();

	//state vriables for filter
	const [selectedRole, setSelectedRole] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const [departmentsFilter, setDepartmentsFilter] = useState([]);

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
		dispatch(getFilteredUsers(selectedRole,searchValue));
		setSearchQuery(searchValue);
	};

	//Filter users according to their departments array
	const handleDepartmentsFilter = (departmentsArr) => {
		dispatch(getFilteredUsers(selectedRole, searchQuery, departmentsArr));
		setDepartmentsFilter(departmentsArr);
	};

	return (
		<>
			<div className="row flex divide-x">
				<div className="col-2 divide-y flex-row justify-center h-screen">
					<div className="mt-3 flex justify-center pb-3">
						<Logo />
					</div>
					<div className="ml-5">
						<UserFilterList
							handleRoleClick={handleRoleClick}
							onDepartmentsChange={handleDepartmentsFilter}
						/>
					</div>
				</div>
				<div className="col">
					<div className="flex justify-center w-3/6">
						<div className="mt-5 mr-5 shadow p-4">
							<label className="form-label" htmlFor="username">
								Search by username
							</label>
							<input
								type="text"
								className="form-control outline outline-2 outline-offset-2 outline-orange-400"
								id="username"
								onChange={handleUsernameSearch}
							/>
						</div>
						<div className="flex h-1/6 justify-center mt-5">
							<button
								onClick={handleClick}
								className="outline outline-3 outline-offset-2 outline-green-500 rounded-full font-bold p-1"
							>
								Add User
							</button>
						</div>
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
								<div
									className={`${
										u.isActive ? "text-green-500" : "text-red-500"
									} font-bold mx-2`}
								>
									O
								</div>
								{/* <div>
									<img className="h-[50px] w-[50px] rounded-full" src={`/profile-images/${u.userName}.jpg`} />
								</div> */}
								<div className="col-2">{u.userName}</div>
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
