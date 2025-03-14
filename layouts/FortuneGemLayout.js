/** @format */
"use client";
import Image from "next/image";
import canvasImg from "../assets/canvas-bg.jpg";
import "../styles/fortunegame.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MusicProvider from '@/components/carousel/MusicProvider';

export default function FortuneGemLayout({ children }) {
	const path = usePathname();
	return (
		<main className="game-main-page">
			<div className="game-main-background">
				<div className="game-canvas-container">
					<div className="game-area-container">
						<Image
							src={canvasImg}
							alt="canvas-img"
							priority={true}
							className="canvas-img"
							style={{
								filter: `${path === "/game-scene" ? "brightness(1.6)" : ""} `,
							}}
						/>
       				 <MusicProvider>
						{children}
					</MusicProvider>
					</div>
					<section>
						<Link href="/">
							<i className="bx bx-chevron-left"></i>Back to Home
						</Link>
						<span style={{ cursor: "default" }}>
							<i
								className="bx bx-fullscreen"
								style={{ fontSize: "18px" }}></i>
							&nbsp;Full screen
						</span>
					</section>
				</div>
			</div>
		</main>
	);
}
