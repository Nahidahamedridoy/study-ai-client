'use client';

import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useTransform, animate } from 'framer-motion';

export default function AnimatedCounter({ value = 0, duration = 1.5 }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-40px' });
    const motionVal = useMotionValue(0);
    const rounded = useTransform(motionVal, (v) => Math.round(v));
    const displayRef = useRef(null);

    useEffect(() => {
        if (isInView) {
            animate(motionVal, value, { duration, ease: 'easeOut' });
        }
    }, [isInView, value, duration, motionVal]);

    useEffect(() => {
        const unsubscribe = rounded.on('change', (v) => {
            if (displayRef.current) {
                displayRef.current.textContent = v.toLocaleString();
            }
        });
        return unsubscribe;
    }, [rounded]);

    return (
        <span ref={ref}>
            <span ref={displayRef}>0</span>
        </span>
    );
}
