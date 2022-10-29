import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllDocuments } from "../../actions/documentAction";
import Logo from "../logo";

function IndexerView() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getAllDocuments());
	}, []);
	let documents = [];
	documents = useSelector((state) => state.documentReducer.documents);

	documents = useSelector((state) => state.documentReducer.documents);
	// console.log("I am in documents.jsx");
	return (
		<>
			<div className="row">
				<div className="col-3 h-screen border-r">
					<div className="w-full p-3 flex justify-center border-b">
						<Logo />
					</div>
				</div>
				<div className="col">
					<div className="mt-4 mx-4">
						{documents.map((d) => (
							<div
								key={d._id}
								className="border-l-4 border-orange-400 px-3 h-[50px]  my-4  flex justify-center items-center justify-between"
							>
								<div>{d.name}</div>
								<div>{d.dcn}</div>
								<div>{d.doctype}</div>
								<div>{d.department}</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
}

export default IndexerView;
