import { Fzearch } from '../src';

describe('Search with class instance', () => {
	describe('Testing with titles', () => {
		let fzearch: Fzearch;

		const db = [
			'Algorithm of Searching Agentsz',
			'Debounce and Throttle',
			'React Hooks',
			'Persisting State in React',
			'Deep Copy and Shadow Copy in Javascript',
			'Common React Mistakes',
		];

		const search: { query: string; firstResult: string }[] = [
			{
				query: 'React',
				firstResult: 'React Hooks',
			},
			{
				query: 'React Hooks',
				firstResult: 'React Hooks',
			},
			{
				query: 'co re mis',
				firstResult: 'Common React Mistakes',
			},
			{
				query: 'per in',
				firstResult: 'Persisting State in React',
			},
		];

		beforeEach(() => {
			fzearch = new Fzearch(db);
		});

		search.forEach(({ query, firstResult }) => {
			it(`should return ${firstResult} as the first result when searching for ${query}`, () => {
				expect(fzearch.search(query)[0]).toEqual(firstResult);
			});
		});

		describe('Testing with words', () => {
			let fzearch: Fzearch;

			const db = ['algorithm', 'searching', 'agents', 'debounce', 'throttle'];

			const search: { query: string; firstResult: string }[] = [
				{
					query: 'searching',
					firstResult: 'searching',
				},
				{
					query: 'se',
					firstResult: 'searching',
				},
				{
					query: 'searching agents',
					firstResult: 'searching',
				},
			];

			beforeEach(() => {
				fzearch = new Fzearch(db);
			});

			search.forEach(({ query, firstResult }) => {
				it(`should return ${firstResult} as the first result when searching for ${query}`, () => {
					expect(fzearch.search(query)[0]).toEqual(firstResult);
				});
			});
		});
	});
});

describe('Search with static function', () => {
	describe('Testing with titles', () => {
		const db = [
			'Algorithm of Searching Agentsz',
			'Debounce and Throttle',
			'React Hooks',
			'Persisting State in React',
			'Deep Copy and Shadow Copy in Javascript',
			'Common React Mistakes',
		];

		const search: { query: string; firstResult: string }[] = [
			{
				query: 'React',
				firstResult: 'React Hooks',
			},
			{
				query: 'React Hooks',
				firstResult: 'React Hooks',
			},
			{
				query: 'co re mis',
				firstResult: 'Common React Mistakes',
			},
			{
				query: 'per in',
				firstResult: 'Persisting State in React',
			},
		];

		search.forEach(({ query, firstResult }) => {
			it(`should return ${firstResult} as the first result when searching for ${query}`, () => {
				expect(Fzearch.search(query, db)[0]).toEqual(firstResult);
			});
		});

		describe('Testing with words', () => {
			const db = ['algorithm', 'searching', 'agents', 'debounce', 'throttle'];

			const search: { query: string; firstResult: string }[] = [
				{
					query: 'searching',
					firstResult: 'searching',
				},
				{
					query: 'se',
					firstResult: 'searching',
				},
				{
					query: 'searching agents',
					firstResult: 'searching',
				},
			];

			search.forEach(({ query, firstResult }) => {
				it(`should return ${firstResult} as the first result when searching for ${query}`, () => {
					expect(Fzearch.search(query, db)[0]).toEqual(firstResult);
				});
			});
		});
	});
});

describe('Test with custom function', () => {
	const getPenalty = (dist: number): number => {
		return dist * 20;
	};

	const getSimilarity = (char1: string, char2: string): number => {
		return char1[0] === char2[0] ? 10 : -10;
	};

	const db = ['algorithm', 'searching', 'agents', 'debounce', 'throttle'];
	const query = 'searching agents';

	let fzearch: Fzearch;
	beforeEach(() => {
		fzearch = new Fzearch(db);
	});

	it("should return 'searching' as the first result", () => {
		expect(fzearch.search(query, { getPenalty, getSimilarity })[0]).toEqual(
			'searching'
		);
	});
});

describe('Test maxResults', () => {
	let fzearch: Fzearch;

	const db = ['algorithm', 'searching', 'agents', 'debounce', 'throttle'];
	const query = 'searching agents';

	beforeEach(() => {
		fzearch = new Fzearch(db, 2);
	});

	it('should return 2 results', () => {
		expect(fzearch.search(query).length).toEqual(2);
	});
});

describe('Test for case sensitivity', () => {
  let fzearch: Fzearch;

  const db = ['React', 'react', 'REACT', 'rEaCt'];

  it("should return 'REACT' as the first result if we seach 'REACt", () => {
    fzearch = new Fzearch(db);
    expect(fzearch.search('REACt')[0]).toEqual('REACT');
  })
})