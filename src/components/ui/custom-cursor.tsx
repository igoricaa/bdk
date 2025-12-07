"use client";

import { Cursor, useCursorState } from "motion-plus/react";
import { AnimatePresence } from "motion/react";

const CustomCursor = () => {
	const { zone } = useCursorState();

	return (
		<AnimatePresence mode="wait">
			{zone && zone !== "exempt" && (
				<Cursor
					follow
					center={{ x: 0.5, y: 0.5 }}
					className="flex items-center justify-center min-w-12 min-h-12 max-w-12 max-h-12 p-4 rounded-full! bg-light-blue/90! backdrop-blur-sm"
				></Cursor>
			)}
		</AnimatePresence>
	);
};

export default CustomCursor;
