import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCommentsByDoc } from "../../../actions/customiseDocuments/commentAction";

function ViewComments(props) {
	const { documentViewed, handleViewComments } = props;
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getCommentsByDoc(documentViewed._id));
	}, [documentViewed._id]);
	const comments = useSelector((state) => state.commentReducer.comments);

	return (
		<>
			<div className="p-2 flex-row shadow bg-slate-200 rounded ">
				<div className="font-bold text-lg">
					<svg
						onClick={handleViewComments}
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
							d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<span className="text-sm">Comments for {documentViewed.name}</span>
				</div>
				{comments.length !== 0 ? (
					<div className="h-3/6">
						{comments.map((c) => (
							<div className="text-xs">
								<span className="font-bold mr-2">{c.userName}:</span>
								{c.comment}
							</div>
						))}
					</div>
				) : (
					<div>No comments yet</div>
				)}
			</div>
		</>
	);
}

export default ViewComments;
