import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Form, useNavigate } from "react-router-dom";
import { editDocumentImage } from "../../actions/documentAction";
import { patchDocumentImage } from "../../actions/indxerAction";

function EditDocumentImage(props) {
	const { documentId } = props;
	const [view, setView] = useState(false);
	const [docImageToPatch, setDocImageToPatch] = useState();
	const { register, handleSubmit } = useForm();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const onSubmitHandler = (data) => {
		let documentImage = data.documentImage["0"];
		setDocImageToPatch(documentImage);
		dispatch(editDocumentImage(documentImage, documentId));
		setView(true);
	};

	// const handleFileChange = (e) => {
	// 	console.log(e.target.files[0]);
	// };

	const handleClick = () => {
		dispatch(patchDocumentImage(documentId, docImageToPatch));
		setView(false);
	};
	return (
		<>
			<Form
				onSubmit={handleSubmit(onSubmitHandler)}
				className="form"
				encType="multipart/form-data"
			>
				<input
					id="profile"
					className="form-control w-2/6"
					type="file"
					name="documentImage"
					{...register("documentImage")}
				/>
				<button
					type="submit"
					className="w-3/6 mt-2 bg-orange-400 rounded-full text-white font-bold"
				>
					Upload
				</button>
			</Form>
			{view ? (
				<div>
					(
					<svg
						onClick={() => setView(false)}
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
					<div className="py-2">
						<button
							onClick={handleClick}
							className="absolute left-[70%] top-[40%] bg-orange-400 rounded-full text-white font-bold"
						>
							Store in Database
						</button>
					</div>
				</div>
			) : null}
		</>
	);
}

export default EditDocumentImage;
