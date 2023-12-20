import mockedData from "../mockedData/mockedUser.json"


async function getUser(id, isMockedData) {
    if (isMockedData) {
        return mockedData.user
    } else {
        const response = await fetch(`http://localhost:3000/user/${id}`)
        const user = await response.json()
        return user        
    }
}

async function getPerformance(id) {
    const response = await fetch(`http://localhost:3000/user/${id}/performance`)
    const user = await response.json()
    return user         
}

async function getActivity(id, isMockedData) {
    if (isMockedData) {
        return mockedData.activity
    } else {
        const response = await fetch(`http://localhost:3000/user/${id}/activity`)
        const user = await response.json()
        return user        
    }   
}

async function getAverageSessions(id, isMockedData) {
    if (isMockedData) {
        return mockedData.averageSessions
    } else {
        const response = await fetch(`http://localhost:3000/user/${id}/average-sessions`)
        const user = await response.json()
        return user        
    }   
}

export { getUser, getActivity, getPerformance, getAverageSessions }