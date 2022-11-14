import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDepartments } from "../../actions/departmentAction";
import DoughnutChart from "./chartTypes/doughnutChart";

export const DepartmentDocChart = ({ documents }) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getAllDepartments());
	}, []);
	const departments = useSelector(
		(state) => state.departmentReducer.departments
	);

	let departmentNames = [];

	departments.forEach((element) => {
		departmentNames.push(element.name);
	});

	let docLengths = [];

	for (let i = 0; i < departmentNames.length; i++) {
		let dep = departmentNames[i];
		let depLength = documents.filter((d) => d.department === dep).length;
		docLengths.push(depLength);
	}
	let DepData = [];

	for (let i = 0; i < departmentNames.length; i++) {
		let dd = {};
		dd["id"] = i + 1;
		dd["department"] = departmentNames[i];
		dd["qty"] = docLengths[i];
		DepData.push(dd);
	}
	const [depData, setDepData] = useState({
		labels: DepData.map((u) => u.department),
		datasets: [
			{
				label: "No. of documents wrt departments",
				data: DepData.map((u) => u.qty),
				backgroundColor: [
					"red",
					"green",
					"blue",
					"orange",
					"yellow",
					"purple",
					"black",
					"pink",
					"cyan",
				],
			},
		],
	});

	return (
		<>
			<DoughnutChart chartData={depData} />
		</>
	);
};
