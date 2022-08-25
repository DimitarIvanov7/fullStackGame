import React from "react";
import { WearedClothes } from "../App";

interface Props {
	clothes: WearedClothes;
	id: string;
}

const Lady = ({ outfit, handeSaveClothes }: Props) => {
	return (
		<div style={{ position: "relative", width: "27rem" }}>
			<img src="/images/lad.webp" alt="" />

			{outfit && (
				<>
					<div
						className="dress"
						style={{
							position: "absolute",
							top: "0",
							left: "0",
							zIndex: "3",
						}}
					>
						{outfit.dress && <img style={{}} src={outfit.dress[0]} alt="" />}
					</div>

					<div
						className="dress-second-layer"
						style={{
							position: "absolute",
							top: "0",
							left: "0",
							zIndex: "-1",
						}}
					>
						{outfit.dress && <img style={{}} src={outfit.dress[1]} alt="" />}
					</div>

					<div
						className="shoes"
						style={{
							position: "absolute",
							top: "0",
							left: "0",
						}}
					>
						{outfit.shoes && <img style={{}} src={outfit.shoes[0]} alt="" />}
					</div>

					<div
						className="shirt"
						style={{
							position: "absolute",
							top: "0",
							left: "0",
							zIndex: "1",
						}}
					>
						{outfit.shirt && <img style={{}} src={outfit.shirt[0]} alt="" />}
					</div>

					<div
						className="shirt-second-layer"
						style={{
							position: "absolute",
							top: "0",
							left: "0",
							zIndex: "-1",
						}}
					>
						{outfit.shirt && <img style={{}} src={outfit.shirt[1]} alt="" />}
					</div>

					<div
						className="bag"
						style={{
							position: "absolute",
							top: "0",
							left: "0",
							zIndex: "10",
						}}
					>
						{outfit.bag && <img style={{}} src={outfit.bag[0]} alt="" />}
					</div>
				</>
			)}
			<div>
				<button onClick={() => handeSaveClothes()}>Save</button>
			</div>
		</div>
	);
};

export default Lady;
