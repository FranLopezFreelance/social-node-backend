const TABLE = 'auth';
const jwt = require('../../../jwt');
const bcrypt = require('bcrypt');

module.exports = function(injectedStore){
    let store = injectedStore;

    if(!store){
        store = require('../../../store/dummy');
    }

    async function login(username, password){
        const data = await store.query(TABLE, { username });
        const equals = await bcrypt.compare(password, data.password);
        if(!equals){
            throw new Error('Información inválida');
        }
        return jwt.sign(data);
    }

    async function upsert(data){
        const authData = { id: data.id };
        (data.username) ? authData.username = data.username : '';
        (data.password) ? authData.password = await bcrypt.hash(data.password, 5) : '';
        return store.upsert(TABLE, authData);
    }

    return {
        login, upsert
    };
}

