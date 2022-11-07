import { yupResolver } from "@hookform/resolvers/yup";
import { Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-router-dom";
import * as yup from "yup";
import { getAllDepartments } from "../../actions/departmentAction";
import {
	addDoctype,
	getFilteredDoctypes,
	updateDoctype,
} from "../../actions/doctypeAction";

const schema = yup.object().shape({
	docTypeCode: yup.string().required(),
	name: yup.string().required(),
	department: yup.string().required(),
});

function DoctypeForm(props) {
	const dispatch = useDispatch();
	const { selectedDoctype } = props;
	const dtypeId = selectedDoctype._id;
	const departments = useSelector(
		(state) => state.departmentReducer.departments
	);
	const doctypes = useSelector((state) => state.doctypeReducer.doctypes);

	//state variables for filter and search-------------
	const [doctypeSearch, setDoctypeSearch] = useState("");

	useEffect(() => dispatch(getAllDepartments()), []);

	useEffect(() => {
		if (!dtypeId) return;
		const doctype = doctypes.find((d) => d._id === dtypeId);
		dispatch(getAllDepartments());
		setValue("name", doctype.name);
		setValue("department", doctype.department);
		setValue("docTypeCode", doctype.docTypeCode);
		setValue("_id", doctype._id);
	}, dtypeId);

	const onSubmitHandler = (data) => {
		if (data._id) {
			console.log("doctype updated", data);
			dispatch(updateDoctype(data));
		} else {
			console.log("doctype added");
			dispatch(addDoctype(data));
		}
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm({ resolver: yupResolver(schema) });

	//------------Let's search on doctype-----------------

	const handleDTSearch = (e) => {
		let searchValue = e.target.value;
		setDoctypeSearch(searchValue);
		dispatch(getFilteredDoctypes(searchValue, ""));
	};

	//let's search on department----------------------------

	const handleDepFilter = (e) => {
		console.log(e.target.value);
		dispatch(getFilteredDoctypes("", e.target.value));
	};

	//-------------------------------------------------RETURN------------------------------------------------------------
	return (
		<body className="w-full">
			<h6 className="">
				Add or Search Document type
			</h6>
			
				<Form onSubmit={handleSubmit(onSubmitHandler)} className="shadow p-3">
					<div className="flex flex-wrap gap-3">
						<div>
							<label htmlFor="doc" className="form-label">
								Doc Type*
							</label>
							<input
								type="text"
								className="form-control outline outline-2 outline-orange-400"
								id="doc"
								placeholder="Enter or Search Doc type"
								{...register("name")}
								onChange={handleDTSearch}
							/>
							{errors.name ? (
								<Alert severity="error">{errors.name?.message}</Alert>
							) : null}
						</div>
						<div>
							<label htmlFor="dep" className="form-label">
								Department*
							</label>

							<select
								{...register("department")}
								onChange={(e) => handleDepFilter(e)}
								className="w-full form-select outline outline-2 outline-orange-400"
								id="dep"
								placeholder="Select a department"
							>
								<option> </option>
								{departments.map((d) => (
									<option key={d._id} value={d.name}>
										{d.name}
									</option>
								))}
							</select>
							{errors.department ? (
								<Alert severity="error">{errors.department?.message}</Alert>
							) : null}
						</div>
						<div>
							<label htmlFor="code" className="form-label">
								Doc Type code*
							</label>
							<input
								type="text"
								className="form-control outline outline-2 outline-orange-400"
								{...register("docTypeCode")}
								placeholder="Enter Doc Type code"
							/>
							{errors.docTypeCode ? (
								<Alert severity="error">{errors.docTypeCode?.message}</Alert>
							) : null}
						</div>
						<div className="mt-[4%] ml-[3%]">
							<button
								type="submit"
								className="bg-orange-300 rounded-full p-1 w-[150%]"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.0"
									stroke="currentColor"
									className="w-6 absolute"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>{" "}
								Add doc Type
							</button>
						</div>
					</div>
				</Form>
		
		</body>
	);
}

export default DoctypeForm;
