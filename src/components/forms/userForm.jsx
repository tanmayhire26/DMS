import { useLoaderData } from "react-router-dom";
import RegisterForm from "./registerForm";

export function userLoader({ params }) {
	const userId = params.id;
	const userRole = params.role;
	return [userId, userRole];
}

export function UserForm() {
	const userId = useLoaderData()[0];
	const userRole = useLoaderData()[1];

	return (
		<>
			{userRole === "Indexer" ? (
				<RegisterForm userId={userId} userRole={userRole} />
			) : (
				<h2>ADMIN CANNOT EDIT GENERAL USER</h2>
			)}
		</>
	);
}
