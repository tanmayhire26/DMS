import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDocuments } from "../../actions/documentAction";
import BarChart from "./chartTypes/barChart";
import LineChart from "./chartTypes/lineChart";

export const DocumentsStats = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getAllDocuments());
	}, []);
	const documents = useSelector((state) => state.documentReducer.documents);
	let doclengths = [];
	for (let i = 0; i < 7; i++) {
		let dlengths = documents.filter(
			(d) => new Date(d.date).getDay() === i
		).length;
		doclengths.push(dlengths);
	}
	const days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	let DaysData = [];

	for (let i = 0; i < 7; i++) {
		let dd = {};
		dd["id"] = i + 1;
		dd["day"] = days[i];
		dd["qty"] = doclengths[i];
		DaysData.push(dd);
	}
	console.log(DaysData);
	const [daysData, setDaysData] = useState({
		labels: DaysData.map((u) => u.day),
		datasets: [
			{
				label: "Number of Documents per day of week",
				data: DaysData.map((u) => u.qty),
				backgroundColor: [
					"red",
					"green",
					"blue",
					"orange",
					"yellow",
					"purple",
					"black",
				],
			},
		],
	});
	return (
		<>
			<div className=" bg-red h-screen">
				Total Number of Documents : {documents.length}
				<div className="w-3/6">
					<BarChart chartData={daysData} />
					<LineChart chartData={daysData} />
				</div>
			</div>
		</>
	);
};
