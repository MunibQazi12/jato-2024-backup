'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

export const AppContext = React.createContext<any>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {

    const pathname = usePathname();
    const [theme, setTheme] = React.useState<string>('light');

    const themeHandler = () => {
        setTheme((pre: string) => {
            const mode = pre === 'dark' ? 'light' : 'dark';
            document.getElementsByTagName('body')[0].className = mode;
            if (!(pathname).includes('/social-feed')) {
                document.getElementsByTagName('body')[0].style.backgroundColor = pre === 'dark'
                    ? '#fff'
                    : '#181724'
            }
            return mode;
        })
    }

    return (
        <AppContext.Provider
            value={{
                themeHandler,
                theme
            }}
        >
            {children}
        </AppContext.Provider>
    );
}