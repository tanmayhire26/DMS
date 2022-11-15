import { useEffect, useState } from "react";

function ImageCreator(props) {
	const { imageFromDb, height, width } = props;
	const [imageName, setImageName] = useState();

	useEffect(() => {
		if (imageFromDb) {
			function _arrayBufferToBase64(buffer) {
				var binary = "";
				var bytes = new Uint8Array(buffer);
				var len = bytes.byteLength;
				for (var i = 0; i < len; i++) {
					binary += String.fromCharCode(bytes[i]);
				}
				return window.btoa(binary);
			}
			const data = _arrayBufferToBase64(imageFromDb?.data.data);

			setTimeout(() => {
				setImageName(`data:${imageFromDb?.mimetype};base64,` + data);
			}, 100);
		}
	}, [imageFromDb]);
	return (
		<>
			<div className="">
				<img
					className={
						height ? "w-[200px] h-[200px]" : "w-[50px] h-[50px] rounded-full"
					}
					src={imageName}
					alt="profile pic"
				/>
			</div>{" "}
		</>
	);
}

export default ImageCreator;
