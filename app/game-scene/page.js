/** @format */

"use client";

import { useState, useEffect } from "react";
import FortuneGemLayout from "@/layouts/FortuneGemLayout";
import fortune3 from "../../assets/fortune-3.PNG";
import topbar from "../../assets/topbar.webp";
import orangeBorder from "../../assets/border-orange.webp";
import winMultiplier from "../../assets/win-multiplier.png";
import marque from "../../assets/marque.png";

// Slot images
import a from "../../assets/a.png";
import j from "../../assets/j.png";
import k from "../../assets/k.png";
import q from "../../assets/q.png";
import diamondBlue from "../../assets/diamond-blue.png";
import diamondGreen from "../../assets/diamond-green.png";
import diamondRed from "../../assets/diamond-red.jpg";
import kingWild from "../../assets/king-wild.png";

// bounce category
import bounce1 from "../../assets/bounceX1.png";
import bounce2 from "../../assets/bounceX2.png";
import bounce3 from "../../assets/bounceX3.png";
import bounce5 from "../../assets/bounceX5.png";
import bounce10 from "../../assets/bounceX10.png";
import bounce15 from "../../assets/bounceX15.png";

import "./gamescene.css";
import Image from "next/image";

export default function GameScene() {
	const tweens = [a, j, k, q, diamondBlue, diamondGreen, diamondRed, kingWild];
	const bounds = [bounce1, bounce2, bounce3, bounce5, bounce10, bounce15];

	const [spinning, setSpinning] = useState([false, false, false, false]);
	const [currentSlots, setCurrentSlots] = useState([
		[0, 1, 2],
		[3, 4, 5],
		[6, 2, 0],
	]);
	const [currentBounds, setCurrentBounds] = useState([1, 2, 3]);
	const [results, setResults] = useState([null, null, null, null]);

	const [speed, setSpeed] = useState(0.1);

	useEffect(() => {
		const intervals = [];

		spinning.forEach((isSpinning, index) => {
			if (isSpinning) {
				intervals[index] = setInterval(() => {
					if (index < 3) {
						setCurrentSlots((prevSlots) => {
							const newSlots = [...prevSlots];
							newSlots[index] = newSlots[index].map(
								(slot) => (slot + 1) % tweens.length
							); // Cycle through slot images
							return newSlots;
						});
					} else if (index === 3) {
						setCurrentBounds((prevBounds) => {
							const newBounds = prevBounds.map(
								(bound) => (bound + 1) % bounds.length
							); // Cycle through bounce images
							return newBounds;
						});
					}
				}, speed * 1000);
			}
		});

		return () => intervals.forEach((interval) => clearInterval(interval));
	}, [spinning, tweens?.length, bounds?.length]);

	const handleSpin = () => {
		setSpinning([true, true, true, true]);
		setResults([null, null, null, null]);
		setSpeed(0.15);

		setTimeout(() => stopReel(0), 2000);
		setTimeout(() => stopReel(1), 3000);
		setTimeout(() => stopReel(2), 4000);
		setTimeout(() => stopReel(3), 4200);
	};

	const stopReel = (columnIndex) => {
		setSpinning((prevSpinning) => {
			const newSpinning = [...prevSpinning];
			newSpinning[columnIndex] = false;
			return newSpinning;
		});

		setResults((prevResults) => {
			const newResults = [...prevResults];
			if (columnIndex < 3) {
				newResults[columnIndex] = tweens[currentSlots[columnIndex][1]];
			} else if (columnIndex === 3) {
				newResults[columnIndex] = bounds[currentBounds[1]];
			}
			return newResults;
		});
	};

	return (
		<FortuneGemLayout>
			<div className="scene-container">
				<div className="game-scene-bg">
					<Image
						src={fortune3}
						alt="scene-img"
						className="scene-img"
					/>
					<Image
						src={topbar}
						alt="top-bar"
						className="top-bar"
					/>
					<div className="flex-container">
						{[0, 1, 2].map((columnIndex) => (
							<div
								key={`column-${columnIndex}`}
								style={{ marginTop: spinning[columnIndex] ? "-30%" : "0" }}
								className="column">
								{currentSlots[columnIndex].map((slotIndex, slotPosition) => (
									<div
										key={`col-${columnIndex}-slot-${slotPosition}`}
										className={`slot ${
											spinning[columnIndex] ? "spinning" : ""
										}`}>
										<Image
											src={tweens[slotIndex]}
											alt={`slot-${slotIndex}`}
											className={`slots ${slotIndex === 7 ? "wild-king" : ""}`}
										/>
									</div>
								))}
							</div>
						))}
					</div>

					<div className="column-two-wrapper">
						{[3].map((columnIndex) => (
							<div
								key={`column-${columnIndex}`}
								style={{ marginTop: spinning[columnIndex] ? "-30%" : "0" }}
								className="column-two">
								{currentBounds.map((boundIndex, boundPosition) => (
									<div
										key={`col-${columnIndex}-bound-${boundPosition}`}
										className={`slot ${
											spinning[columnIndex] ? "spinning" : ""
										}`}>
										<Image
											src={bounds[boundIndex]}
											alt={`bound-${boundIndex}`}
											className="slots bounds"
										/>
									</div>
								))}
							</div>
						))}
					</div>
					<div className="marque-container">
						<Image
							src={marque}
							alt="marque-image"
							className="marque-image"
						/>
					</div>
					<Image
						src={winMultiplier}
						alt="win-multiplier"
						className="win-multiplier"
					/>
					<Image
						src={orangeBorder}
						alt="border-orange"
						className="border-orange"
					/>

					<button
						className="spin-button"
						onClick={handleSpin}
						disabled={spinning.includes(true)}>
						{spinning.includes(true) ? "Spinning..." : "Spin"}
					</button>
				</div>
			</div>
		</FortuneGemLayout>
	);
}
