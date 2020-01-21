const db = {
    users: [
        {id: '1', name: 'Francisco'},
        {id: '2', name: 'Pepe'},
        {id: '3', name: 'Alicia'},
        {id: '4', name: 'Valeria'}
    ]
};

async function list(table){
    return db[table];
}

async function get(table, id){
    let collection = await list(table);
    console.log(collection)
    return collection.filter(item => item.id === id)[0] || null; 
}

async function upsert(table, data){
    db[table].push(data);
}

function remove(table, id){
    return true;
}

module.exports = {
    list, get, upsert, remove
}