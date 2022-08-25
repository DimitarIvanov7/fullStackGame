import React from "react";
import Clothing from "./Clothing";

const Outfit = ({ clothes, setClothes }) => {
	const displayClothes = () => {
		const data = Object.entries(clothes).map((element) => {
			return (
				element[1].length > 0 && (
					<Clothing
						inClothing={true}
						setClothes={setClothes}
						img={element[1][0].replace("-static.png", ".png")}
						type={element[0]}
					/>
				)
			);
		});

		return data;
	};

	return (
		<div
			style={{
				background:
					"linear-gradient(to bottom,rgba(255,255,255,.3) 0, rgba(255,0,253,.3) 100%)",
				padding: ".5rem 1.4rem",
				height: "30rem",
				marginTop: "4rem",
				marginLeft: "-.8rem",
			}}
		>
			<div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
				{clothes && displayClothes()}
			</div>
		</div>
	);
};

export default Outfit;
