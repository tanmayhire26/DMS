import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
		path: "/adminDashboard",
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{ path: "/adminDashboard/department", element: <Department /> },
			{ path: "/adminDashboard/user", element: <User /> },
			{ path: "/adminDashboard/docType", element: <DocType /> },
			{ path: "/adminDashboard/doctypeFields", element: <DoctypeFields /> },
			{ path: "/adminDashboard/fields", element: <Fields /> },
			{ path: "/adminDashboard/register", element: <Register /> },
		],
	},
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
