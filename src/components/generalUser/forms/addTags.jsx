import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import { addTag } from "../../../actions/customiseDocuments/tagAction";
import { useEffect } from "react";
import {
	addTagName,
	getAllTagNames,
} from "../../../actions/customiseDocuments/tagNameAction";

function AddTags(props) {
	const dispatch = useDispatch();
	const { handleSubmit, register, setValue } = useForm();
	const { documentId } = props;

	useEffect(() => {
		dispatch(getAllTagNames());
	}, []);

	//-------tag Names-----------
	const tagNames = useSelector((state) => state.tagNameReducer.tagNames);
	//-----token--------

	const token = useSelector((state) => state.loginReducer.token);
	const decoded = jwt_decode(token);

	//--------------------ON SUBMIT HANDLER---------------------------
	const onSubmitHandler = (data) => {
		data["userId"] = decoded._id;
		data["documentId"] = documentId;
		console.log(data);
		dispatch(addTag(data));
		let count = 0;
		tagNames.forEach((tn) => {
			if (tn.name === data.tag) {
				count++;
			}
		});
		if (count === 0) dispatch(addTagName(data));
	};

	//-----------Handle Tag Click------------------
	const handleTagClick = (tn) => {
		setValue("tag", tn);
	};

	return (
		<>
			<div className="mt-5 p-3">
				Add Tags
				<div className="flex flex-wrap text-xs cursor-pointer">
					{tagNames.map((tn) => (
						<div
							onClick={() => handleTagClick(tn.name)}
							className="bg-indigo-500 text-white rounded-full p-1"
						>
							{tn.name}
						</div>
					))}
				</div>
				<form onSubmit={handleSubmit(onSubmitHandler)} className="shadow p-2">
					<label htmlFor="tags" className="form-label">
						Tag:{" "}
					</label>
					<input
						type="text"
						className="form-control"
						id="tags"
						{...register("tag")}
					/>
					<button
						type="submit"
						className="w-3/6 mt-2 rounded-full bg-orange-400 text-white"
					>
						Add
					</button>
				</form>
			</div>
		</>
	);
}

export default AddTags;
