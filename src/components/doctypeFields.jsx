import Logo from "./logo";

function DoctypeFields() {
    return (
			<>
				<div className="row flex divide-x">
					<div className="col-2 divide-y flex-row justify-center h-screen">
						<div className="mt-3 flex justify-center pb-3">
							<Logo />
						</div>
						<div></div>
					</div>
					<div className="col">
						<h2>Department page</h2>
					</div>
				</div>
			</>
		);
}

export default DoctypeFields;