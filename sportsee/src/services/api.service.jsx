async function getUser(userId) {
    const response = await fetch(`http://localhost:3000/user/${userId}`)
    const user = await response.json()
    return user        
}

async function getPerformance(userId) {
    const response = await fetch(`http://localhost:3000/user/${userId}/performance`)
    const user = await response.json()
    return user         
}

async function getActivity(userId) {
    const response = await fetch(`http://localhost:3000/user/${userId}/activity`)
    const user = await response.json()
    return user        
}

async function getAverageSessions(userId) {
    const response = await fetch(`http://localhost:3000/user/${userId}/average-sessions`)
    const user = await response.json()
    return user        
}

export { getUser, getActivity, getPerformance, getAverageSessions }