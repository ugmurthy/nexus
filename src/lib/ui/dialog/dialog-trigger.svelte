<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Dialog as DialogPrimitive } from 'bits-ui';

	interface Props {
		children?: Snippet;
		class?: string;
	}

	let { children, class: className }: Props = $props();
</script>

<DialogPrimitive.Trigger class={className}>
	{#if children}
		{@render children()}
	{/if}
</DialogPrimitive.Trigger>
