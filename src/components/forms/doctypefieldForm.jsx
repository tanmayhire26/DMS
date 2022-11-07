import { useSelect } from "@mui/base";
import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDepartments } from "../../actions/departmentAction";
import { getAllFields } from "../../actions/fieldAction";
import { getAllDoctypes } from "../../actions/doctypeAction";
import { Form } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import {
	addDoctypefield,
	getAllDoctypefields,
	getFilteredDoctypefields,
	updateDoctypefield,
} from "../../actions/doctypefieldAction";

const schema = yup.object().shape({
	docType: yup.string().required(),
	field: yup.string().required(),
	//department: yup.string().required(),
	isRequired: yup.boolean().required(),
});

function DoctypefieldForm(props) {
	const { selectedDTF } = props;
	const dtfid = selectedDTF._id;
	const doctypefields = useSelector(
		(state) => state.doctypefieldReducer.doctypefields
	);
	const dispatch = useDispatch();
	let [filteredDoctypes, setFilteredDoctypes] = useState([]);
	// const [selectedField, setSelectedField] = useState("");
	// const [selectedDoctype, setSelectedDoctype] = useState("");

	//------------------state variables for filter by department,doc type and field names-------------------
	const [depFilter, setDepFilter] = useState("");
	const [dtypeFilter, setDtypefilter] = useState("");
	const [fieldFilter, setFieldFilter] = useState("");

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		reset,
	} = useForm({ resolver: yupResolver(schema) });

	useEffect(() => {
		dispatch(getAllDepartments());
		dispatch(getAllDoctypes());
		dispatch(getAllFields());
	}, []);
	const doctypes = useSelector((state) => state.doctypeReducer.doctypes);
	const fields = useSelector((state) => state.fieldReducer.fields);

	useEffect(() => {
		if (!dtfid) return;
		const dtfield = doctypefields.find((d) => d._id === dtfid);
		setFilteredDoctypes(doctypes);
		setValue("docType", dtfield.docType);
		setValue("field", dtfield.field);
		setValue("isRequired", dtfield.isRequired);
		// setValue(
		// 	"department",
		// 	doctypes.find((dt) => dt._id === dtfield.docType).department
		// );
	}, [dtfid]);

	const departments = useSelector(
		(state) => state.departmentReducer.departments
	);

	const onSubmitHandler = (data) => {
		//let data = {};
		// data["docType"] = selectedDoctype;
		// data["field"] = selectedField;
		console.log(data, "in submit handlker of doctype field form");
		if (data._id) {
			console.log("updated dtf");
			dispatch(updateDoctypefield(data));
		} else {
			console.log("added dtf");
			dispatch(addDoctypefield(data));
		}
	};

	//For getting doctypes with the selected department in the next select field in form
	let handleDepChange = (e) => {
		filteredDoctypes = doctypes.filter(
			(dt) => dt.department === e.target.value
		);
		let depValue = e.target.value;
		//set the selected departmentvalue (string) to filter on
		setDepFilter(depValue);
		//dispatch function to get filtered values from backend

		dispatch(getFilteredDoctypefields(depValue, ""));
		setFilteredDoctypes(filteredDoctypes);
	};

	//for getting the selected doctype (id) and sending it as doctype field to the backend /filter

	const handleDoctypechange = (e) => {
		let dtypeValue = e.target.value;
		console.log(dtypeValue);
		setDtypefilter(dtypeValue);
		dispatch(getFilteredDoctypefields("", dtypeValue));
	};

	//for getting the selected field (id) and sending it as  field to the backend /filter
	const handleFieldChange = (e) => {
		let fieldValue = e.target.value;
		console.log("fieldValue");
		setFieldFilter(fieldValue);
		dispatch(getFilteredDoctypefields("", dtypeFilter, fieldValue));
	};

	return (
		<>
			<h6>Add or Search Document type Fields</h6>
			<Form
				onSubmit={handleSubmit(onSubmitHandler)}
				className="shadow p-3 backdrop-blur rounded flex flex-wrap justify-between"
			>
				<div className="flex-row">
					<label htmlFor="dep" className="form-label">
						Department
					</label>
					<select
						onChange={handleDepChange}
						className="form-select outline outline-2 outline-orange-400"
						//  {...register("department")}
						id="dep"
					>
						<option value={null}>Select Department</option>
						{departments.map((d) => (
							<option key={d._id} value={d.name}>
								{d.name}
							</option>
						))}
					</select>
					{/* {errors.department? (
						<Alert severity="error">{errors.department?.message}</Alert>
					) : null} */}
				</div>
				<div className="flex-row">
					<label className="form-label" htmlFor="doct">
						Document type
					</label>
					<select
						id="doct"
						className="form-select outline outline-2 outline-orange-400"
						{...register("docType")}
						onChange={handleDoctypechange}
					>
						<option value={null}>Select Doctype</option>
						{filteredDoctypes.map((fdt) => (
							<option key={fdt._id} value={fdt._id}>
								{fdt.name}
							</option>
						))}
					</select>
					{/* {errors.doctype ? (
						<Alert severity="error">{errors.doctype?.message}</Alert>
					) : null} */}
				</div>
				<div className="flex-row">
					<label className="form-label" htmlFor="fld">
						Field
					</label>
					<select
						{...register("field")}
						id="fld"
						className="form-select outline outline-2 outline-orange-400"
						onChange={handleFieldChange}
					>
						<option value={null}>Select Field</option>
						{fields.map((f) => (
							<option key={f._id} value={f._id}>
								{f.name.name}
							</option>
						))}
					</select>
					{/* 					
					{errors.field ? (
						<Alert severity="error">{errors.field?.message}</Alert>
					) : null} */}
				</div>
				<div className="mt-2 w-full flex justify-center">
					<label className="form-label" htmlFor="req">
						Required?
					</label>
					<input
						type="checkbox"
						className="checkbox"
						{...register("isRequired")}
					/>
				</div>
				<button
					type="submit"
					className="self-center w-full mx-[30%]  p-1 rounded-full bg-orange-300 mt-3"
				>
					Add Doc Type Field
				</button>
			</Form>
		</>
	);
}

export default DoctypefieldForm;
