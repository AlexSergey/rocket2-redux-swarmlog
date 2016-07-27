import _fetch from 'isomorphic-fetch';
import env from '../env.js';

const url = `${env}/api/works`;

function deleteWork(index) {
    return _fetch(`${url}/${index}`, {
        method: 'DELETE',
        data: {
            works_id: index
        }
    }).then((r) => r.json());
}

function updateWork(work) {
    return _fetch(`${url}/${work._id}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            name: work.name,
            description: work.description
        })
    }).then((r) => r.json());
}

function getWorks() {
    return _fetch(url).then((r) => r.json());
}

function postWork(payload) {
    var data = new FormData();
    data.append('json', JSON.stringify(payload));

    return _fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify( payload )
    }).then((r) => r.json());
}

export default {
    deleteWork,
    updateWork,
    getWorks,
    postWork
};