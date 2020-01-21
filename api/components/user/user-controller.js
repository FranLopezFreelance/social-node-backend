const table = 'users';
const nanoid = require('nanoid');
const authController = require('../auth');

module.exports = function(injectedStore){
    let store = injectedStore;

    if(!store){
        store = require('../../../store/dummy');
    }

    function list(){
        return store.list(table);
    }

    function get(id){
        return store.get(table, id);
    }

    async function upsert(body){
        const user = {
            name: body.name,
            username: body.username,
        }

        if(body.id){
            user.id = body.id;
        } else {
            user.id = nanoid();
        }

        if(body.password || body.username){
            await authController.upsert({
                id: user.id,
                username: user.username,
                password: body.password
            })
        }

        return store.upsert(table, user);
    }

    return {
        list, get, upsert
    };
}