import { useState } from "react";
import LineChart from "./chartTypes/lineChart";

export const CumulativeDocuments = ({ documents }) => {
	let dwDocLengths = [];
	let cumSum = 0;

	//to get cumulative number of documents foir every julian day derived from the unuique dcn number of the document
	for (let i = 0; i < 150; i++) {
		let s = documents.filter((d) => d.dcn.slice(4, 7) == i + 214).length;
		cumSum = cumSum + s;
		dwDocLengths.push(cumSum);
	}
	let CData = [];

	for (let i = 0; i < 150; i++) {
		let cd = {};
		cd["id"] = i;
		cd["julianDay"] = i + 214;
		cd["qty"] = dwDocLengths[i];
		CData.push(cd);
	}

	const [cData, setCData] = useState({
		labels: CData.map((u) => u.julianDay),
		datasets: [
			{
				label: "Number of Documents Indexed per day ",
				data: CData.map((u) => u.qty),
				backgroundColor: ["orange"],
			},
		],
	});

	return <>
    <LineChart chartData={cData} />
    </>;
};
