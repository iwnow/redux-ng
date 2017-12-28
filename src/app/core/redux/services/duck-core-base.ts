import { ReduxActionsCoreService, IActionFabric } from './redux-actions-core.service';

export class DuckCoreBase {
	protected readonly actionFabric: IActionFabric;

	constructor(
		protected readonly actionService: ReduxActionsCoreService,
		protected readonly scopeName: string
	) {
		this.actionFabric = actionService.createActionFabric(scopeName);
	}
}
