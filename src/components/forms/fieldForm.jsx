import { yupResolver } from "@hookform/resolvers/yup";
import { Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-router-dom";
import * as yup from "yup";
import {
	addField,
	getAllFields,
	getFilteredFields,
	updateField,
} from "../../actions/fieldAction";

const schema = yup.object().shape({
	name: yup.string().required(),
	label: yup.string().required(),
	input: yup.string().required(),
});
function FieldForm(props) {
	const { selectedField, update, setUpdate } = props;
	const fields = useSelector((state) => state.fieldReducer.fields);
	const fieldId = selectedField._id;
	const dispatch = useDispatch();

	const fieldTypes = ["text", "date", "radio", "time", "email", "month", "url"];

	//----------State variables for search queries----------------
	const [nameSearch, setNameSearch] = useState("");
	const [labelSearch, setLabelSearch] = useState("");

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		reset,
	} = useForm({ resolver: yupResolver(schema) });

	const onSubmitHandler = (data) => {
		console.log(data, "data in the submit handler");
		if (data._id) {
			dispatch(updateField(data));
		} else {
			dispatch(addField(data));
		}
		dispatch(getAllFields());
		setUpdate(false);
		reset();
	};

	useEffect(() => {
		if (!fieldId) return;
		const field = fields.find((f) => f._id === fieldId);
		setValue("name", field.name.name);
		setValue("label", field.name.label);
		setValue("input", field.name.input);
		setValue("_id", field._id);
	}, [fieldId]);

	const handleNameSearch = (e) => {
		let nameValue = e.target.value;
		setNameSearch(nameValue);
		dispatch(getFilteredFields(nameValue));
	};

	const handleLabelSearch = (e) => {
		let labelValue = e.target.value;
		setLabelSearch(labelValue);
		//dispatch(getFilteredFields(nameSearch, labelValue));
	};

	return (
		<>
			<h6>{update ? "Update Field" : "Add or Search Field"}</h6>
			<Form
				onSubmit={handleSubmit(onSubmitHandler)}
				className="shadow-lg p-3 backdrop-blur rounded flex flex-wrap gap-3"
			>
				<div className="flex-row">
					<label className="form-label" htmlFor="fname">
						Field Name*
					</label>
					<input
						id="fname"
						className="form-control outline outline-2 outline-orange-400"
						type="text"
						placeholder="Search with fieldName"
						{...register("name")}
						onChange={handleNameSearch}
					/>
					{errors.name ? (
						<Alert severity="error">{errors.name?.message}</Alert>
					) : null}
				</div>
				<div className="flex-row">
					<label className="form-label" htmlFor="flabel">
						Field Label*
					</label>
					<input
						id="flabel"
						className="form-control outline outline-2 outline-orange-400"
						type="text"
						{...register("label")}
					/>
					{errors.label ? (
						<Alert severity="error">{errors.label?.message}</Alert>
					) : null}
				</div>
				<div className="flex-row">
					<label className="form-label" htmlFor="finput">
						Field Input Type*
					</label>
					{/* <input
						id="finput"
						className="form-control outline outline-2 outline-orange-400"
						type="text"
						{...register("input")}
					/> */}
					<select
						{...register("input")}
						className="form-select outline outline-2 outline-orange-400"
					>
						<option value=""> </option>
						{fieldTypes.map((f) => (
							<option key={f} value={f}>
								{f}
							</option>
						))}
					</select>
					{errors.input ? (
						<Alert severity="error">{errors.input?.message}</Alert>
					) : null}
				</div>
				<button
					type="submit"
					className="w-[15%] rounded-full bg-orange-300 mt-4"
				>
					{update ? "Update" : "Add"}
				</button>
				<button
					onClick={() => dispatch(getAllFields())}
					type="reset"
					className="w-[15%] rounded-full bg-orange-300 mt-4"
				>
					Reset
				</button>
			</Form>
		</>
	);
}

export default FieldForm;
