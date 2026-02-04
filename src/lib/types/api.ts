export interface Run {
	id: string;
	status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
	goalId?: string;
	agentId?: string;
	createdAt?: string;
	updatedAt?: string;
	startedAt?: string;
	completedAt?: string;
	error?: string;
	metadata?: Record<string, unknown>;
	stepsExecuted?: number;
	stepBudget?: number;
	finalOutput?: string;
}

export interface RunWithGoal extends Run {
	goal?: {
		id: string;
		objective: string;
		status: string;
	};
}

export interface Step {
	id: string;
	runId: string;
	stepNumber: number;
	status: 'pending' | 'running' | 'completed' | 'failed';
	input?: string;
	output?: string;
	toolName?: string;
	createdAt?: string;
	completedAt?: string;
	error?: string;
}

export interface Agent {
	id: string;
	name: string;
	description?: string;
	status: 'active' | 'inactive';
	promptTemplate?: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface Goal {
	id: string;
	objective: string;
	status: 'pending' | 'active' | 'completed' | 'failed' | 'cancelled';
	agentId?: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface DAG {
	id: string;
	name: string;
	status: 'pending' | 'active' | 'paused' | 'completed' | 'failed' | 'cancelled';
	nodes?: DAGNode[];
	createdAt?: string;
	updatedAt?: string;
}

export interface DAGNode {
	id: string;
	dagId: string;
	nodeType: string;
	status: string;
	dependencies?: string[];
}
