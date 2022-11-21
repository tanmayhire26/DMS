import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { Button, Form, Input } from "semantic-ui-react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
	addDepartment,
	getAllDepartments,
	updateDepartment,
} from "../../actions/departmentAction";
import { useEffect } from "react";
import { Alert } from "@mui/material";
import Department from "../department";

const schema = yup.object().shape({
	name: yup.string().min(3).required(),
	departmentCode: yup.string().min(4).max(4).required(),
});

function DepartmentForm(props) {
	const { selectedDepartment, handleDepSearch, update, setUpdate } = props;

	const departmentId = selectedDepartment._id;
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const departments = useSelector(
		(state) => state.departmentReducer.departments
	);

	const onSubmitHandler = (data) => {
		if (data._id) {
			dispatch(updateDepartment(data));

			reset();
			setUpdate(false);
		} else {
			dispatch(addDepartment(data));
			reset();
		}
		dispatch(getAllDepartments());
	};

	useEffect(() => {
		if (!departmentId) return;
		const department = departments.find((d) => d._id === departmentId);
		setValue("name", department.name);
		setValue("departmentCode", department.departmentCode);
		setValue("_id", department._id);
	}, departmentId);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		reset,
	} = useForm({ resolver: yupResolver(schema) });

	return (
		<body className="">
			<h6 className="">
				{update ? "Update Department" : "Add or Search Department"}
			</h6>
			<Form onSubmit={handleSubmit(onSubmitHandler)} className="p-3 shadow">
				<div className="flex">
					<div className="flex flex-wrap gap-4">
						<div className="flex gap-4">
							<div className="w-[50%]">
								<label htmlFor="name" className="form-label ">
									Department Name*
								</label>
								<input
									type="text"
									className="form-control outline outline-2 outline-orange-400"
									placeholder="Enter/Search department name"
									id="name"
									{...register("name")}
									onChange={handleDepSearch}
								/>
								{errors.name ? (
									<Alert severity="error">{errors.name?.message}</Alert>
								) : null}
							</div>

							<div className="w-[50%] ">
								<label htmlFor="code" className="form-label ">
									Department code*
								</label>
								<input
									type="text"
									className="form-control outline outline-2 outline-orange-400"
									placeholder="Enter department code"
									id="code"
									{...register("departmentCode")}
								/>
								{errors.departmentCode ? (
									<Alert severity="error">
										{errors.departmentCode?.message}
									</Alert>
								) : null}
							</div>
						</div>
						<div className="flex w-full">
							<button
								type="submit"
								className="w-full rounded-full bg-orange-300"
							>
								{update ? "Update" : "Add"}
							</button>
							<button
								onClick={() => dispatch(getAllDepartments())}
								type="reset"
								className="w-full ml-2 rounded-full bg-orange-300"
							>
								Reset
							</button>
						</div>
					</div>
				</div>
			</Form>
		</body>
	);
}

export default DepartmentForm;
