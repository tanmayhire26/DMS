import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Form, useNavigate } from "react-router-dom";
import { getAllDoctypes } from "../../actions/doctypeAction";
import { getAllDoctypefields } from "../../actions/doctypefieldAction";
import { addDocument } from "../../actions/documentAction";
import { getAllFields } from "../../actions/fieldAction";

function IndexingForm(props) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { selectedDoctype, selectedDepartment } = props;
	const { handleSubmit, register } = useForm();
	let [imageName, setImageName] = useState();
	let reqDoctypefields = []; //array of doctypefield objects
	let reqDoctypefieldIds = []; //array of doctypefield ids
	let reqFieldsIds = []; //array of fieldIds
	let reqFields = []; //array of field names
	useEffect(() => {
		dispatch(getAllDoctypefields());
		dispatch(getAllFields());
		dispatch(getAllDoctypes());
	}, []);
	const doctypes = useSelector((state) => state.doctypeReducer.doctypes);
	const doctypefields = useSelector(
		(state) => state.doctypefieldReducer.doctypefields
	);
	const fields = useSelector((state) => state.fieldReducer.fields);
	//console.log("slecterd doctype :", selectedDoctype);

	reqDoctypefields = doctypefields.filter(
		(dtf) => dtf.docType === selectedDoctype
	);
	//console.log("Required doctypefields are : ", reqDoctypefields);

	for (let i = 0; i < reqDoctypefields.length; i++) {
		reqFieldsIds.push(reqDoctypefields[i].field);
	}

	for (let j = 0; j < reqFieldsIds.length; j++) {
		reqFields.push(fields.find((f) => f._id === reqFieldsIds[j]));
	}

	for (let k = 0; k < reqDoctypefields.length; k++) {
		reqDoctypefieldIds.push(reqDoctypefields[k]._id);
	}
	//console.log("Aray of req field objects : ", reqFields);
	const onSubmitHandler = (data) => {
		const depcodeToDispatch = selectedDepartment.departmentCode;

		let indexingInfo = data;
		delete indexingInfo["newPath"];
		let newIndexingInfo = {};
		let valuesArr = Object.values(indexingInfo);
		const selectedDoctypeObject = doctypes.find(
			(d) => d._id === selectedDoctype
		);

		for (let i = 0; i < valuesArr.length; i++) {
			newIndexingInfo[`${reqDoctypefieldIds[i]}`] = valuesArr[i];
		}

		const pathToDispatch = "D://../public/" + imageName;
		const name =
			imageName.slice(0, imageName.length - 4) +
			"_" +
			doctypes.find((dt) => dt._id === selectedDoctype).name;
		console.log(
			"indexing info: ",
			newIndexingInfo,
			pathToDispatch,
			depcodeToDispatch,
			name
		);
		dispatch(
			addDocument(
				newIndexingInfo,
				pathToDispatch,
				depcodeToDispatch,
				name,
				selectedDoctypeObject
			)
		);
		navigate("/indexer/indexerView");
	};
	const onFileSubmitHandler = (data) => {
		const newImgSrc = data.newPath[0].name;
		console.log("in file submit handler", newImgSrc);
		setImageName(newImgSrc);
	};

	return (
		<>
			<div className="w-full flex gap-4">
				<div className="w-3/6 shadow">
					<Form
						onSubmit={handleSubmit(onSubmitHandler)}
						className=" p-3 w-full flex flex-wrap gap-5"
						encType="multipart/form-data"
					>
						{reqFields.map((rf) => (
							<div key={rf._id} className="">
								<label className="form-label" htmlFor={rf.name.name}>
									{rf.name.label}
								</label>
								<input
									{...register(`${rf.name.name}`)}
									type={rf.name.input}
									className="form-control"
									id={rf.name.name}
								/>
							</div>
						))}

						{/* <input
							onChange={handleFileChange}
							type="file"
							name="image"
							id="upload"
							{...register("path")}
						/> */}
						<button
							className="p-2 bg-orange-300 text-white rounded-full"
							type="submit"
						>
							Submit Document
						</button>
					</Form>
				</div>
				<div className="w-3/6 shadow">
					<Form
						className="w-full form"
						onSubmit={handleSubmit(onFileSubmitHandler)}
					>
						<label htmlFor="upload">Select document</label>
						<input
							type={"file"}
							id="upload"
							name="image"
							{...register("newPath")}
						/>
						<button type="submit" className="bg-orange-600 text-white">
							Open document
						</button>
					</Form>
					<img src={`/${imageName}`} alt="document preview" />
				</div>
			</div>
		</>
	);
}

export default IndexingForm;
