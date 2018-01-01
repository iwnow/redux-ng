
export interface ICounter {
	id: number;
	count: number;
}

export interface ICounterModuleStore {
	counters: ICounter[];
}
