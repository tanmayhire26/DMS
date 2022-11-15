import { data } from "autoprefixer";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "semantic-ui-react";
import { addIndexer, getAllIndexers } from "../../actions/indxerAction";
import { Document } from "react-pdf";
function IndexerProfile(props) {
	const { handleSubmit, register, setValue } = useForm();
	const dispatch = useDispatch();
	const [imageName, setImageName] = useState();
	useEffect(() => {
		dispatch(getAllIndexers());
	}, []);
	const indexers = useSelector((state) => state.indexerReducer.indexers);

	if (indexers[1]) {
		function _arrayBufferToBase64(buffer) {
			var binary = "";
			var bytes = new Uint8Array(buffer);
			var len = bytes.byteLength;
			for (var i = 0; i < len; i++) {
				binary += String.fromCharCode(bytes[i]);
			}
			return window.btoa(binary);
		}
		const data = _arrayBufferToBase64(indexers[1]?.profileImage.data.data);
		setTimeout(() => {
			setImageName(`data:${indexers[1].profileImage?.mimetype};base64,` + data);
		}, 100);
	}

	//----------image----------

	const onSubmitHandler = (data) => {
		console.log(data.image[0].name);
		let imageData = data.image["0"];
		delete data["image"];
		data["image"] = imageData;
		dispatch(addIndexer(data));
	};

	//------image from Buffer------

	//---------Binary to Array buffer to pdf--------------

	const pdfUser = indexers[2];
	const pdfdata = pdfUser?.profileImage.data;
	let len = pdfdata?.length;
	let bytes = new Uint8Array(len);
	for (let i = 0; i < len; i++) {
		bytes[i] = pdfdata?.charCodeAt(i);
	}

	const renderPdf = bytes.buffer;

	console.log(pdfdata);

	return (
		<>
			<div className=""></div>
			<div>
				<div className="flex justify-center items-center my-3">
					<img
						className="shadow"
						// src={require(`../../../../../BackEnd/Document-management/indexerImages/${imageName}`)}
						src={imageName}
						alt={"Carlie Anglemire"}
					/>
				</div>
				<Form
					onSubmit={handleSubmit(onSubmitHandler)}
					encType="multipart/form-data"
				>
					<Form.Field className="flex justify-around">
						<label>First Name</label>
						<input placeholder="First Name" {...register("firstName")} />
					</Form.Field>
					<Form.Field className="flex justify-around">
						<label>Last Name</label>
						<input placeholder="Last Name" {...register("lastName")} />
					</Form.Field>
					<Form.Field className="flex justify-around">
						<label>Edit Photo</label>
						<input type="file" name="image" {...register("image")} />
					</Form.Field>
					<Button
						type="submit"
						className=" w-full bg-purple-500 rounded-full text-white"
					>
						Submit
					</Button>
				</Form>
			</div>
			<Document file={renderPdf} scale={1.3} pages={Infinity} />
		</>
	);
}

export default IndexerProfile;
