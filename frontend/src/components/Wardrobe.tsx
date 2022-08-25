import { getUsername } from "../fetchData/FetchUser";
import { useEffect, useState } from "react";

interface Props {
	types: String[];
	setType: (value: String) => void;
}
const Wardrobe = ({ setType, types, id }: Props) => {
	const [name, setName] = useState("Гост");

	useEffect(() => {
		const getName = async () => {
			const res = await getUsername(id);

			console.log(res);

			setName(res);
		};
		getName();
	}, [id]);

	return (
		<div
			style={{
				padding: ".5rem 1rem",
				background:
					"linear-gradient(to bottom,rgba(141,80,156,1) 0,rgba(58,1,85,1) 100%)",
				borderRadius: "12px",
			}}
		>
			<h2
				style={{
					color: "white",
					textShadow:
						"0 3px 5px #511769, 0 1px 1px #511769, 0 2px 11px #d130c7",
					cursor: "pointer",
				}}
			>
				ГАРДЕРОБ на {name}
			</h2>
			<div style={{ display: "flex", gap: ".3rem", flexWrap: "wrap" }}>
				{types?.map((type) => (
					<div
						style={{
							color: "white",
							backgroundColor: "#441b52",
							cursor: "pointer",
							padding: ".5rem",
						}}
						onClick={() => setType(type)}
					>
						{type}
					</div>
				))}
			</div>
		</div>
	);
};

export default Wardrobe;
