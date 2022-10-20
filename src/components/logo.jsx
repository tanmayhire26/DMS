import { NavLink } from "react-router-dom";

function Logo() {
	return (
		<>
			<div className="">
				<NavLink to="/">
					<img src="/logo1.png" alt="DMS logo" />
				</NavLink>
			</div>
		</>
	);
}

export default Logo;
