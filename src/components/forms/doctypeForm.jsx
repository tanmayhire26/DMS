import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-router-dom";
import * as yup from "yup";
import { getAllDepartments } from "../../actions/departmentAction";
import { addDoctype, updateDoctype } from "../../actions/doctypeAction";

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

	return (
		<body className="w-full">
			<div className="pb-4 pt-4 pl-6">
				<Form onSubmit={handleSubmit(onSubmitHandler)}>
					<h5>Add Document type</h5>
					<div className="flex flex-wrap gap-3">
						<div>
							<label htmlFor="doc" className="form-label">
								Doc Type*
							</label>
							<input
								type="text"
								className="form-control"
								id="doc"
								placeholder="Enter Doc type"
								{...register("name")}
							/>
						</div>
						<div>
							<label htmlFor="dep" className="form-label">
								Department*
							</label>
							<select
								className="w-full form-select"
								id="dep"
								placeholder="Select a department"
								{...register("department")}
							>
								{departments.map((d) => (
									<option key={d._id} value={d.name}>
										{d.name}
									</option>
								))}
							</select>
						</div>
						<div>
							<label htmlFor="code" className="form-label">
								Doc Type code*
							</label>
							<input
								type="text"
								className="form-control"
								{...register("docTypeCode")}
								placeholder="Enter Doc Type code"
							/>
						</div>
						<div className="mt-[3%]">
							<button
								type="submit"
								className="bg-orange-300 rounded p-1 w-[150%]"
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
								</svg>{" "}
								Add doc Type
							</button>
						</div>
					</div>
				</Form>
			</div>
		</body>
	);
}

export default DoctypeForm;
