import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDepartments } from "../../actions/departmentAction";
import Logo from "../logo";
import IndexerOpenForm from "./indexerOpenForm";
import IndexingForm from "./indexingForm";

function AddDoc() {
	const [selectedDoctype, setSelectedDoctype] = useState("");
	const [selectedDepartment, setSelectedDepartment] = useState();
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getAllDepartments());
	}, []);
	const departments = useSelector(
		(state) => state.departmentReducer.departments
	);
	const getSelectedDep = (e) => {
		const dep = departments.find((d) => d.name === e.target.value);
		setSelectedDepartment(dep);
	};
	const handleDoctypeChange = (e) => {
		setSelectedDoctype(e.target.value);
	};
	return (
		<>
			<div className="row">
				<div className="col-2 h-screen border-r">
					<div className="w-full p-3 flex justify-center border-b">
						<Logo />
					</div>
				</div>
				<div className="col flex-row">
					<div className="shadow w-4/6 mt-4">
						<IndexerOpenForm
							getSelectedDep={getSelectedDep}
							onDoctypeChange={handleDoctypeChange}
						/>
					</div>
					<div className="mt-5">
						<IndexingForm
							selectedDepartment={selectedDepartment}
							selectedDoctype={selectedDoctype}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default AddDoc;
