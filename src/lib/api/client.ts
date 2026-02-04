import { ApiClient } from 'desiClient';
import { browser } from '$app/environment';
import { env } from '$env/dynamic/public';

const baseUrl = env.PUBLIC_API_URL ?? 'http://localhost:3000';

export const apiClient = new ApiClient({
	baseUrl
});

export const agents = apiClient.agents;
export const dags = apiClient.dags;
export const executions = apiClient.executions;
export const tools = apiClient.tools;
export const artifacts = apiClient.artifacts;
export const costs = apiClient.costs;
export const billing = apiClient.billing;
export const health = apiClient.health;
export const auth = apiClient.auth;
export const users = apiClient.users;
export const admin = apiClient.admin;

export function setAuthToken(token: string) {
	apiClient.setToken(token);
}
