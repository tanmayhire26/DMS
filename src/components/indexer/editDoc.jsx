import { useForm } from "react-hook-form";
import { Form, useLoaderData, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDocuments } from "../../actions/documentAction";

export function documentLoader({ params }) {
	const documentId = params.id;
	return documentId;
}
export function EditDoc() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const documentId = useLoaderData();
	console.log(documentId);
	const { register, setValue, handleSubmit } = useForm();
	useEffect(() => {
		getAllDocuments();
		if (!documentId) return;
		const document = documents.find((d) => d._id === documentId);
	}, [documentId]);

	const documents = useSelector((state) => state.documentReducer.documents);
	const onSubmitHandler = (data) => {
		console.log(data);
	};
	return (
		<>
			<div className="flex justify-center items-center">
				<Form
					className="form flex-row"
					onSubmit={handleSubmit(onSubmitHandler)}
				>
					<label className="form-label">Some Label</label>
					<input className="" type="text" />
				</Form>
			</div>
		</>
	);
}
