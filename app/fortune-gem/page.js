/** @format */

import Image from "next/image";
import Link from "next/link";
import volatilityFull from "../../assets/volatilityFull.png";
import volatilityEmpty from "../../assets/volatilityEmpty.png";
import fotunegemImage from "../../assets/fortune-2-ezgif.com-crop.webp";
import carousel1 from "../../assets/fortune-1.webp";
import carousel2 from "../../assets/carousel-image2.webp";
import continueButton from "../../assets/Continue.png";
import king1 from "../../assets/king1.webp";
import superwin from "../../assets/super-win.webp";
import bouncex15 from "../../assets/bounce-x15.webp";
// import king1 from "../../assets/king2.webp";
import Carousel from "@/components/carousel/Carousel";
import FortuneGemLayout from "@/layouts/FortuneGemLayout";

const volatilityImages = [
	{
		id: "1xx",
		src: volatilityFull,
	},
	{
		id: "2xx",
		src: volatilityEmpty,
	},
	{
		id: "3xx",
		src: volatilityEmpty,
	},
	{
		id: "4xx",
		src: volatilityEmpty,
	},
	{
		id: "5xx",
		src: volatilityEmpty,
	},
];

export default function FortuneGem() {
	return (
		<FortuneGemLayout>
			<div className="volatility-container">
				<div className="volatile">
					<p style={{ opacity: 0.5 }}>Volatility:</p>&nbsp;
					{volatilityImages?.map((image) => (
						<Image
							key={image?.id}
							src={image?.src}
							alt="volatility-images"
							priority={true}
						/>
					))}
				</div>
				<Image
					src={fotunegemImage}
					priority={true}
					alt="fortune-image"
				/>
			</div>
			<div className="carousel-main-container">
				<Carousel>
					<div className="relative-carousel-container">
						<Image
							src={carousel1}
							alt="carousel-image"
							priority={true}
							className="carousel-image-1"
						/>
						<Image
							src={king1}
							alt="carousel-image"
							priority={true}
							className="carousel-bouncing-king"
						/>
						<p>
							Gain more winning lines to win <br></br> big prices!
						</p>
					</div>
					<div className="relative-carousel-container">
						<Image
							src={carousel2}
							alt="carousel-image"
							priority={true}
							className="carousel-image-1"
						/>
						<Image
							src={superwin}
							alt="carousel-image"
							priority={true}
							className="carousel-super-win"
						/>
						<Image
							src={bouncex15}
							alt="carousel-image"
							priority={true}
							className="carousel-super-win bouncex15"
						/>
						<p>
							Any win can receive multiplier <br></br> multipliers!
						</p>
					</div>
				</Carousel>
			</div>
			<div className="continue-button-wrapper">
				<Link
					href={"/game-scene"}
					style={{ height: "100%" }}>
					<Image
						src={continueButton}
						alt="continue-button"
						priority={true}
						style={{ cursor: "pointer", height: "100%", width: "auto" }}
					/>
				</Link>
			</div>
		</FortuneGemLayout>
	);
}
