import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDepartments } from "../../actions/departmentAction";
import { getAllDoctypes } from "../../actions/doctypeAction";
import { loadLogin } from "../../actions/loginAction";

function FilterList(props) {
	const {
		departments,
		handleDepClick,
		handleDTClick,
		handleSearch,
		doctypes,
		doctypefieldsReq,
		selectedDepartment,
		selectedDoctype,
	} = props; //these are departmentsIds
	//const departmentNames = ["Engineering", "Human Resource"];
	//let [doctypes, setDoctypes] = useState([]);
	const [isLabelClicked, setIsLabelClicked] = useState(false);
	const [selectedDtf, setSelectedDtf] = useState(""); //-----------should store id of selected doc type field in the search area of filter llist
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(loadLogin());
		dispatch(getAllDepartments());
		dispatch(getAllDoctypes());
	}, []);

	//let's get departments as objects from state
	const departmentObjects = useSelector(
		(state) => state.departmentReducer.departments
	);
	//let's get all doctypes as objects from db
	const doctypeObjects = useSelector((state) => state.doctypeReducer.doctypes);
	let departmentNames = []; //array of department names of the logged in user

	//let's get names of the departmetns of the user

	for (let i = 0; i < departments.length; i++) {
		const obj = departmentObjects.find((d) => d._id === departments[i]);
		departmentNames.push(obj?.name);
	}

	//let's handleLabelClick to view the input field of the clicked label

	const handleLabelClick = (dtf) => {
		isLabelClicked ? setIsLabelClicked(false) : setIsLabelClicked(true);
		setSelectedDtf(dtf._id);
	};

	return (
		<>
			<div className="my-5">
				<ul>
					<p className="text-purple-600">Department</p>
					<li
						onClick={() => handleDepClick("All")}
						className="mt-3 w-3/6 rounded-full flex justify-center outline outline-2 outline-offset-2 outline-purple-500"
					>
						All
					</li>
					{departmentNames.map((d) => (
						<li
							onClick={() => handleDepClick(d)}
							className={
								d === selectedDepartment
									? "bg-purple-300 mt-3 w-4/6 rounded-full flex justify-center outline outline-2 outline-offset-2 outline-orange-500"
									: "hover:bg-purple-300 mt-3 w-4/6 rounded-full flex justify-center outline outline-2 outline-offset-2 outline-orange-500"
							}
							// className="hover:bg-purple-300 mt-3 w-4/6 rounded-full flex justify-center outline outline-2 outline-offset-2 outline-orange-500"
						>
							{d}
						</li>
					))}
				</ul>
			</div>
			<div className="my-5">
				<ul>
					<p className="text-purple-600">Document Type</p>
					<li
						onClick={() => handleDTClick("All")}
						className="hover:bg-purple-300 active:bg-purple-500 active:text-white mt-3 w-3/6 rounded-full flex justify-center outline outline-2 outline-offset-2 outline-purple-500"
					>
						All
					</li>
					{doctypes.map((d) => (
						<li
							onClick={() => handleDTClick(d)}
							className={
								d === selectedDoctype
									? "bg-purple-300 mt-3 w-4/6 rounded-full flex justify-center outline outline-2 outline-offset-2 outline-orange-500"
									: "hover:bg-purple-300 mt-3 w-4/6 rounded-full flex justify-center outline outline-2 outline-offset-2 outline-orange-500"
							}
							// className="hover:bg-purple-300 active:bg-purple-500 active:text-white mt-3 w-5/6 rounded-full flex justify-center outline outline-2 outline-offset-2 outline-orange-500"
						>
							{d.name}
						</li>
					))}
				</ul>

				<div className="mt-5 flex-row">
					<p className="font-bold">Search by fields</p>
					{doctypefieldsReq.map((dtf) => (
						<div className="flex">
							<label
								onClick={() => handleLabelClick(dtf)}
								htmlFor={dtf.fieldObj.name.name}
								className=" my-3 ml-1 w-2/6 rounded outline outline-2 outline-offset-2 outline-red-500"
							>
								{dtf.fieldObj.name.label}
							</label>
							<div>
								{isLabelClicked && dtf._id === selectedDtf ? (
									<input
										onChange={(e) => handleSearch(e, dtf)}
										id={dtf.fieldObj.name.name}
										className="form-control"
										type={dtf.fieldObj.name.input}
									/>
								) : null}
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
}

export default FilterList;
