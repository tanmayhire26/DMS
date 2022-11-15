import { useForm } from "react-hook-form";
import { Form, useLoaderData, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDocuments, updateDocument } from "../../actions/documentAction";
import { getAllFields } from "../../actions/fieldAction";
import { getAllDoctypefields } from "../../actions/doctypefieldAction";
import { loadLogin } from "../../actions/loginAction";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { useState } from "react";

export function documentLoader({ params }) {
	const documentId = params.id;
	return documentId;
}
export function EditDoc() {
	const dispatch = useDispatch();
	const [imageSrc, setImageSrc] = useState("");
	const navigate = useNavigate();
	const documents = useSelector((state) => state.documentReducer.documents);
	const fields = useSelector((state) => state.fieldReducer.fields);
	const doctypefields = useSelector(
		(state) => state.doctypefieldReducer.doctypefields
	);
	const documentId = useLoaderData();
	console.log(documentId);
	const { register, setValue, handleSubmit } = useForm();

	//----------------------------------Find Field names,label and input type from indexing info-------------------------
	const document = documents.find((d) => d._id === documentId);
	const indexingInfo = document?.indexingInfo;
	let fieldsArr = [];
	let valuesArr = [];

	if (indexingInfo) {
		const keysArr = Object.keys(indexingInfo);
		for (let i = 0; i < keysArr.length; i++) {
			let tempDtf = doctypefields.find((dtf) => dtf._id === keysArr[i]);

			let tempFieldId = tempDtf?.field;
			let tempField = fields.find((f) => f._id === tempFieldId);

			let tempFieldName = fields.find((f) => f._id === tempField?._id)?.name;
			fieldsArr.push(tempFieldName);
		}

		valuesArr = Object.values(indexingInfo);
	}

	//-------------------------------------------------------------------------------------------------------------------

	useEffect(() => {
		dispatch(loadLogin());
		dispatch(getAllFields());

		dispatch(getAllDoctypefields());
	}, []);
	useEffect(() => {
		dispatch(getAllDocuments());
		if (!documentId) return;

		for (let i = 0; i < fieldsArr.length; i++) {
			setValue(`${fieldsArr[i]?.name}`, valuesArr[i]);
		}
	}, [documentId]);

	useEffect(() => {
		setImageSrc(document?.path);
	}, [document]);

	//----------------------------------Cloudinary----------------------------

	const cld = new Cloudinary({
		cloud: {
			cloudName: "dc4ioiozw",
		},
	});
	console.log(imageSrc?.slice(14));
	const myImage = cld.image(imageSrc?.slice(14));

	// console.log(imageSrc?.slice(0, -4));
	myImage.format(imageSrc?.slice(-3));
	//--------------------------------------------------------------------------

	const onSubmitHandler = (data) => {
		dispatch(updateDocument(data, documentId));
		navigate("/indexer");
		console.log(data, documentId);
	};
	return (
		<div className="flex">
			<div className="flex mt-[10%] ml-[10%]">
				<Form
					className="form flex-row shadow p-2"
					onSubmit={handleSubmit(onSubmitHandler)}
				>
					<div>
						{fieldsArr.map((f) => (
							<div>
								<label className="form-label" htmlFor={f?.name}>
									{f?.label}
									{f?.isRequired === true ? "*" : ""}
								</label>
								<input
									className="form-control"
									id={f?.name}
									type={f?.input}
									{...register(`${f?.name}`)}
								/>
							</div>
						))}
					</div>
					<button
						className="mt-4 w-full bg-orange-400 text-white font-bold rounded-full"
						type="submit"
					>
						Update
					</button>
				</Form>
			</div>
			<div className="m-[5%]  w-full shadow">
				<AdvancedImage cldImg={myImage} />
			</div>
		</div>
	);
}
