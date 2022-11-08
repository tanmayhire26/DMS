import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store";
import {
	createBrowserRouter,
	RouterProvider,
	useRouteLoaderData,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Department from "./components/department";
import User from "./components/user";
import DocType from "./components/docType";
import DoctypeFields from "./components/doctypeFields";
import Fields from "./components/fields";
import Home from "./components/home";
import Login from "./components/login";
import Register from "./components/register";
import ErrorPage from "./errorPage";
import GeneralUser from "./components/generalUser/generalUser";
import IndexerView from "./components/indexer/indexerView";

import { UserForm, userLoader } from "./components/forms/userForm";
import AddDoc from "./components/indexer/indexerAddDoc";
import IndexerApp from "./components/indexer/indexerApp";
import AdminProtectedRouter from "./components/adminProtectedRouter";
import GeneralUserProtectedRouter from "./components/generalUser/generalUserProtectedRoute";
import IndexerProtectedRouter from "./components/indexer/indexerProtectedRoute";
import { documentLoader, EditDoc } from "./components/indexer/editDoc";
import MulterTrial from "./components/indexer/multerTrial";
import IndexingForm from "./components/indexer/indexingForm";

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter([
	
	{
		path: "/",
		element: <Home />,
		errorElement: <ErrorPage />,
	},
	{ path: "login", element: <Login />, errorElement: <ErrorPage /> },
	{ path: "register", element: <Register />, errorElement: <ErrorPage /> },

	{
		path: "admin",

		element: (
			<AdminProtectedRouter>
				<App />
			</AdminProtectedRouter>
		),

		errorElement: <ErrorPage />,
		children: [
			{ index: true, element: <Department /> },
			{ path: "departments", element: <Department /> },
			{ path: "users", element: <User /> },
			{ path: "docTypes", element: <DocType /> },
			{ path: "doctypeFields", element: <DoctypeFields /> },
			{ path: "fields", element: <Fields /> },
			{ path: "users/userForm", element: <UserForm /> },
			{ path: "users/:id/:role", element: <UserForm />, loader: userLoader },
		],
	},
	{
		path: "generalUser",
		element: (
			<GeneralUserProtectedRouter>
				<GeneralUser />
			</GeneralUserProtectedRouter>
		),
	},
	{
		path: "generalUser/profile/:id/:role",
		element: <UserForm />,
		loader: userLoader,
	},

	{
		path: "indexer",
		element: (
			<IndexerProtectedRouter>
				<IndexerApp />
			</IndexerProtectedRouter>
		),
		children: [
			{ index: true, element: <IndexerView /> },
			{ path: "indexerView", element: <IndexerView /> },
			{ path: "addDoc", element: <AddDoc /> },
		],
	},
	{ path: "indexer/indexerView/:id", element: <EditDoc />, loader:documentLoader},
	{ path: "indexer/:id", element: <EditDoc />, loader:documentLoader},
]);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
