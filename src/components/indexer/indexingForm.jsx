import { yupResolver } from "@hookform/resolvers/yup";
import { CloudinaryContext } from "cloudinary-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Form, useNavigate } from "react-router-dom";
import { Image } from "semantic-ui-react";
import { getAllDoctypes } from "../../actions/doctypeAction";
import { getAllDoctypefields } from "../../actions/doctypefieldAction";
import {
	addDocument,
	getAllDocuments,
	getPreview,
} from "../../actions/documentAction";
import { getAllFields } from "../../actions/fieldAction";
import { loadLogin } from "../../actions/loginAction";

//---------------------------CLOUDINARY IMPORTS------------------------------------
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import axios from "axios";
import { patchDocumentImage } from "../../actions/indxerAction";

function IndexingForm(props) {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { selectedDoctype, selectedDepartment } = props;
	const { handleSubmit, register } = useForm();
	let newImgSrc = "";
	let [imageName, setImageName] = useState("");
	let reqDoctypefields = []; //array of doctypefield objects
	let reqDoctypefieldIds = []; //array of doctypefield ids
	let reqFieldsIds = []; //array of fieldIds
	let reqFields = []; //array of field name objects
	useEffect(() => {
		// dispatch(loadLogin());
		//dispatch(getPreview(imageName));
		dispatch(getAllDoctypefields());
		dispatch(getAllFields());
		dispatch(getAllDoctypes());
	}, []);

	//--------------------------CLOUDINARY-----------------------------------------------
	let imagePath = "";
	let imagePathTemp = useSelector((state) => state.documentReducer.path);
	const cld = new Cloudinary({
		cloud: {
			cloudName: "dc4ioiozw",
		},
	});
	if (imagePathTemp) imagePath = imagePathTemp;
	let myImage = cld.image(imageName.slice(0, -4));

	myImage.format(imageName.slice(-3));
	//---------------------------------------------------------------------------------------------
	const doctypes = useSelector((state) => state.doctypeReducer.doctypes);
	const doctypefields = useSelector(
		(state) => state.doctypefieldReducer.doctypefields
	);
	const fields = useSelector((state) => state.fieldReducer.fields);

	reqDoctypefields = doctypefields.filter(
		(dtf) => dtf.docType === selectedDoctype
	);

	for (let i = 0; i < reqDoctypefields.length; i++) {
		reqFieldsIds.push(reqDoctypefields[i].field);
	}

	for (let j = 0; j < reqFieldsIds.length; j++) {
		reqFields.push(fields.find((f) => f._id === reqFieldsIds[j]));
	}

	for (let k = 0; k < reqDoctypefields.length; k++) {
		reqDoctypefieldIds.push(reqDoctypefields[k]._id);
	}

	for (let m = 0; m < reqFields.length; m++) {
		reqFields[m]["isRequired"] = reqDoctypefields[m].isRequired;
	}
	const [documentImageToPatch, setDocumentImageToPatch] = useState({});
	const documents = useSelector((state) => state.documentReducer.documents);

	const onSubmitHandler = (data) => {
		const depcodeToDispatch = selectedDepartment.departmentCode;
		let sensitive = data.sensitive;
		let documentImage = data.documentImage["0"];
		setImageName(documentImage.name);
		let indexingInfo = data;

		delete indexingInfo["documentImage"];
		delete indexingInfo["sensitive"];

		let newIndexingInfo = {};
		let valuesArr = Object.values(indexingInfo);
		const selectedDoctypeObject = doctypes.find(
			(d) => d._id === selectedDoctype
		);

		for (let i = 0; i < valuesArr.length; i++) {
			newIndexingInfo[`${reqDoctypefieldIds[i]}`] = valuesArr[i];
		}

		const pathToDispatch = "D://../public/" + documentImage.name;

		const name =
			documentImage.name.slice(0, imageName.length - 4) +
			"_" +
			doctypes.find((dt) => dt._id === selectedDoctype).docTypeCode;

		dispatch(
			addDocument(
				newIndexingInfo,
				pathToDispatch,
				depcodeToDispatch,
				name,
				selectedDoctypeObject,
				sensitive,
				documentImage
			)
		);

		//set to view the option to send the image to db as buffer
		setDocumentImageToPatch(documentImage);
		setViewSTD(true);
		
	};

	//--------------After submitting - indexer will get option to send the file to db as buffer----
	const [viewSTD, setViewSTD] = useState(false);

	const handleClick = () => {
		console.log("storing...");
		dispatch(getAllDocuments());

		const docToPatch = documents[documents.length - 1];
		dispatch(patchDocumentImage(docToPatch._id, documentImageToPatch));
		navigate("/indexer/indexerView");
	};
	//--------------------------- Multer Trial -----------------------------------------

	//---------------Preview file on selecting the file in indexing form--------------
	let [profileImg, setProfileImg] = useState();

	const onFileChange = (e) => {
		setProfileImg(e.target.files[0]);

		const imgInp = document.querySelector("#imgInp");
		const blah = document.querySelector("#blah");
		const [file] = imgInp.files;
		if (file) {
			blah.src = URL.createObjectURL(file);
		}
	};

	//_____________________________________________________________________________________________________________________________

	return (
		<>
			{viewSTD ? (
				<div className="z-50 py-4 flex justify-center items-center shadow bg-slate-200 w-2/6 fixed left-[50%] top-[60%]">
					<svg
						onClick={() => {
							setViewSTD(false);
							navigate("/indexer/indexerView");
						}}
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>

					<button
						className="p-1 rounded-full bg-orange-400 text-white"
						onClick={handleClick}
					>
						Store in Database
					</button>
				</div>
			) : null}
			{reqFields.length !== 0 ? (
				<div className="w-full flex gap-4">
					<div className="w-3/6 shadow">
						<Form
							onSubmit={handleSubmit(onSubmitHandler)}
							className="form p-3 w-full flex flex-wrap gap-5"
							encType="multipart/form-data"
						>
							{reqFields.map((rf) => (
								<div key={rf._id} className="">
									<label className="form-label" htmlFor={rf.name.name}>
										{rf.name.label}
										{rf.isRequired === true ? "*" : ""}
									</label>
									<input
										{...register(`${rf.name.name}`)}
										type={rf.name.input}
										className="form-control"
										id={rf.name.name}
										required={rf.isRequired}
									/>
								</div>
							))}

							<label htmlFor="sens">Sensitive</label>
							<input id="sens" type="checkbox" {...register("sensitive")} />
							<div className="form-group">
								<label htmlFor="imgInp" className="form-label">
									Select document
								</label>
								<input
									className="form-control"
									type="file"
									{...register("documentImage")}
									onChange={onFileChange}
									id="imgInp"
									name="documentImage"
								/>
							</div>
							<button
								className="p-1 w-full bg-orange-400 text-white rounded-full"
								type="submit"
							>
								Submit Document
							</button>
						</Form>
					</div>
					<div className="w-3/6 shadow">
						<img id="blah" src="" alt="Document image" />
					</div>
				</div>
			) : null}
		</>
	);
}

export default IndexingForm;
