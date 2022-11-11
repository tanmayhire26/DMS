import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { Badge } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";
import { getTagsByDoc } from "../../actions/customiseDocuments/tagAction";
import { getAllDocuments } from "../../actions/documentAction";
import AddComments from "./forms/addComments";
import AddTags from "./forms/addTags";
import ViewTags from "./views/viewTags";

export const guDocLoader = ({ params }) => {
	const documentId = params.id;
	return documentId;
};

export const CustomiseDocument = () => {
	const documentId = useLoaderData();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [imageSrc, setImageSrc] = useState("");
	const documents = useSelector((state) => state.documentReducer.documents);
	const document = documents.find((d) => d._id === documentId);

	useEffect(() => {
		dispatch(getAllDocuments());

		const document = documents.find((d) => d._id === documentId);
		setImageSrc(document.path.slice(14));
	}, []);

	//--------------------------CLOUDINARY-----------------------------------------------

	const cld = new Cloudinary({
		cloud: {
			cloudName: "dc4ioiozw",
		},
	});
	const myImage = cld.image(imageSrc.slice(0, -4));

	console.log(imageSrc.slice(0, -4));

	myImage.format(imageSrc.slice(-3));
	// Deliver as JPEG. */
	//myImage.resize(thumbnail().width(1000).height(1000))

	//--------------------------------------------------------------------------------------

	return (
		<>
			<div className="flex gap-4 m-3">
				<div className="flex-row h-screen w-2/6 shadow p-2">
					<div className="text-orange-500 font-bold">{document.name}</div>
					<div className="text-purple-500">{document.dcn}</div>
					<AddComments documentId={documentId} />
					<AddTags documentId={documentId} />
				</div>
				<div className="absolute right-[10%]">
					<ViewTags documentId={documentId} />
				</div>

				<div className="w-4/6 shadow flex justify-center p-2">
					<AdvancedImage cldImg={myImage} />
				</div>
			</div>
		</>
	);
};
