import { useSelect } from "@mui/base";
import { Autocomplete, TextField } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDepartments } from "../../actions/departmentAction";
import { getAllFields } from "../../actions/fieldAction";
import { getAllDoctypes } from "../../actions/doctypeAction";
import { Form } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

const schema = yup.object().shape({
	docType: yup.string().required(),
	field: yup.string().required(),
	isRequired: yup.boolean().required(),
});

function DoctypefieldForm() {
	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		reset,
	} = useForm({ resolver: yupResolver(schema) });

	const onSubmitHandler = (data) => {
		console.log(data, "data in the submit handler");
		// if (data._id) {
		// 	dispatch(updateDoctypeField(data));
		// } else {
		// 	dispatch(addDoctypeField(data));
		// }
	};

	useEffect(() => {
		dispatch(getAllDepartments());
		dispatch(getAllDoctypes());
		dispatch(getAllFields());
	}, []);

	const departments = useSelector(
		(state) => state.departmentReducer.departments
	);
	const doctypes = useSelector((state) => state.doctypeReducer.doctypes);
	const fields = useSelector((state) => state.fieldReducer.fields);

	return (
		<>
			<Form
				onSubmit={handleSubmit(onSubmitHandler)}
				className="shadow-lg p-3 backdrop-blur rounded flex flex-wrap justify-between"
			>
				<div className="flex-row">
					<Autocomplete
						disablePortal
						id="combo-box-demo"
						options={departments}
						getOptionLabel={(option) => option.name}
						sx={{ width: 300 }}
						renderInput={(params) => <TextField {...params} label="Department" />}
					/>
					{/* {errors.department? (
						<Alert severity="error">{errors.department?.message}</Alert>
					) : null} */}
				</div>
				<div className="flex-row">
					<Autocomplete
						disablePortal
						id="combo-box-demo"
						options={doctypes}
						getOptionLabel={(option) => option.name}
						sx={{ width: 300 }}
						renderInput={(params) => <TextField {...params} label="Doctype" />}
					/>
					{/* {errors.doctype ? (
						<Alert severity="error">{errors.doctype?.message}</Alert>
					) : null} */}
				</div>
				<div className="flex-row">
					<Autocomplete
						disablePortal
						id="combo-box-demo"
						options={fields}
						getOptionLabel={(option) => option.name.name}
						sx={{ width: 300 }}
						renderInput={(params) => <TextField {...params} label="Field" />}
					/>
					{/* 					
					{errors.field ? (
						<Alert severity="error">{errors.field?.message}</Alert>
					) : null} */}
				</div>
				<div className="mt-2 w-full flex justify-center">
					<label className="form-label" htmlFor="req">
						Required?  
					</label><input type="checkbox" className="checkbox"/>
				</div>
				<button className="self-center w-full mx-[30%]  p-1 rounded-full bg-orange-300 mt-3">
					Add Doc Type Field
				</button>
			</Form>
		</>
	);
}

export default DoctypefieldForm;
