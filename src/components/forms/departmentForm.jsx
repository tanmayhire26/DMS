import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "semantic-ui-react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
	addDepartment,
	updateDepartment,
} from "../../actions/departmentAction";
import { useEffect } from "react";

const schema = yup.object().shape({
	name: yup.string().min(3).required(),
	departmentCode: yup.string().min(2).required(),
});

function DepartmentForm(props) {
	const { selectedDepartment } = props;
	const departmentId = selectedDepartment._id;

	const dispatch = useDispatch();
	const departments = useSelector(
		(state) => state.departmentReducer.departments
	);

	const onSubmitHandler = (data) => {
		if (data._id) {
			dispatch(updateDepartment(data));
			console.log("update department");
		} else {
			dispatch(addDepartment(data));
			console.log("added department");
		}
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
	} = useForm({ resolver: yupResolver(schema) });

	return (
		<body className="w-full">
			<div className="pb-4 pt-4 pl-6">
				<form onSubmit={handleSubmit(onSubmitHandler)}>
					<h5>Add Department</h5>
					<div className="flex">
						<div className="flex flex-wrap gap-4">
							<div className="w-[40%]">
								<label htmlFor="name" className="form-label">
									Department Name*
								</label>
								<input
									type="text"
									className="form-control"
									placeholder="Enter department name"
									id="name"
									{...register("name")}
								/>
							</div>

							<div className="w-[40%] ">
								<label htmlFor="code" className="form-label">
									Department code*
								</label>
								<input
									type="text"
									className="form-control"
									placeholder="Enter department code"
									id="code"
									{...register("departmentCode")}
								/>
							</div>
							<div className="w-[15%] absolute right-[15%]">
								<button
									type="submit"
									className="bg-orange-300 p-1 rounded w-[150%]"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										className="w-6 absolute"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
									Add Department
								</button>
							</div>
						</div>
						<div className="flex">
							<p className="text-danger">{errors.name?.message}</p>
							<p className="text-danger ml-[30%]">
								{errors.departmentCode?.message}
							</p>
						</div>
					</div>
				</form>
			</div>
		</body>
	);
}

export default DepartmentForm;
