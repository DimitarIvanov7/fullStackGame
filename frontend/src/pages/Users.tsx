import React from "react";
import { useState, useEffect } from "react";
import Wardrobe from "../components/Wardrobe";
import WardrobeType from "../components/WardrobeType";
import Lady from "../components/Lady";
import Outfit from "../components/Outfit";
import { useParams } from "react-router-dom";
import { setDBWearedClothes, getWearedClothes } from "../fetchData/FetchUser";

export interface Clothes {
	id: number;
	type: string;
	images: string[];
}

export interface WearedClothes {
	dress: string;
	shirt: string;
	bag: string;
	shoes: string;
}

function User({ user }) {
	const { id } = useParams();

	const validUser = user?.id === parseInt(id);

	const [wardRobeClothes, setWardRobeClothes] = useState<Clothes[] | null>(
		null
	);

	useEffect(() => {
		const getClothes = async () => {
			const res = await fetch(`/user/${id}`);
			const resJson = await res.json();

			const dict = ["shirt", "dress", "bag", "shoes"];

			const composed = dict.map((el, index) => {
				return {
					id: index + 1,
					type: el,
					images: resJson
						.filter((clothes) => clothes.type === el)
						.map((element) => element.img),
				};
			});

			setWardRobeClothes(composed);
		};

		getClothes();
	}, [id]);

	const [outfit, setOutfit] = useState();

	console.log(outfit);

	useEffect(() => {
		const getOutfit = async () => {
			const data = await getWearedClothes(id);

			const dict = ["shirt", "dress", "bag", "shoes"];

			const transfromedClothes = Object.assign(
				{},
				...dict.map((el) => {
					return {
						[el]: data
							.filter((element) => element.type === el)
							.map((obj) => obj.img.replace(".png", "-static.png")),
					};
				})
			);

			for (const property in transfromedClothes) {
				if (property.length > 1)
					property[1].replace(".png", "-static-second.png");
			}

			console.log(transfromedClothes);

			setOutfit(transfromedClothes);
		};

		getOutfit();
	}, [id]);

	const handleSaveClothes = () => {
		const clothesImgages = Object.values(outfit)
			.flat()
			.map((img) => img.replace("-static", "").replace("-second", ""));

		console.log(clothesImgages);

		setDBWearedClothes(id, clothesImgages);
	};

	const [currentType, setCurrentType] = useState<String>("dress");

	const currentClothes: Clothes | undefined = wardRobeClothes?.find(
		(element) => element.type === currentType
	);

	const types: String[] = wardRobeClothes?.map((element) => element.type);

	return (
		<div
			className="App"
			style={{
				display: "flex",
				gap: "1.5rem",
				padding: "1rem",
				background: "url(/images/background.jpg)",
				zIndex: "1",
				position: "relative",
			}}
		>
			<Wardrobe setType={setCurrentType} types={types} id={id} />
			{validUser && (
				<>
					<WardrobeType clothes={currentClothes} setClothes={setOutfit} />
					<Outfit clothes={outfit} setClothes={setOutfit} />
				</>
			)}
			<Lady outfit={outfit} id={id} handeSaveClothes={handleSaveClothes} />
		</div>
	);
}

export default User;
