import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Theme = 'light' | 'dark';

function createThemeStore() {
	const defaultTheme: Theme = browser
		? (localStorage.getItem('theme') as Theme) || 
		  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
		: 'light';

	const { subscribe, set, update } = writable<Theme>(defaultTheme);

	return {
		subscribe,
		toggle: () => {
			update((current) => {
				const newTheme = current === 'light' ? 'dark' : 'light';
				if (browser) {
					localStorage.setItem('theme', newTheme);
					document.documentElement.classList.toggle('dark', newTheme === 'dark');
				}
				return newTheme;
			});
		},
		set: (theme: Theme) => {
			if (browser) {
				localStorage.setItem('theme', theme);
				document.documentElement.classList.toggle('dark', theme === 'dark');
			}
			set(theme);
		},
		init: () => {
			if (browser) {
				const stored = localStorage.getItem('theme') as Theme | null;
				const theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
				document.documentElement.classList.toggle('dark', theme === 'dark');
				set(theme);
			}
		}
	};
}

export const theme = createThemeStore();
