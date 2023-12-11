async function getUser(id) {
    const response = await fetch(`http://localhost:3000/user/${id}`)
    const user = await response.json()
    return user
}

export default getUser