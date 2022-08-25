import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";

interface Props {
	img: string;
	inClothing?: Boolean;
}
const Clothing = ({ type, img, inClothing, setClothes }: Props) => {
	const handleUndressing = () => {
		setClothes((prevState) => {
			return {
				...prevState,
				[type]: "",
			};
		});
	};

	return (
		<div
			style={{
				border: "2px solid white",
				cursor: "pointer",
				boxShadow:
					"0 1px 1px rgb(30 3 60 / 20%), 0 2px 10px rgb(30 3 60 / 50%)",
				position: "relative",
			}}
		>
			{inClothing && (
				<div style={{ position: "absolute", top: "0", right: "0" }}>
					<AiFillCloseCircle onClick={() => handleUndressing()} />
				</div>
			)}
			<img src={img} alt="clothing" />
		</div>
	);
};

export default Clothing;
