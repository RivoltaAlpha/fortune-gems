"use client";
/** @format */
import Image from "next/image";
import "../styles/landing.css";
import bgImage from "../public/bg-img.png";
import bannerImage from "../public/banner-thumb.png";
import betImage from "../public/bet1.png";
import Link from "next/link";
import { playStartSound } from "@/utils/utilities";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";
import { LoadPageMusic } from "@/utils/soundManager";

export default function Home() {

const router = useRouter();

	useEffect(() => {
		LoadPageMusic();
	  }, []);

const playClickSound = () => {
	playStartSound();
	setTimeout(() => {
	  router.push('/fortune-gem');
	}, 2000); 
  }

	return (
		<div className="main-container-wrapper">
			<Image
				src={bgImage}
				alt="bg-image"
				priority={true}
				className="bg-image"
			/>
			<div className="landing-hero-section">
				<div className="button-text-container">
					<h1>Win Unlimited Money By Playing Online Casino Games</h1>
					<button onClick={playClickSound}>
						<Link href="">Play now!</Link>
					</button>
				</div>
				<Image
					src={betImage}
					alt="bet1"
					priority={true}
					className="bet-image"
					height={120}
					width={120}
				/>
				<Image
					src={bannerImage}
					alt="banner"
					priority={true}
					className="banner-image"
				/>
			</div>
			<footer className="landing-footer">
				© 2024 <span>Casino Royale.</span> All rights reserved.
			</footer>
		</div>
	);
}
