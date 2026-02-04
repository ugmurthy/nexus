<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Dialog as DialogPrimitive } from 'bits-ui';

	interface Props {
		children?: Snippet;
		open?: boolean;
		onOpenChange?: (open: boolean) => void;
	}

	let { children, open = $bindable(false), onOpenChange }: Props = $props();
</script>

<DialogPrimitive.Root bind:open {onOpenChange}>
	{#if children}
		{@render children()}
	{/if}
</DialogPrimitive.Root>
