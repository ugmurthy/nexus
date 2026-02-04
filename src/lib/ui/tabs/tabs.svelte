<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Tabs as TabsPrimitive } from 'bits-ui';

	interface Props {
		children?: Snippet;
		value?: string;
		onValueChange?: (value: string) => void;
		class?: string;
	}

	let { children, value = $bindable(''), onValueChange, class: className }: Props = $props();
</script>

<TabsPrimitive.Root bind:value {onValueChange} class={className}>
	{#if children}
		{@render children()}
	{/if}
</TabsPrimitive.Root>
