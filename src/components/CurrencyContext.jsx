import React, { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext();

export function CurrencyProvider({ children }) {
    // 1. Initial State Resolution (Synchronous to avoid layout shift)
    const [currency, setCurrency] = useState(() => {
        // A. Check for user manual override in local storage
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('db23_currency');
            if (saved === 'ZAR' || saved === 'USD') return saved;
        }

        // B. Check for server-injected PHP region cookie
        if (typeof document !== 'undefined') {
            const match = document.cookie.match(new RegExp('(^| )user_region=([^;]+)'));
            if (match) {
                const region = match[2].trim().toUpperCase();
                return region === 'ZA' ? 'ZAR' : 'USD';
            }
        }

        // C. Fallback default — site targets South Africa
        return 'ZAR';
    });

    // 2. Client-Side Geolocation Fallback (Only if cookie/localStorage not yet established)
    useEffect(() => {
        if (typeof window === 'undefined') return;
        
        const saved = localStorage.getItem('db23_currency');
        const hasCookie = document.cookie.match(new RegExp('(^| )user_region=([^;]+)'));

        if (!saved && !hasCookie) {
            // Fast, non-blocking check to retrieve user country
            fetch('https://ipapi.co/json/')
                .then(res => {
                    if (!res.ok) throw new Error('Geo API offline');
                    return res.json();
                })
                .then(data => {
                    const country = data.country_code ? data.country_code.toUpperCase() : 'US';
                    const detected = country === 'ZA' ? 'ZAR' : 'USD';
                    setCurrency(detected);
                    
                    // Cache region in cookie for 30 days so subsequent page reloads are instant
                    document.cookie = `user_region=${country}; max-age=${86400 * 30}; path=/; SameSite=Lax`;
                })
                .catch(() => {
                    // Fail gracefully to ZAR — site targets South Africa
                    setCurrency('ZAR');
                });
        }
    }, []);

    const toggleCurrency = (newCurrency) => {
        if (newCurrency !== 'ZAR' && newCurrency !== 'USD') return;
        setCurrency(newCurrency);
        localStorage.setItem('db23_currency', newCurrency);
        // Sync the cookie as well
        const regionCode = newCurrency === 'ZAR' ? 'ZA' : 'US';
        document.cookie = `user_region=${regionCode}; max-age=${86400 * 30}; path=/; SameSite=Lax`;
    };

    return (
        <CurrencyContext.Provider value={{ currency, toggleCurrency }}>
            {children}
        </CurrencyContext.Provider>
    );
}

export const useCurrency = () => useContext(CurrencyContext);
