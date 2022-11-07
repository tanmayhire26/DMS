import { yupResolver } from "@hookform/resolvers/yup";
import { CloudinaryContext } from "cloudinary-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Form, useNavigate } from "react-router-dom";
import { Image } from "semantic-ui-react";
import { getAllDoctypes } from "../../actions/doctypeAction";
import { getAllDoctypefields } from "../../actions/doctypefieldAction";
import { addDocument, getPreview } from "../../actions/documentAction";
import { getAllFields } from "../../actions/fieldAction";
import { loadLogin } from "../../actions/loginAction";

//---------------------------CLOUDINARY IMPORTS------------------------------------
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import axios from "axios";

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

	console.log(imageName.slice(0, -4));
	myImage.format(imageName.slice(-3)); // Deliver as JPEG. */
	//---------------------------------------------------------------------------------------------
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

	for (let m = 0; m < reqFields.length; m++) {
		reqFields[m]["isRequired"] = reqDoctypefields[m].isRequired;
	}

	const onSubmitHandler = (data) => {
		const depcodeToDispatch = selectedDepartment.departmentCode;
		let sensitive = data.sensitive;
		let indexingInfo = data;
		delete indexingInfo["newPath"];

		delete indexingInfo["sensitive"];

		let newIndexingInfo = {};
		let valuesArr = Object.values(indexingInfo);
		const selectedDoctypeObject = doctypes.find(
			(d) => d._id === selectedDoctype
		);

		for (let i = 0; i < valuesArr.length; i++) {
			newIndexingInfo[`${reqDoctypefieldIds[i]}`] = valuesArr[i];
		}

		const pathToDispatch = "D://../public/" + imageName;
		console.log(imageName);
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
				selectedDoctypeObject,
				sensitive
			)
		);
		navigate("/indexer/indexerView");
	};
	const onFileSubmitHandler = (data) => {
		newImgSrc = data.newPath[0].name;
		setImageName(newImgSrc);
		console.log("in file submit handler", newImgSrc);
		dispatch(getPreview(newImgSrc));
	};

	//--------------------------- Multer Trial -----------------------------------------
	let [profileImg, setProfileImg] = useState();

	const onFileChange = (e) => {
		console.log(e.target.files[0]);
		setProfileImg(e.target.files[0]);

		const imgInp = document.querySelector("#imgInp");
		const blah = document.querySelector("#blah");
		const [file] = imgInp.files;
		if (file) {
			blah.src = URL.createObjectURL(file);
		}
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("profileImg", profileImg);
		axios
			.post("http://localhost:5000/api/uploadImages", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.then((res) => {
				console.log(res);
			});
	};

	return (
		<>
			{reqFields.length !== 0 ? (
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

							{/* <input
							//onChange={handleFileChange}
							type="file"
							name="image"
							id="upload"
							{...register("path")} */}
							{/* /> */}
							<label htmlFor="sens">Sensitive</label>
							<input id="sens" type="checkbox" {...register("sensitive")} />
							<button
								className="p-2 bg-orange-400 text-white rounded-xl"
								type="submit"
							>
								Submit Document
							</button>
						</Form>
					</div>
					<div className="w-3/6 shadow">
						<Form
							className="w-full form m-3"
							onSubmit={handleSubmit(onFileSubmitHandler)}
						>
							<label htmlFor="upload" className="form-label">
								Select document
							</label>
							<input
								type={"file"}
								id="upload"
								name="image"
								className="form-control"
								{...register("newPath")}
							/>
							<button
								type="submit"
								className=" p-1 rounded mt-3 bg-orange-400 text-white"
							>
								Open document
							</button>
						</Form>
						{/* <img
						src={`https://res.cloudinary.com/dc4ioiozw/image/upload/v1667567709/${imageName}`}
						alt={imageName}
					/> */}

						<AdvancedImage cldImg={myImage} />
					</div>
				</div>
			) : null}

			<div className="container">
				<div className="row">
					<form onSubmit={onSubmit} encType="multipart/form-data">
						<div className="form-group">
							<input type="file" onChange={onFileChange} id="imgInp" />
						</div>
						<div className="form-group">
							<button className="btn btn-primary" type="submit">
								open Document
							</button>
						</div>
						<img id="blah" src="#" alt="your image" />
					</form>
				</div>
			</div>
		</>
	);
}

export default IndexingForm;
