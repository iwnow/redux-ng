import { ReduxActionsCoreService, IActionFabric } from './redux-actions-core.service';

export abstract class DuckCoreBase {
	protected readonly actionFabric: IActionFabric;

	constructor(
		protected readonly actionService: ReduxActionsCoreService,
		protected readonly scopeName: string
	) {
		this.actionFabric = actionService.createActionFabric(scopeName);
	}

	abstract getActions(): string[];
	abstract getEpics(): any[];
}
