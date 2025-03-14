/** @format */

"use client";

import React, { useState, useRef, useEffect } from "react";
import "./carousel.css";
import control1 from "../../assets/arrowLeft.png";
import control2 from "../../assets/arrowRight.png";
import Image from "next/image";

function Carousel({ children }) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [draggingOffset, setDraggingOffset] = useState(0); // Tracks real-time drag offset
	const carouselRef = useRef(null);
	const isDragging = useRef(false);
	const startX = useRef(0);
	const deltaX = useRef(0);

	const totalSlides = React.Children.count(children);

	const nextSlide = () => {
		setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, totalSlides - 1));
	};

	const prevSlide = () => {
		setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
	};

	// Keyboard navigation
	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === "ArrowRight") nextSlide();
			if (event.key === "ArrowLeft") prevSlide();
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	// Handle drag start
	const handleMouseDown = (e) => {
		isDragging.current = true;
		startX.current = e.pageX;
		deltaX.current = 0; // Reset drag distance
		setDraggingOffset(0); // Reset real-time offset
	};

	// Handle dragging
	const handleMouseMove = (e) => {
		if (!isDragging.current) return;
		e.preventDefault();

		// Calculate drag distance
		const distance = e.pageX - startX.current;

		// Prevent dragging beyond boundaries
		if (
			(currentIndex === 0 && distance > 0) || // Block dragging left on the first slide
			(currentIndex === totalSlides - 1 && distance < 0) // Block dragging right on the last slide
		) {
			return;
		}

		deltaX.current = distance; // Update drag distance
		setDraggingOffset(deltaX.current); // Update real-time offset
	};

	// Handle drag end
	const handleMouseUpOrLeave = () => {
		if (!isDragging.current) return;

		isDragging.current = false;

		// Calculate threshold and decide which slide to snap to
		const threshold = 50; // Adjust threshold as needed
		if (deltaX.current > threshold && currentIndex > 0) {
			prevSlide();
		} else if (deltaX.current < -threshold && currentIndex < totalSlides - 1) {
			nextSlide();
		}

		// Reset drag-related states
		deltaX.current = 0;
		setDraggingOffset(0);
	};

	return (
		<div className="carousel-wrapper">
			{currentIndex > 0 && (
				<div className="control-1">
					<div>
						<Image
							src={control1}
							alt="arrow-left"
							priority={true}
							onClick={prevSlide}
						/>
					</div>
				</div>
			)}
			<div
				className="carousel-container"
				ref={carouselRef}
				style={{
					transform: `translateX(calc(-${
						currentIndex * 100
					}% + ${draggingOffset}px))`,
					transition: isDragging.current
						? "none"
						: "transform 0.3s ease-in-out",
				}}
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUpOrLeave}
				onMouseLeave={handleMouseUpOrLeave}>
				{React.Children.map(children, (child, index) => (
					<div
						className="carousel-item"
						key={index}>
						{child}
					</div>
				))}
			</div>
			{currentIndex < totalSlides - 1 && (
				<div className="control-2">
					<div>
						<Image
							src={control2}
							alt="arrow-right"
							priority={true}
							onClick={nextSlide}
						/>
					</div>
				</div>
			)}
		</div>
	);
}

export default Carousel;
