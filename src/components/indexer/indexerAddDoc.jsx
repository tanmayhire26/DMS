import { useState } from "react";
import Logo from "../logo";
import IndexerOpenForm from "./indexerOpenForm";
import IndexingForm from "./indexingForm";

function AddDoc() {
	const [selectedDoctype, setSelectedDoctype] = useState("");

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
						<IndexerOpenForm onDoctypeChange={handleDoctypeChange} />
					</div>
					<div className="mt-5">
						<IndexingForm selectedDoctype={selectedDoctype} />
					</div>
				</div>
			</div>
		</>
	);
}

export default AddDoc;
