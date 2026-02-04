<script lang="ts">
	import { Menu, X, Zap, Brain, Workflow, Shield, ArrowRight, Sparkles, Bot, Network, ChevronDown, LogOut } from 'lucide-svelte';
	import { authStore, isAuthenticated, currentUser } from '$lib/stores/auth';

	let mobileMenuOpen = $state(false);
	let contactForm = $state({
		name: '',
		email: '',
		message: ''
	});
	let formSubmitting = $state(false);
	let formSuccess = $state(false);

	const menuItems = [
		{ label: 'Features', href: '#features' },
		{ label: 'About', href: '#about' },
		{ label: 'Pricing', href: '#pricing' },
		{ label: 'Contact', href: '#contact' }
	];

	const features = [
		{ 
			icon: Brain, 
			title: 'Autonomous Reasoning', 
			desc: 'Agents that think, plan, and execute complex multi-step tasks independently' 
		},
		{ 
			icon: Workflow, 
			title: 'DAG Orchestration', 
			desc: 'Visual workflow builder with intelligent dependency resolution' 
		},
		{ 
			icon: Network, 
			title: 'Multi-Agent Swarms', 
			desc: 'Coordinate dozens of specialized agents working in parallel' 
		},
		{ 
			icon: Shield, 
			title: 'Enterprise Security', 
			desc: 'SOC2 compliant with granular access controls and audit logs' 
		}
	];

	async function handleContactSubmit(e: Event) {
		e.preventDefault();
		formSubmitting = true;
		await new Promise(resolve => setTimeout(resolve, 1500));
		formSubmitting = false;
		formSuccess = true;
		contactForm = { name: '', email: '', message: '' };
	}
</script>

<svelte:head>
	<title>NEXUS AI — Autonomous Agent Platform</title>
	<meta name="description" content="Deploy intelligent AI agents that reason, plan, and execute. The future of autonomous automation." />
</svelte:head>

<div class="min-h-screen bg-slate-950 font-display text-white overflow-x-hidden">
	<!-- Animated Background -->
	<div class="fixed inset-0 z-0">
		<div class="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
		<div class="absolute inset-0 grid-bg animate-grid-flow opacity-50"></div>
		<div class="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/20 rounded-full animate-pulse-glow"></div>
		<div class="absolute bottom-1/4 -right-32 w-80 h-80 bg-purple-500/20 rounded-full animate-pulse-glow delay-200"></div>
		<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-cyan-500/5 to-transparent rounded-full"></div>
	</div>

	<!-- Navigation -->
	<nav class="fixed top-0 left-0 right-0 z-50 glass">
		<div class="max-w-7xl mx-auto px-6 py-4">
			<div class="flex items-center justify-between">
				<!-- Logo -->
				<a href="/" class="flex items-center gap-3 group">
					<div class="relative w-10 h-10 flex items-center justify-center">
						<div class="absolute inset-0 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg rotate-45 group-hover:rotate-[135deg] transition-transform duration-500"></div>
						<Zap class="relative w-5 h-5 text-slate-950" />
					</div>
					<span class="text-xl font-bold tracking-tight">
						<span class="text-gradient">NEXUS</span>
						<span class="text-slate-400 font-light ml-1">AI</span>
					</span>
				</a>

				<!-- Desktop Menu -->
				<div class="hidden md:flex items-center gap-8">
					{#each menuItems as item}
						<a 
							href={item.href} 
							class="text-slate-400 hover:text-cyan-400 transition-colors duration-300 text-sm font-medium tracking-wide"
						>
							{item.label}
						</a>
					{/each}
				</div>

				<!-- Auth Buttons -->
				<div class="hidden md:flex items-center gap-4">
					{#if $isAuthenticated}
						<span class="text-slate-400 text-sm">
							{$currentUser?.name || $currentUser?.email}
						</span>
						<button
							onclick={() => authStore.logout()}
							class="flex items-center gap-2 text-slate-300 hover:text-white transition-colors px-4 py-2 text-sm font-medium"
						>
							<LogOut class="w-4 h-4" />
							Sign Out
						</button>
					{:else}
						<a 
							href="/signin" 
							class="text-slate-300 hover:text-white transition-colors px-4 py-2 text-sm font-medium"
						>
							Sign In
						</a>
						<a 
							href="/signup" 
							class="relative group px-5 py-2.5 overflow-hidden"
						>
							<div class="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"></div>
							<div class="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-lg"></div>
							<span class="relative text-sm font-semibold text-slate-950">Get Started</span>
						</a>
					{/if}
				</div>

				<!-- Mobile Menu Toggle -->
				<button 
					class="md:hidden text-slate-400 hover:text-white p-2"
					onclick={() => mobileMenuOpen = !mobileMenuOpen}
				>
					{#if mobileMenuOpen}
						<X class="w-6 h-6" />
					{:else}
						<Menu class="w-6 h-6" />
					{/if}
				</button>
			</div>

			<!-- Mobile Menu -->
			{#if mobileMenuOpen}
				<div class="md:hidden mt-4 pb-4 border-t border-slate-800/50 pt-4 animate-slide-up">
					<div class="flex flex-col gap-4">
						{#each menuItems as item}
							<a 
								href={item.href} 
								class="text-slate-400 hover:text-cyan-400 transition-colors text-sm font-medium"
								onclick={() => mobileMenuOpen = false}
							>
								{item.label}
							</a>
						{/each}
						<hr class="border-slate-800" />
						{#if $isAuthenticated}
							<span class="text-slate-400 text-sm">{$currentUser?.name || $currentUser?.email}</span>
							<button
								onclick={() => { mobileMenuOpen = false; authStore.logout(); }}
								class="flex items-center justify-center gap-2 text-slate-300 hover:text-white text-sm font-medium"
							>
								<LogOut class="w-4 h-4" />
								Sign Out
							</button>
						{:else}
							<a href="/signin" class="text-slate-300 hover:text-white text-sm font-medium">Sign In</a>
							<a href="/signup" class="bg-gradient-to-r from-cyan-500 to-purple-500 text-slate-950 px-4 py-2 rounded-full text-sm font-semibold text-center">
								Get Started
							</a>
						{/if}
					</div>
				</div>
			{/if}
		</div>
	</nav>

	<!-- Hero Section -->
	<section class="relative z-10 min-h-screen flex items-center pt-24 pb-16">
		<div class="max-w-7xl mx-auto px-6 w-full">
			<div class="grid lg:grid-cols-2 gap-16 items-center">
				<!-- Left Content -->
				<div class="space-y-8">
					<div class="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-sm opacity-0 animate-fade-in">
						<Sparkles class="w-4 h-4 text-cyan-400" />
						<span class="text-slate-300">Introducing Autonomous AI Agents</span>
					</div>
					
					<h1 class="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight opacity-0 animate-slide-up delay-100">
						<span class="text-white">Build AI that</span><br />
						<span class="text-gradient glow-text">thinks & acts</span>
					</h1>
					
					<p class="text-lg md:text-xl text-slate-400 max-w-xl leading-relaxed opacity-0 animate-slide-up delay-200">
						Deploy intelligent agents that reason through complex problems, 
						orchestrate multi-step workflows, and deliver results autonomously.
					</p>
					
					<div class="flex flex-col sm:flex-row gap-4 opacity-0 animate-slide-up delay-300">
						<a 
							href="/signup" 
							class="group relative inline-flex items-center justify-center gap-2 px-8 py-4 overflow-hidden rounded-full"
						>
							<div class="absolute inset-0 bg-gradient-to-r from-cyan-500 via-cyan-400 to-purple-500 transition-transform group-hover:scale-105"></div>
							<div class="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
							<span class="relative font-semibold text-slate-950">Start Building Free</span>
							<ArrowRight class="relative w-5 h-5 text-slate-950 group-hover:translate-x-1 transition-transform" />
						</a>
						<a 
							href="#features" 
							class="group inline-flex items-center justify-center gap-2 px-8 py-4 glass rounded-full hover:border-cyan-500/30 transition-colors"
						>
							<span class="font-medium text-slate-300 group-hover:text-white transition-colors">See Features</span>
							<ChevronDown class="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
						</a>
					</div>

					<!-- Stats -->
					<div class="flex items-center gap-8 pt-4 opacity-0 animate-fade-in delay-500">
						<div>
							<div class="text-3xl font-bold text-gradient">50M+</div>
							<div class="text-sm text-slate-500">Tasks Completed</div>
						</div>
						<div class="w-px h-12 bg-slate-800"></div>
						<div>
							<div class="text-3xl font-bold text-gradient">99.9%</div>
							<div class="text-sm text-slate-500">Uptime SLA</div>
						</div>
						<div class="w-px h-12 bg-slate-800"></div>
						<div>
							<div class="text-3xl font-bold text-gradient">10x</div>
							<div class="text-sm text-slate-500">Faster Workflows</div>
						</div>
					</div>
				</div>

				<!-- Right Visual -->
				<div class="relative hidden lg:block">
					<div class="relative animate-float">
						<!-- Main Agent Node -->
						<div class="relative w-72 h-72 mx-auto">
							<div class="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-3xl rotate-6 blur-xl"></div>
							<div class="relative glass rounded-3xl p-8 h-full flex flex-col items-center justify-center glow-cyan">
								<Bot class="w-20 h-20 text-cyan-400 mb-4" />
								<div class="font-mono text-sm text-cyan-400 mb-2">AGENT_001</div>
								<div class="text-xs text-slate-500 text-center">Autonomous Reasoning Engine</div>
								<div class="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
							</div>
						</div>

						<!-- Orbiting Elements -->
						<div class="absolute top-0 right-0 glass rounded-xl p-4 animate-slide-in-left delay-200">
							<Brain class="w-8 h-8 text-purple-400" />
						</div>
						<div class="absolute bottom-10 left-0 glass rounded-xl p-4 animate-slide-in-left delay-400">
							<Workflow class="w-8 h-8 text-cyan-400" />
						</div>
						<div class="absolute bottom-0 right-10 glass rounded-xl p-4 animate-slide-in-left delay-300">
							<Network class="w-8 h-8 text-pink-400" />
						</div>

						<!-- Connection Lines SVG -->
						<svg class="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
							<defs>
								<linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
									<stop offset="0%" stop-color="#00ffd1" stop-opacity="0.5" />
									<stop offset="100%" stop-color="#7b2cbf" stop-opacity="0.5" />
								</linearGradient>
							</defs>
							<line x1="200" y1="150" x2="330" y2="50" stroke="url(#line-gradient)" stroke-width="1" stroke-dasharray="5,5">
								<animate attributeName="stroke-dashoffset" from="0" to="-20" dur="1s" repeatCount="indefinite" />
							</line>
							<line x1="200" y1="250" x2="70" y2="320" stroke="url(#line-gradient)" stroke-width="1" stroke-dasharray="5,5">
								<animate attributeName="stroke-dashoffset" from="0" to="-20" dur="1s" repeatCount="indefinite" />
							</line>
							<line x1="200" y1="280" x2="310" y2="350" stroke="url(#line-gradient)" stroke-width="1" stroke-dasharray="5,5">
								<animate attributeName="stroke-dashoffset" from="0" to="-20" dur="1s" repeatCount="indefinite" />
							</line>
						</svg>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Features Section -->
	<section id="features" class="relative z-10 py-24">
		<div class="max-w-7xl mx-auto px-6">
			<div class="text-center mb-16">
				<h2 class="text-4xl md:text-5xl font-bold mb-4">
					<span class="text-gradient">Powerful</span> Capabilities
				</h2>
				<p class="text-slate-400 text-lg max-w-2xl mx-auto">
					Everything you need to deploy, manage, and scale autonomous AI agents
				</p>
			</div>

			<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
				{#each features as feature, i}
					<div 
						class="group glass rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-500 hover:-translate-y-2"
						style="animation-delay: {i * 100}ms"
					>
						<div class="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
							<feature.icon class="w-7 h-7 text-cyan-400" />
						</div>
						<h3 class="text-lg font-semibold mb-2 text-white">{feature.title}</h3>
						<p class="text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- About Section -->
	<section id="about" class="relative z-10 py-24">
		<div class="max-w-7xl mx-auto px-6">
			<div class="grid lg:grid-cols-2 gap-16 items-center">
				<div>
					<h2 class="text-4xl md:text-5xl font-bold mb-6">
						The <span class="text-gradient">future</span> of automation is autonomous
					</h2>
					<div class="space-y-4 text-slate-400">
						<p class="text-lg leading-relaxed">
							NEXUS AI represents a paradigm shift in how we think about automation. 
							Instead of rigid, rule-based workflows, our agents use advanced reasoning 
							to understand goals, break down complex tasks, and adapt in real-time.
						</p>
						<p class="leading-relaxed">
							Built on cutting-edge large language models and reinforcement learning, 
							our platform enables agents that can handle ambiguity, learn from feedback, 
							and collaborate with humans and other agents seamlessly.
						</p>
						<p class="leading-relaxed">
							From customer support to data analysis, from content creation to code generation — 
							NEXUS agents work 24/7, never tire, and continuously improve.
						</p>
					</div>
					<div class="mt-8 flex items-center gap-6">
						<div class="flex -space-x-3">
							{#each Array(5) as _, i}
								<div 
									class="w-10 h-10 rounded-full border-2 border-slate-950 bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-xs font-bold text-slate-950"
								>
									{String.fromCharCode(65 + i)}
								</div>
							{/each}
						</div>
						<div class="text-sm">
							<div class="text-white font-medium">Trusted by 1000+ teams</div>
							<div class="text-slate-500">From startups to Fortune 500</div>
						</div>
					</div>
				</div>

				<div class="relative">
					<div class="glass rounded-3xl p-8 space-y-6">
						<div class="flex items-center gap-4 pb-4 border-b border-slate-800">
							<div class="w-3 h-3 rounded-full bg-red-500"></div>
							<div class="w-3 h-3 rounded-full bg-yellow-500"></div>
							<div class="w-3 h-3 rounded-full bg-green-500"></div>
							<span class="text-slate-500 text-sm font-mono ml-4">agent_workflow.yaml</span>
						</div>
						<pre class="font-mono text-sm text-slate-300 overflow-x-auto"><code class="text-cyan-400">agents:</code>
<code class="text-slate-500">  - name:</code> <code class="text-green-400">"research-agent"</code>
<code class="text-slate-500">    model:</code> <code class="text-purple-400">gpt-4-turbo</code>
<code class="text-slate-500">    tools:</code>
<code class="text-slate-400">      - web_search</code>
<code class="text-slate-400">      - document_analysis</code>
<code class="text-slate-500">    goal:</code> <code class="text-yellow-400">"Find market insights"</code>

<code class="text-cyan-400">workflow:</code>
<code class="text-slate-500">  parallel:</code> <code class="text-orange-400">true</code>
<code class="text-slate-500">  retry:</code> <code class="text-orange-400">3</code>
<code class="text-slate-500">  timeout:</code> <code class="text-orange-400">300s</code></pre>
						<div class="animate-shimmer h-px"></div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Pricing Preview -->
	<section id="pricing" class="relative z-10 py-24">
		<div class="max-w-7xl mx-auto px-6">
			<div class="text-center mb-16">
				<h2 class="text-4xl md:text-5xl font-bold mb-4">
					Simple, <span class="text-gradient">transparent</span> pricing
				</h2>
				<p class="text-slate-400 text-lg">Start free, scale as you grow</p>
			</div>

			<div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
				<!-- Starter -->
				<div class="glass rounded-2xl p-8 flex flex-col">
					<div class="text-slate-400 text-sm font-medium mb-2">Starter</div>
					<div class="text-4xl font-bold mb-1">Free</div>
					<div class="text-slate-500 text-sm mb-6">Forever</div>
					<ul class="space-y-3 text-sm text-slate-300 flex-1">
						<li class="flex items-center gap-2">
							<div class="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
							3 Active Agents
						</li>
						<li class="flex items-center gap-2">
							<div class="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
							1,000 tasks/month
						</li>
						<li class="flex items-center gap-2">
							<div class="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
							Community support
						</li>
					</ul>
					<a href="/signup" class="mt-8 block text-center py-3 border border-slate-700 rounded-full text-sm font-medium hover:border-cyan-500/50 hover:text-cyan-400 transition-colors">
						Get Started
					</a>
				</div>

				<!-- Pro - Featured -->
				<div class="relative glass rounded-2xl p-8 flex flex-col border-cyan-500/30">
					<div class="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-xs font-semibold text-slate-950">
						Most Popular
					</div>
					<div class="text-cyan-400 text-sm font-medium mb-2">Pro</div>
					<div class="text-4xl font-bold mb-1">$49<span class="text-lg text-slate-500">/mo</span></div>
					<div class="text-slate-500 text-sm mb-6">Per seat</div>
					<ul class="space-y-3 text-sm text-slate-300 flex-1">
						<li class="flex items-center gap-2">
							<div class="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
							Unlimited Agents
						</li>
						<li class="flex items-center gap-2">
							<div class="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
							50,000 tasks/month
						</li>
						<li class="flex items-center gap-2">
							<div class="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
							Priority support
						</li>
						<li class="flex items-center gap-2">
							<div class="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
							Custom integrations
						</li>
					</ul>
					<a href="/signup" class="mt-8 block text-center py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-sm font-semibold text-slate-950 hover:opacity-90 transition-opacity">
						Start Free Trial
					</a>
				</div>

				<!-- Enterprise -->
				<div class="glass rounded-2xl p-8 flex flex-col">
					<div class="text-slate-400 text-sm font-medium mb-2">Enterprise</div>
					<div class="text-4xl font-bold mb-1">Custom</div>
					<div class="text-slate-500 text-sm mb-6">Contact us</div>
					<ul class="space-y-3 text-sm text-slate-300 flex-1">
						<li class="flex items-center gap-2">
							<div class="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
							Unlimited everything
						</li>
						<li class="flex items-center gap-2">
							<div class="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
							Dedicated support
						</li>
						<li class="flex items-center gap-2">
							<div class="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
							SLA guarantees
						</li>
						<li class="flex items-center gap-2">
							<div class="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
							On-premise option
						</li>
					</ul>
					<a href="#contact" class="mt-8 block text-center py-3 border border-slate-700 rounded-full text-sm font-medium hover:border-cyan-500/50 hover:text-cyan-400 transition-colors">
						Contact Sales
					</a>
				</div>
			</div>
		</div>
	</section>

	<!-- Contact Section -->
	<section id="contact" class="relative z-10 py-24">
		<div class="max-w-3xl mx-auto px-6">
			<div class="glass rounded-3xl p-8 md:p-12">
				<div class="text-center mb-10">
					<h2 class="text-3xl md:text-4xl font-bold mb-4">
						Get in <span class="text-gradient">touch</span>
					</h2>
					<p class="text-slate-400">Have questions? We'd love to hear from you.</p>
				</div>

				{#if formSuccess}
					<div class="text-center py-12">
						<div class="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
							<Sparkles class="w-8 h-8 text-cyan-400" />
						</div>
						<h3 class="text-xl font-semibold text-white mb-2">Message Sent!</h3>
						<p class="text-slate-400">We'll get back to you within 24 hours.</p>
					</div>
				{:else}
					<form onsubmit={handleContactSubmit} class="space-y-6">
						<div class="grid md:grid-cols-2 gap-6">
							<div>
								<label for="name" class="block text-sm font-medium text-slate-300 mb-2">Name</label>
								<input 
									type="text" 
									id="name"
									bind:value={contactForm.name}
									required
									class="w-full px-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-colors"
									placeholder="Your name"
								/>
							</div>
							<div>
								<label for="email" class="block text-sm font-medium text-slate-300 mb-2">Email</label>
								<input 
									type="email" 
									id="email"
									bind:value={contactForm.email}
									required
									class="w-full px-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-colors"
									placeholder="you@company.com"
								/>
							</div>
						</div>
						<div>
							<label for="message" class="block text-sm font-medium text-slate-300 mb-2">Message</label>
							<textarea 
								id="message"
								bind:value={contactForm.message}
								required
								rows="4"
								class="w-full px-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-colors resize-none"
								placeholder="Tell us about your project..."
							></textarea>
						</div>
						<button 
							type="submit"
							disabled={formSubmitting}
							class="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-semibold text-slate-950 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
						>
							{#if formSubmitting}
								<div class="w-5 h-5 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin"></div>
								Sending...
							{:else}
								Send Message
								<ArrowRight class="w-5 h-5" />
							{/if}
						</button>
					</form>
				{/if}
			</div>
		</div>
	</section>

	<!-- Footer -->
	<footer class="relative z-10 py-12 border-t border-slate-800/50">
		<div class="max-w-7xl mx-auto px-6">
			<div class="flex flex-col md:flex-row items-center justify-between gap-6">
				<div class="flex items-center gap-3">
					<div class="relative w-8 h-8 flex items-center justify-center">
						<div class="absolute inset-0 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg rotate-45"></div>
						<Zap class="relative w-4 h-4 text-slate-950" />
					</div>
					<span class="font-bold text-gradient">NEXUS AI</span>
				</div>
				<div class="flex items-center gap-8 text-sm text-slate-500">
					<a href="/privacy" class="hover:text-slate-300 transition-colors">Privacy</a>
					<a href="/terms" class="hover:text-slate-300 transition-colors">Terms</a>
					<a href="/docs" class="hover:text-slate-300 transition-colors">Docs</a>
					<a href="/status" class="hover:text-slate-300 transition-colors">Status</a>
				</div>
				<div class="text-sm text-slate-600">
					© 2025 NEXUS AI. All rights reserved.
				</div>
			</div>
		</div>
	</footer>
</div>
