import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../../actions/customiseDocuments/commentAction";
import jwt_decode from "jwt-decode";
function AddComments(props) {
	const { documentId } = props;
	const dispatch = useDispatch();
	const { register, handleSubmit } = useForm();

	//-----token--------

	const token = useSelector((state) => state.loginReducer.token);
	const decoded = jwt_decode(token);

	const onSubmitHandler = (data) => {
		console.log(data.comment);
		data["userId"] = decoded._id;
		data["userName"] = decoded.userName;
		data["documentId"] = documentId;
		dispatch(addComment(data));
	};

	return (
		<>
			<div className="mt-5 p-3">
				Add comments
				<form className="shadow p-2" onSubmit={handleSubmit(onSubmitHandler)}>
					<label htmlFor="comments" className="form-label">
						Comments :{" "}
					</label>
					<input
						type="text"
						className="form-control"
						id="comments"
						{...register("comment")}
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

export default AddComments;
