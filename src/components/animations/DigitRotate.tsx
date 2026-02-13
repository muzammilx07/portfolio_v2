"use client";

import { AnimatePresence, motion, MotionProps } from "framer-motion";

import { cn } from "@/lib/utils";

interface DigitRotateProps {
	value: string;
	className?: string;
	motionProps?: MotionProps;
}

export function DigitRotate({
	value,
	className,
	motionProps,
}: DigitRotateProps) {
	const defaultMotionProps: MotionProps = {
		initial: { opacity: 0, y: -12 },
		animate: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: 12 },
		transition: { type: "tween", stiffness: 220, damping: 24 },
	};

	return (
		<div className={cn("inline-flex items-center tabular-nums", className)}>
			{value.split("").map((char, index) => {
				const isDigit = /[0-9]/.test(char);

				if (!isDigit) {
					return (
						<span key={`static-${index}`} className="inline-block">
							{char}
						</span>
					);
				}

				return (
					<span key={`slot-${index}`} className="relative inline-block">
						<AnimatePresence mode="wait" initial={false}>
							<motion.span
								key={`${index}-${char}`}
								className="absolute left-0 top-0"
								{...(motionProps ?? defaultMotionProps)}
							>
								{char}
							</motion.span>
						</AnimatePresence>
						<span className="invisible">{char}</span>
					</span>
				);
			})}
		</div>
	);
}
