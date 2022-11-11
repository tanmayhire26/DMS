import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTagNames } from "../../actions/customiseDocuments/tagNameAction";

import { getDocumentsByTag } from "../../actions/documentAction";

function CustomTagsSearch() {
	const dispatch = useDispatch();

	//-----------Get Tag names--------
	useEffect(() => {
		dispatch(getAllTagNames());
	}, []);
	const tagNames = useSelector((state) => state.tagNameReducer.tagNames);

	const handleTagClick = (tn) => {
		dispatch(getDocumentsByTag(tn));
	};

	return (
		<>
			<div className="text-xs">
				Search by Tags
				<div className="flex gap-1 flex-wrap">
					{tagNames.map((tn) => (
						<div
							onClick={() => handleTagClick(tn)}
							className="rounded-full bg-purple-500 p-1 text-white cursor-pointer"
						>
							{tn.name}
						</div>
					))}
				</div>
			</div>
		</>
	);
}

export default CustomTagsSearch;
