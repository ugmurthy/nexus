import { writable } from 'svelte/store';

export interface Notification {
	id: string;
	type: 'success' | 'error' | 'warning' | 'info';
	message: string;
	timeout?: number;
}

function createNotificationStore() {
	const { subscribe, update } = writable<Notification[]>([]);

	function addNotification(notification: Omit<Notification, 'id'>) {
		const id = crypto.randomUUID();
		const newNotification = { ...notification, id };

		update((notifications) => [...notifications, newNotification]);

		const timeout = notification.timeout ?? 5000;
		if (timeout > 0) {
			setTimeout(() => {
				removeNotification(id);
			}, timeout);
		}

		return id;
	}

	function removeNotification(id: string) {
		update((notifications) => notifications.filter((n) => n.id !== id));
	}

	return {
		subscribe,
		addNotification,
		removeNotification
	};
}

export const notifications = createNotificationStore();
export const addNotification = notifications.addNotification;
export const removeNotification = notifications.removeNotification;
