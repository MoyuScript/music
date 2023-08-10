import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ThemeStore {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

const useThemeStore = create(
    persist<ThemeStore>(
        (set) => ({
            theme: 'light',
            toggleTheme: () =>
                set((state) => ({
                    theme: state.theme === 'light' ? 'dark' : 'light',
                })),
        }),
        {
            name: 'theme-storage',
        }
    )
);

export default useThemeStore;

const DARK_MARKDOWN_STYLESHEET_URL = 'https://cdn.bootcdn.net/ajax/libs/github-markdown-css/5.2.0/github-markdown-dark.min.css';
const LIGHT_MARKDOWN_STYLESHEET_URL = 'https://cdn.bootcdn.net/ajax/libs/github-markdown-css/5.2.0/github-markdown-light.min.css';
const markdownStylesheet = document.createElement('link');
markdownStylesheet.rel = 'stylesheet';
markdownStylesheet.href = useThemeStore.getState().theme === 'light' ? LIGHT_MARKDOWN_STYLESHEET_URL : DARK_MARKDOWN_STYLESHEET_URL;
document.head.appendChild(markdownStylesheet);

function updateTheme(theme: 'light' | 'dark') {
    if (theme === 'light') {
        document.documentElement.classList.remove('dark');
        markdownStylesheet.href = LIGHT_MARKDOWN_STYLESHEET_URL;
    } else {
        document.documentElement.classList.add('dark');
        markdownStylesheet.href = DARK_MARKDOWN_STYLESHEET_URL;
    }
}

useThemeStore.subscribe((state) => {
    updateTheme(state.theme);
});

updateTheme(useThemeStore.getState().theme);