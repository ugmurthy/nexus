import { writable, derived, get } from 'svelte/store';
import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { auth, setAuthToken } from '$lib/api/client';

export interface User {
	id: string;
	email: string;
	name?: string;
	role?: string;
}

interface AuthState {
	user: User | null;
	token: string | null;
	loading: boolean;
	error: string | null;
}

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

function createAuthStore() {
	const initialState: AuthState = {
		user: null,
		token: null,
		loading: false,
		error: null
	};

	const { subscribe, set, update } = writable<AuthState>(initialState);

	function persistToken(token: string) {
		if (browser) {
			localStorage.setItem(TOKEN_KEY, token);
		}
	}

	function persistUser(user: User) {
		if (browser) {
			localStorage.setItem(USER_KEY, JSON.stringify(user));
		}
	}

	function clearStorage() {
		if (browser) {
			localStorage.removeItem(TOKEN_KEY);
			localStorage.removeItem(USER_KEY);
		}
	}

	function loadFromStorage(): Partial<AuthState> {
		if (!browser) return {};
		const token = localStorage.getItem(TOKEN_KEY);
		const userStr = localStorage.getItem(USER_KEY);
		const user = userStr ? JSON.parse(userStr) : null;
		
		if (token) {
			setAuthToken(token);
		}
		
		return { token, user };
	}

	return {
		subscribe,

		init: () => {
			const stored = loadFromStorage();
			if (stored.token && stored.user) {
				update((state) => ({
					...state,
					token: stored.token!,
					user: stored.user!
				}));
			}
		},

		login: async (email: string, password: string, tenantSlug = 'freemium') => {
			update((state) => ({ ...state, loading: true, error: null }));

			try {
				const response = await auth.login({
					tenantSlug,
					body: { email, password }
				});

				const token = response.token as string;
				const user = response.user as User;

				setAuthToken(token);
				persistToken(token);
				persistUser(user);

				update((state) => ({
					...state,
					user,
					token,
					loading: false,
					error: null
				}));

				return { success: true };
			} catch (err: unknown) {
				const message = err instanceof Error ? err.message : 'Login failed';
				update((state) => ({
					...state,
					loading: false,
					error: message
				}));
				return { success: false, error: message };
			}
		},

		register: async (
			name: string,
			email: string,
			password: string,
			tenantSlug = 'freemium'
		) => {
			update((state) => ({ ...state, loading: true, error: null }));

			try {
				const response = await auth.register({
					tenantSlug,
					body: { name, email, password }
				});

				const token = response.token as string | undefined;
				const user = response.user as User | undefined;

				if (token && user) {
					setAuthToken(token);
					persistToken(token);
					persistUser(user);

					update((state) => ({
						...state,
						user,
						token,
						loading: false,
						error: null
					}));
				} else {
					update((state) => ({
						...state,
						loading: false,
						error: null
					}));
				}

				return { success: true, message: response.message as string | undefined };
			} catch (err: unknown) {
				const message = err instanceof Error ? err.message : 'Registration failed';
				update((state) => ({
					...state,
					loading: false,
					error: message
				}));
				return { success: false, error: message };
			}
		},

		logout: async () => {
			update((state) => ({ ...state, loading: true }));

			try {
				await auth.logout();
			} catch {
				// Ignore logout API errors, still clear local state
			}

			clearStorage();
			set({
				user: null,
				token: null,
				loading: false,
				error: null
			});

			goto('/signin');
		},

		clearError: () => {
			update((state) => ({ ...state, error: null }));
		},

		fetchCurrentUser: async () => {
			const state = get({ subscribe });
			if (!state.token) return;

			try {
				const response = await auth.getMe();
				const user = response as unknown as User;
				persistUser(user);
				update((s) => ({ ...s, user }));
			} catch {
				// Token might be invalid, clear auth
				clearStorage();
				set({
					user: null,
					token: null,
					loading: false,
					error: null
				});
			}
		}
	};
}

export const authStore = createAuthStore();

export const isAuthenticated = derived(authStore, ($auth) => !!$auth.token && !!$auth.user);
export const currentUser = derived(authStore, ($auth) => $auth.user);
export const authLoading = derived(authStore, ($auth) => $auth.loading);
export const authError = derived(authStore, ($auth) => $auth.error);
export const isAdmin = derived(authStore, ($auth) => $auth.user?.role === 'admin');
