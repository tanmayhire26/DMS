import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, useNavigate } from "react-router-dom";
import { getAllDepartments } from "../../actions/departmentAction";
import { getAllDoctypes } from "../../actions/doctypeAction";
import jwt_decode from "jwt-decode";
import { loadLogin } from "../../actions/loginAction";

function IndexerOpenForm(props) {
	let token = "";
	let decoded;

	token = useSelector((state) => state.loginReducer.token);

	// useEffect(() => {
	// 	dispatch(loadLogin());
	// }, []);

	if (token) {
		decoded = jwt_decode(token);
	}
	const userDepartmentIds = decoded.departments;

	// const token = useSelector((state) => state.loginReducer.token);
	// let decoded = jwt_decode(token);
	const { onDoctypeChange, getSelectedDep } = props;
	let userDepartments = [];
	const [dep, setDep] = useState("");
	const dispatch = useDispatch();
	let [filteredDoctypes, setFilteredDoctypes] = useState([]);

	useEffect(() => {
		dispatch(getAllDepartments());
		dispatch(getAllDoctypes());
	}, []);
	const departments = useSelector(
		(state) => state.departmentReducer.departments
	);

	const doctypes = useSelector((state) => state.doctypeReducer.doctypes);
	let handleDepChange = (e) => {
		getSelectedDep(e);
		filteredDoctypes = doctypes.filter(
			(dt) => dt.department === e.target.value
		);
		setFilteredDoctypes(filteredDoctypes);
	};

	//to get the logged in users department only to select from  :

	for (let i = 0; i < userDepartmentIds.length; i++) {
		let tempUserDepartment = departments.find(
			(d) => d._id === userDepartmentIds[i]
		);
		userDepartments.push(tempUserDepartment);
	}
	console.log(userDepartments);

	return (
		<>
			<Form className="form flex-row items-center p-5 justify-center">
				<div className="flex gap-[15%]">
					<div className="">
						<label className="form-label" htmlFor="dep">
							Department*
						</label>
						<select onChange={handleDepChange} id="dep" className="form-select">
							<option>Select a department</option>
							{userDepartments?.map((d) => (
								<option value={d.name} key={d._id}>
									{d.name}
								</option>
							))}
						</select>
					</div>
					<div className="">
						<label className="form-label" htmlFor="doct">
							Document Type*
						</label>
						<select
							onChange={onDoctypeChange}
							className="form-select"
							id="doct "
							// {...register("docType")}
						>
							<option>Select a doctype</option>
							{filteredDoctypes.map((fdt) => (
								<option key={fdt._id} value={fdt._id}>
									{fdt.name}
								</option>
							))}
						</select>
					</div>
				</div>
				<button
					className="mt-4 p-2 w-3/6  rounded-full w-full bg-orange-500 text-white"
					type="submit"
				>
					Open Form
				</button>
			</Form>
		</>
	);
}

export default IndexerOpenForm;
