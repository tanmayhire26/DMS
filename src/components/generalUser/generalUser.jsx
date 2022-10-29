import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllDocuments } from "../../actions/documentAction";
import Logo from "../logo";

function GeneralUser() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	useEffect(() => {
		dispatch(getAllDocuments());
	}, []);

	const documents = useSelector((state) => state.documentReducer.documents);

	

	return (
		<>
			<div className="row">
				<div className="col-3 border-r h-screen flex justify-center">
					<div className="mt-5">
						<Logo />
					</div>
					<div className=""></div>
				</div>
				<div className="col">
					<div className="m-5">
						{documents.map((d) => (
							<div
								className="flex my-4 h-[50px] shadow px-4 justify-center items-center justify-between border-l-4 border-orange-400"
								key={d._id}
							>
								<div className="col">{d.name}</div>
								<div className="col">{d.dcn}</div>
								<div className="col">{d.doctype}</div>
								<div className="col">{d.department}</div>
								
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
}

export default GeneralUser;
