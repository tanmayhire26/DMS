import Logo from "../logo";

function IndexerView() {
    return ( <><div className="row">
				<div className="col-3 h-screen border-r">
					<div className="w-full p-3 flex justify-center border-b">
						<Logo />
					</div>
				</div>
				<div className="col"></div>
			</div>
		</>);
}

export default IndexerView;