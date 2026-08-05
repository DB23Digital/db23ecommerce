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
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:pointer-events-none';

    const variants = {
        primary: 'bg-accent text-white hover:bg-accent-hover shadow-lg hover:shadow-accent/25',
        secondary: 'bg-card text-text-main hover:bg-card-hover border border-white/5',
        outline: 'border border-accent text-accent hover:bg-accent hover:text-white',
        ghost: 'hover:bg-card-hover text-text-main',
    };

    const sizes = {
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-8 text-base',
        lg: 'h-14 px-10 text-lg',
    };

    const MotionComponent = href ? motion.a : motion.button;

    return (
        <MotionComponent
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            {...(href ? { href } : { type })}
            {...props}
        >
            {children}
        </MotionComponent>
    );
}
