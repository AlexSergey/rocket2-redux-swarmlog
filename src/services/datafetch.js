import _fetch from 'isomorphic-fetch';

const url = 'https://restcountries.eu/rest/v1/currency/eur';

export function getIssues() {
    return _fetch(url).then((r) => r.json());
}