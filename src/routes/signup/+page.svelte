<script lang="ts">
	import { Zap, Eye, EyeOff, Github, Mail, ArrowRight, Sparkles } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import { authStore, authLoading } from '$lib/stores/auth';

	let form = $state({
		fullName: '',
		email: '',
		password: '',
		confirmPassword: ''
	});
	let showPassword = $state(false);
	let showConfirmPassword = $state(false);
	let agreeToTerms = $state(false);
	let error = $state<string | null>(null);
	let successMessage = $state<string | null>(null);

	let submitting = $derived($authLoading);

	async function handleSubmit(e: Event) {
		e.preventDefault();
		error = null;
		successMessage = null;

		if (form.password !== form.confirmPassword) {
			error = 'Passwords do not match';
			return;
		}

		if (!agreeToTerms) {
			error = 'Please agree to the Terms of Service and Privacy Policy';
			return;
		}

		const result = await authStore.register(form.fullName, form.email, form.password);

		if (result.success) {
			if (result.message) {
				successMessage = result.message;
			} else {
				goto('/');
			}
		} else {
			error = result.error ?? 'Registration failed';
		}
	}
</script>

<svelte:head>
	<title>Sign Up — NEXUS AI</title>
	<meta name="description" content="Create your NEXUS AI account and start building autonomous agents." />
</svelte:head>

<div class="min-h-screen bg-slate-950 font-display text-white overflow-x-hidden flex flex-col">
	<!-- Animated Background -->
	<div class="fixed inset-0 z-0">
		<div class="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
		<div class="absolute inset-0 grid-bg animate-grid-flow opacity-50"></div>
		<div class="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/20 rounded-full animate-pulse-glow"></div>
		<div class="absolute bottom-1/4 -right-32 w-80 h-80 bg-purple-500/20 rounded-full animate-pulse-glow delay-200"></div>
		<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-cyan-500/5 to-transparent rounded-full"></div>
	</div>

	<!-- Header -->
	<header class="relative z-10 py-6 px-6">
		<a href="/" class="inline-flex items-center gap-3 group">
			<div class="relative w-10 h-10 flex items-center justify-center">
				<div class="absolute inset-0 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg rotate-45 group-hover:rotate-[135deg] transition-transform duration-500"></div>
				<Zap class="relative w-5 h-5 text-slate-950" />
			</div>
			<span class="text-xl font-bold tracking-tight">
				<span class="text-gradient">NEXUS</span>
				<span class="text-slate-400 font-light ml-1">AI</span>
			</span>
		</a>
	</header>

	<!-- Main Content -->
	<main class="relative z-10 flex-1 flex items-center justify-center px-6 py-12">
		<div class="w-full max-w-md">
			<!-- Card -->
			<div class="glass rounded-3xl p-8 md:p-10 glow-cyan animate-slide-up">
				<!-- Header -->
				<div class="text-center mb-8">
					<div class="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-sm mb-6">
						<Sparkles class="w-4 h-4 text-cyan-400" />
						<span class="text-slate-300">Start your journey</span>
					</div>
					<h1 class="text-3xl font-bold mb-2">
						<span class="text-gradient">Get Started</span>
					</h1>
					<p class="text-slate-400">Create your account to build autonomous agents</p>
				</div>

				<!-- Social Signup -->
				<div class="grid grid-cols-2 gap-4 mb-8">
					<button
						type="button"
						class="flex items-center justify-center gap-2 py-3 glass rounded-xl hover:border-cyan-500/30 transition-colors group"
					>
						<svg class="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" viewBox="0 0 24 24">
							<path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
							<path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
							<path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
							<path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
						</svg>
						<span class="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">Google</span>
					</button>
					<button
						type="button"
						class="flex items-center justify-center gap-2 py-3 glass rounded-xl hover:border-cyan-500/30 transition-colors group"
					>
						<Github class="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
						<span class="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">GitHub</span>
					</button>
				</div>

				<!-- Divider -->
				<div class="flex items-center gap-4 mb-8">
					<div class="flex-1 h-px bg-slate-800"></div>
					<span class="text-sm text-slate-500">or continue with email</span>
					<div class="flex-1 h-px bg-slate-800"></div>
				</div>

				<!-- Form -->
				<form onsubmit={handleSubmit} class="space-y-5">
					{#if error}
						<div class="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-sm text-red-400">
							{error}
						</div>
					{/if}

					{#if successMessage}
						<div class="p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-sm text-green-400">
							{successMessage}
						</div>
					{/if}

					<!-- Full Name -->
					<div>
						<label for="fullName" class="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
						<input
							type="text"
							id="fullName"
							bind:value={form.fullName}
							required
							class="w-full px-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-colors"
							placeholder="John Doe"
						/>
					</div>

					<!-- Email -->
					<div>
						<label for="email" class="block text-sm font-medium text-slate-300 mb-2">Email</label>
						<input
							type="email"
							id="email"
							bind:value={form.email}
							required
							class="w-full px-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-colors"
							placeholder="you@company.com"
						/>
					</div>

					<!-- Password -->
					<div>
						<label for="password" class="block text-sm font-medium text-slate-300 mb-2">Password</label>
						<div class="relative">
							<input
								type={showPassword ? 'text' : 'password'}
								id="password"
								bind:value={form.password}
								required
								class="w-full px-4 py-3 pr-12 bg-slate-900/50 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-colors"
								placeholder="••••••••"
							/>
							<button
								type="button"
								onclick={() => (showPassword = !showPassword)}
								class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
							>
								{#if showPassword}
									<EyeOff class="w-5 h-5" />
								{:else}
									<Eye class="w-5 h-5" />
								{/if}
							</button>
						</div>
					</div>

					<!-- Confirm Password -->
					<div>
						<label for="confirmPassword" class="block text-sm font-medium text-slate-300 mb-2">Confirm Password</label>
						<div class="relative">
							<input
								type={showConfirmPassword ? 'text' : 'password'}
								id="confirmPassword"
								bind:value={form.confirmPassword}
								required
								class="w-full px-4 py-3 pr-12 bg-slate-900/50 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-colors"
								placeholder="••••••••"
							/>
							<button
								type="button"
								onclick={() => (showConfirmPassword = !showConfirmPassword)}
								class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
							>
								{#if showConfirmPassword}
									<EyeOff class="w-5 h-5" />
								{:else}
									<Eye class="w-5 h-5" />
								{/if}
							</button>
						</div>
					</div>

					<!-- Terms Checkbox -->
					<div class="flex items-start gap-3">
						<input
							type="checkbox"
							id="terms"
							bind:checked={agreeToTerms}
							class="mt-1 w-4 h-4 rounded border-slate-700 bg-slate-900/50 text-cyan-500 focus:ring-cyan-500/50 focus:ring-offset-0 cursor-pointer"
						/>
						<label for="terms" class="text-sm text-slate-400 cursor-pointer">
							I agree to the <a href="/terms" class="text-cyan-400 hover:text-cyan-300 transition-colors">Terms of Service</a> and <a href="/privacy" class="text-cyan-400 hover:text-cyan-300 transition-colors">Privacy Policy</a>
						</label>
					</div>

					<!-- Submit Button -->
					<button
						type="submit"
						disabled={submitting}
						class="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-semibold text-slate-950 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
					>
						{#if submitting}
							<div class="w-5 h-5 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin"></div>
							Creating Account...
						{:else}
							Create Account
							<ArrowRight class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
						{/if}
					</button>
				</form>

				<!-- Sign In Link -->
				<p class="text-center text-sm text-slate-400 mt-8">
					Already have an account?
					<a href="/signin" class="text-cyan-400 hover:text-cyan-300 transition-colors font-medium">Sign In</a>
				</p>
			</div>
		</div>
	</main>

	<!-- Footer -->
	<footer class="relative z-10 py-6 px-6 text-center">
		<div class="text-sm text-slate-600">
			© 2025 NEXUS AI. All rights reserved.
		</div>
	</footer>
</div>
