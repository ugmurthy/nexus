<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Dialog as DialogPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils/cn';

	interface Props {
		children?: Snippet;
		class?: string;
	}

	let { children, class: className }: Props = $props();
</script>

<DialogPrimitive.Title class={cn('text-lg font-semibold leading-none tracking-tight', className)}>
	{#if children}
		{@render children()}
	{/if}
</DialogPrimitive.Title>
