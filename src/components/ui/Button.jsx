import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

export function Button({
    children,
    variant = 'primary',
    size = 'md',
    className,
    href,
    type = 'button',
    ...props
}) {
    const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-[3px] font-semibold tracking-tight transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none';

    // Vermilion takes ink text: white on #ff4f1f fails WCAG AA.
    const variants = {
        primary: 'bg-accent text-ink hover:bg-accent-hover',
        secondary: 'bg-card text-text-main hover:bg-card-hover border border-white/10',
        outline: 'border border-white/25 text-text-main hover:border-accent hover:text-accent',
        ghost: 'hover:bg-card-hover text-text-main',
    };

    const sizes = {
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-6 text-base',
        lg: 'h-14 px-8 text-base md:text-lg',
    };

    const MotionComponent = href ? motion.a : motion.button;

    return (
        <MotionComponent
            whileTap={{ scale: 0.98 }}
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            {...(href ? { href } : { type })}
            {...props}
        >
            {children}
        </MotionComponent>
    );
}
