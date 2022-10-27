import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-router-dom";
import { getAllDoctypefields } from "../../actions/doctypefieldAction";
import { getAllFields } from "../../actions/fieldAction";

function IndexingForm(props) {
	const dispatch = useDispatch();
	const { selectedDoctype } = props;
	let reqDoctypefields = [];
	let reqFieldsIds = [];
	let reqFields = [];
	useEffect(() => {
		dispatch(getAllDoctypefields());
		dispatch(getAllFields());
	}, []);
	const doctypefields = useSelector(
		(state) => state.doctypefieldReducer.doctypefields
	);
	const fields = useSelector((state) => state.fieldReducer.fields);
	//console.log("slecterd doctype :", selectedDoctype);
	reqDoctypefields = doctypefields;
	reqDoctypefields = doctypefields.filter(
		(dtf) => dtf.docType === selectedDoctype
	);
	//console.log("Required doctypefields are : ", reqDoctypefields);

	for (let i = 0; i < reqDoctypefields.length; i++) {
		reqFieldsIds.push(reqDoctypefields[i].field);
	}

	for (let j = 0; j < reqFieldsIds.length; j++) {
		reqFields.push(fields.find((f) => f._id === reqFieldsIds[j]));
	}
	console.log("Aray of req field objects : ", reqFields);

	//console.log("Array of Required Fields : ", reqFieldsIds);
	return (
		<>
			<div className="w-full flex gap-4">
				<div className="w-3/6 shadow">
					<Form className=" p-3 w-full flex flex-wrap gap-5">
						{reqFields.map((rf) => (
							<div key={rf._id} className="">
								<label className="form-label" htmlFor={rf.name.name}>
									{rf.name.label}
								</label>
                                <input type={rf.name.input} className="form-control" id={rf.name.name}/>
							</div>
						))}
                        <button className="p-2 bg-orange-300 text-white rounded-full" type="submit">submit Document</button>
					</Form>
				</div>
				<div className="w-3/6 shadow">View and upload document</div>
			</div>
		</>
	);
}

export default IndexingForm;
