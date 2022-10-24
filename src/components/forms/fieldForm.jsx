import { yupResolver } from "@hookform/resolvers/yup";
import { Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Form } from "react-router-dom";
import * as yup from "yup";

const schema = yup.object().shape({
	name: yup.string().required(),
	label: yup.string().required(),
	input: yup.string().required(),
});
function FieldForm() {
	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({ resolver: yupResolver(schema) });

	const onSubmitHandler = (data) => {
		//dispatch(addField(data));
	};
	return (
		<>
			<Form
				onSubmit={handleSubmit(onSubmitHandler)}
				className="shadow-lg p-3 backdrop-blur rounded flex flex-wrap justify-between"
			>
				<div className="flex-row">
					<label className="form-label" htmlFor="fname">
						Field Name*
					</label>
					<input id="fname" className="form-control" type="text" />
					{errors.name ? (
						<Alert severity="error">{errors.name?.message}</Alert>
					) : null}
				</div>
				<div className="flex-row">
					<label className="form-label" htmlFor="flabel">
						Field Label*
					</label>
					<input id="flabel" className="form-control" type="text" />
					{errors.label ? (
						<Alert severity="error">{errors.label?.message}</Alert>
					) : null}
				</div>
				<div className="flex-row">
					<label className="form-label" htmlFor="finput">
						Field Input Type*
					</label>
					<input id="finput" className="form-control" type="text" />
					{errors.input ? (
						<Alert severity="error">{errors.input?.message}</Alert>
					) : null}
				</div>
				<button className="self-center w-full mx-[30%]  p-1 rounded-full bg-orange-300 mt-3">
					Add Field
				</button>
			</Form>
		</>
	);
}

export default FieldForm;
