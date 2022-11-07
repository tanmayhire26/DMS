import { Autocomplete, TextField } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-router-dom";
import { getAllDepartments } from "../../actions/departmentAction";

function UserFilterList(props) {
	const { handleRoleClick, onDepartmentsChange } = props;
	const dispatch = useDispatch();
	const departments = useSelector(
		(state) => state.departmentReducer.departments
	);
	
	useEffect(() => {
		dispatch(getAllDepartments());
	}, []);
	const rolesArr = ["All", "Admin", "Indexer", "General User"];

	return (
		<>
			Select Role
			<ul className="list-group flex">
				{rolesArr.map((r) => (
					<li
						style={{ cursor: "pointer" }}
						onClick={() => handleRoleClick(r)}
						className="list-group-item"
					>
						{r}
					</li>
				))}
			</ul>
			<div className="mt-5 shadow">
				<Autocomplete
					onChange={(e, value) => onDepartmentsChange(value)}
					multiple
					id="tags-outlined"
					options={departments}
					getOptionLabel={(option) => option.name}
					//defaultValue={""}
					filterSelectedOptions
					renderInput={(params) => (
						<TextField
							{...params}
							label="Departments"
							placeholder="user departments"
						/>
					)}
				/>
			</div>
		</>
	);
}

export default UserFilterList;
