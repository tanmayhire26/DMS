import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	deleteTag,
	getTagsByDoc,
} from "../../../actions/customiseDocuments/tagAction";

function ViewTags(props) {
	const { documentId } = props;
	const dispatch = useDispatch();
	console.log(documentId);
	useEffect(() => {
		dispatch(getTagsByDoc(documentId));
	}, [documentId]);
	const tags = useSelector((state) => state.tagReducer.tags);

	const handleDelete = (t) => {
		console.log("delete", t.tag);
		dispatch(deleteTag(t._id));
	};
	return (
		<>
			<div className="flex">
				{tags.map((t) => (
					<div className="flex  bg-purple-500 text-white text-xs rounded-full pl-1 mr-1">
						{t.tag}
						<svg
							onClick={() => handleDelete(t)}
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-4 h-4"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</div>
				))}
			</div>
		</>
	);
}

export default ViewTags;
