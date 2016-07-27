var reduxSwarmLogId = {};

/**
 * For debug we used SwarmLog
 * It is IndexDB state managment system
 * Any changes what set for _setAction will be save in IndexDB
 * And after reload page or open on any devices we set all changes from stack
 * */

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    var keys = require('../keys.json');
    var keyToUriId = require('@philholden/redux-swarmlog').keyToUriId;
    reduxSwarmLogId = keyToUriId(keys.public);
}

export default function(action) {
    return Object.assign({}, action, {reduxSwarmLogId});
}