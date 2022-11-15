import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { focusOn } from "@cloudinary/transformation-builder-sdk/qualifiers/gravity";
import { thumbnail } from "@cloudinary/transformation-builder-sdk/actions/resize";
import { FocusOn } from "@cloudinary/transformation-builder-sdk/qualifiers/focusOn";

function CloudinaryImage(props) {
	const { imageSrc } = props;
	const cld = new Cloudinary({
		cloud: {
			cloudName: "dc4ioiozw",
		},
	});
	const myImage = cld.image(imageSrc.slice(0, -4));

	myImage.format(imageSrc.slice(-3));
	// Deliver as JPEG. */
	//myImage.resize(thumbnail().width(1000).height(1000))
	return (
		<>
			<AdvancedImage cldImg={myImage} />
		</>
	);
}

export default CloudinaryImage;
