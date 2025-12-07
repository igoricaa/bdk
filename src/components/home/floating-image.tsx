"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { Image } from "next-sanity/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { urlFor } from "@/src/sanity/lib/image";

type Variant = "default" | "inverse";

export const FloatingImage = ({
	image,
	className,
	variant = "default",
}: {
	image: SanityImageSource;
	className?: string;
	variant?: Variant;
}) => {
	const [isActive, setIsActive] = useState(false);

	const targetX = useMotionValue(0);
	const targetY = useMotionValue(0);
	const targetRotate = useMotionValue(0);
	const targetScale = useMotionValue(1);

	const springConfig = { stiffness: 150, damping: 25, mass: 0.5 };

	const springX = useSpring(targetX, springConfig);
	const springY = useSpring(targetY, springConfig);
	const springRotate = useSpring(targetRotate, springConfig);
	const springScale = useSpring(targetScale, springConfig);

	useEffect(() => {
		const checkViewportPosition = () => {
			const scrollY = window.scrollY;
			const viewportHeight = window.innerHeight;
			const oneAndHalfViewport = viewportHeight * 1.2;

			const shouldBeActive = scrollY < oneAndHalfViewport;
			setIsActive(shouldBeActive);

			if (!shouldBeActive) {
				targetX.set(0);
				targetY.set(0);
				targetRotate.set(0);
				targetScale.set(1);
			}
		};

		const handleMouseMove = (event: MouseEvent) => {
			if (!isActive) return;

			const { clientX, clientY } = event;
			const x = clientX / window.innerWidth - 0.5;
			const y = clientY / window.innerHeight - 0.5;

			const moveAmount = 25;

			switch (variant) {
				case "inverse":
					targetX.set(-x * moveAmount);
					targetY.set(-y * moveAmount);
					targetRotate.set(0);
					targetScale.set(1);
					break;
				case "default":
				default:
					targetX.set(x * moveAmount);
					targetY.set(y * moveAmount);
					targetRotate.set(0);
					targetScale.set(1);
					break;
			}
		};

		// Initial check
		checkViewportPosition();

		// Add event listeners
		window.addEventListener("scroll", checkViewportPosition, { passive: true });
		window.addEventListener("resize", checkViewportPosition, { passive: true });

		// Only add mousemove listener if active
		if (isActive) {
			window.addEventListener("mousemove", handleMouseMove, { passive: true });
		}

		return () => {
			window.removeEventListener("scroll", checkViewportPosition);
			window.removeEventListener("resize", checkViewportPosition);
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, [variant, isActive, targetX, targetY, targetRotate, targetScale]);

	return (
		<motion.div
			style={{
				x: springX,
				y: springY,
				rotate: springRotate,
				scale: springScale,
			}}
			className={className}
		>
			<Image
				src={urlFor(image).url()}
				alt="BDK Advokati - Hero Image"
				priority
				quality={100}
				width={544}
				height={544}
				className="h-full w-full object-cover"
			/>
		</motion.div>
	);
};
