import React from "react";
import { Clothes } from "../App";
import { WearedClothes } from "../App";
import Clothing from "./Clothing";

interface Props {
	clothes: Clothes | undefined;
	setClothes: (prev: (value: WearedClothes) => WearedClothes) => void;
}

const WardrobeType = ({ clothes, setClothes }: Props) => {
	const getClothesType = () => {
		switch (clothes && clothes.type) {
			case "dress":
				return "Рокли";

			case "shirt":
				return "Блузи";

			case "shoes":
				return "Обувки";

			case "bag":
				return "Чанти";

			default:
				return;
		}
	};
	return (
		<div
			style={{
				background:
					"linear-gradient(rgba(255,255,255, .3) 0px,rgba(255,0,253, .3) 100%)",

				margin: "0",
				boxShadow: "0 10px 20px 0 rgb(0 0 0 / 30%)",
				borderRadius: "12px",
				padding: "0 .7rem",
			}}
		>
			<h2 style={{ color: "#ff4c87", textAlign: "center" }}>
				{getClothesType()}
			</h2>
			<div style={{ display: "flex", gap: "1rem" }}>
				{clothes &&
					clothes.images?.map((img) => (
						<div
							onClick={() =>
								setClothes((prevClothes) => {
									return {
										...prevClothes,
										[clothes.type]: [
											img.replace(".png", "-static.png"),
											img.replace(".png", "-static-second.png"),
										],
									};
								})
							}
						>
							<Clothing img={img} />
						</div>
					))}
			</div>
		</div>
	);
};

export default WardrobeType;
