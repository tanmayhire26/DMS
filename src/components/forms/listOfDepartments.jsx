import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDepartments } from "../../actions/departmentAction";

function ListOfDepartments(props) {
	const { onHandleChange, register } = props;
	// const [selectedDepartments, setSelectedDepartments] = useState([]);

	const departments = useSelector(
		(state) => state.departmentReducer.departments
	);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getAllDepartments());
	}, []);

	return (
		<Autocomplete
			{...register("departments")}
			onChange={(e, value) => onHandleChange(value)}
			options={departments}
			multiple
			style={{ width: 400 }}
			//defaultValue={[myOptions[3]]}
			getOptionLabel={(option) => option.name}
			renderInput={(params) => (
				<TextField
					{...params}
					label=""
					variant="outlined"
					placeholder="Your departments"
				/>
			)}
		/>
	);
}

export default ListOfDepartments;
