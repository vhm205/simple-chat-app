const users = []

const addUser = ({ id, name, room }) => {
    name = name.trim()
    room = room.trim()

    const existsUser = users.find(u => u.name === name && u.room === room)

    if(!name || !room) return { error: 'Username and room are required.' };
    if(existsUser) return { error: 'Username is taken' }

    const user = { id, name, room }
    users.push(user)

    return { user }
}

const removeUser = id => {
    const index = users.findIndex(u => u.id === id)

    if(index !== -1){
        return users.splice(index, 1)[0]
    }
}

const getUser = id => users.find(u => u.id === id)
const getUserInRoom = room => users.filter(u => u.room === room)

module.exports = {
    addUser, removeUser, getUser, getUserInRoom
}