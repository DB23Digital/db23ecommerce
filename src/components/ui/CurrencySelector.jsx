import React, { useState, useRef, useEffect } from 'react';
import { useCurrency } from '../CurrencyContext';
import { Globe, ChevronDown } from 'lucide-react';

export function CurrencySelector({ className = "" }) {
    const { currency, toggleCurrency } = useCurrency();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const options = [
        { value: 'ZAR', label: 'ZAR (R)', short: 'ZAR' },
        { value: 'USD', label: 'USD ($)', short: 'USD' }
    ];

    const currentOption = options.find(opt => opt.value === currency) || options[1];

    return (
        <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-haspopup="true"
                className="inline-flex items-center gap-2 rounded-[3px] border border-white/15 px-3 py-1.5 text-xs font-medium text-white hover:border-white/40 transition-colors cursor-pointer"
            >
                <Globe className="h-3.5 w-3.5 text-text-muted" aria-hidden="true" />
                <span>{currentOption.label}</span>
                <ChevronDown className={`h-3 w-3 text-text-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-36 origin-top-right rounded-[3px] border border-white/15 bg-card p-1 shadow-2xl z-50 focus:outline-none">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                        {options.map(option => (
                            <button
                                key={option.value}
                                onClick={() => {
                                    toggleCurrency(option.value);
                                    setIsOpen(false);
                                }}
                                className={`flex w-full items-center px-3 py-2 text-xs font-medium rounded-[2px] transition-colors cursor-pointer ${
                                    currency === option.value
                                        ? 'bg-white/5 text-accent'
                                        : 'text-text-muted hover:bg-white/5 hover:text-white'
                                }`}
                                role="menuitem"
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
