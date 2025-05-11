import { useEffect } from "react";

function useThemeSwitcher() {
    useEffect(() => {
        // Listen for Twitch theme changes
        window.Twitch.ext.onContext((context) => {
            if (context.theme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        });
    }, []);
}

export default useThemeSwitcher;