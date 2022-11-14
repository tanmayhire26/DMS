import { useRef, useState } from "react";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import BarChart from "./chartTypes/barChart";
import DoughnutChart from "./chartTypes/doughnutChart";

export const UsersStats = () => {
	const users = useSelector((state) => state.userReducer.users);
	const generalUsers = users.filter((u) => u.role === "General User");
	const indexers = users.filter((u) => u.role === "Indexer");

	//--Active users--
	const activeUsers = users.filter((u) => u.isActive === true);
	const inactiveUsers = users.filter((u) => u.isActive === false);

	//--create users data to show on chart---

	const UsersData = [
		{ id: 1, role: "General User", qty: generalUsers.length },
		{ id: 2, role: "Indexer", qty: indexers.length },
		{ id: 3, role: "Admin", qty: 1 },
	];
	const ActiveData = [
		{ id: 1, type: "Active Users", qty: activeUsers.length },
		{ id: 2, type: "Inactive Users", qty: inactiveUsers.length },
	];
	const [usersData, setUsersData] = useState({
		labels: UsersData.map((u) => u.role),
		datasets: [
			{
				label: "Number of users",
				data: UsersData.map((u) => u.qty),
				backgroundColor: ["red", "green", "blue"],
			},
		],
	});
	const [activeData, setActiveData] = useState({
		labels: ActiveData.map((u) => u.type),
		datasets: [
			{
				label: "Number of users",
				data: ActiveData.map((u) => u.qty),
				backgroundColor: ["Green", "Red"],
			},
		],
	});

	//_____________________________________________________________________________________________________________________________

	return (
		<>
			<div className="flex">
				<div className="">
					<div>Total Number of Users :{users.length} </div>
					<div>General Users:{generalUsers.length} </div>
					<div>Indexers :{indexers.length} </div>
					<div>Active Users: {activeUsers.length}</div>
					<div>Inactive Users: {inactiveUsers.length}</div>
				</div>

				<div className="mt-[10%] flex justify-center w-2/6">
					<DoughnutChart chartData={usersData} />
					<DoughnutChart chartData={activeData} />
				</div>
			</div>
		</>
	);
};
