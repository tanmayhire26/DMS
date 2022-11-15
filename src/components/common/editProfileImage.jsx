import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Form } from "react-router-dom";
import { changeProfileImage } from "../../actions/userAction";
import Register from "../register";
import ImageCreator from "./imageCreator";

function EditProfileImage(props) {
	const { userId, decoded, imageFromDb } = props;
	const { register, handleSubmit } = useForm();
	const [previewImage, setPreviewImage] = useState();
	const dispatch = useDispatch();
	const [view, setView] = useState(false);
	const [viewSelectedImage, setViewSelectedImage] = useState(false);
	const onSubmitHandler = (data) => {
		const profileImage = data.profileImage["0"];
		console.log(profileImage, userId);
		dispatch(changeProfileImage(profileImage, userId));
		setView(true);
	};

	const handleFileChange = (e) => {
		setPreviewImage(e.target.files[0]);
		setViewSelectedImage(true);

		const profile = document.querySelector("#profile");
		const blah = document.querySelector("#blah");
		const [file] = profile.files;
		if (file) {
			blah.src = URL.createObjectURL(file);
		}
	};
	return (
		<>
			<div className="">
				<div className="flex justify-center">
					<div className=" outline outline-2 outline-orange-300 w-[200px] h-[200px]">
						{viewSelectedImage === false ? (
							<ImageCreator
								height="200px"
								width="200px"
								imageFromDb={imageFromDb}
							/>
						) : (
							<img
								className="w-[200px] h-[200px]"
								id="blah"
								src=""
								alt="Document image"
							/>
						)}
					</div>
				</div>

				<div className="flex justify-center text-orange-500 font-bold">
					Hi {decoded.firstName}
				</div>
				<div className="flex justify-center text-red-500 font-bold">
					{decoded.role}
				</div>
				<div className="flex justify-center text-xs">{decoded.email}</div>

				{view === false ? (
					<Form
						className="mt-4 form"
						onSubmit={handleSubmit(onSubmitHandler)}
						encType="multipart/form-data"
					>
						<input
							{...register("profileImage")}
							name="profileImage"
							onChange={handleFileChange}
							id="profile"
							className="form-control"
							type="file"
						/>

						<button
							type="submit"
							className="mt-2 w-full rounded-full p-1 bg-orange-400 text-white font-bold"
						>
							Done
						</button>
					</Form>
				) : null}
			</div>
		</>
	);
}

export default EditProfileImage;
