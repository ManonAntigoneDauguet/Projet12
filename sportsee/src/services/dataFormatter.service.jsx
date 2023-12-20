import mockedData from "../mockedData/mockedUser.json"
import { getActivity, getAverageSessions, getUser, getPerformance } from "./api.service"

const isMockedData = false

function splitThousand(data) {
    data = Array.from(String(data))
    let length = data.length
    if (length > 3) {
        data.splice(length - 3, 0, ",")
        data.push("k")
    }
    return data.join('')
}

async function formatPerformance(userId) {
    let data
    if (isMockedData) {
        data = mockedData.performance
    } else {
       data = await getPerformance(userId)
    }  

    let formatedData = {
        "data" : [
            {
                "value": data.data.data[5].value,
                "kind": "Intensité"
            },
            {
                "value": data.data.data[4].value,
                "kind": "Vitesse"
            },   
            {
                "value": data.data.data[3].value,
                "kind": "Force"
            },    
            {
                "value": data.data.data[2].value,
                "kind": "Endurance"
            },       
            {
                "value": data.data.data[1].value,
                "kind": "Energie"
            },                                         
            {
                "value": data.data.data[0].value,
                "kind": "Cardio"
            },
        ]
    }

    return formatedData.data
}

async function formatActivity(userId) {
    let data
    if (isMockedData) {
        data = mockedData.activity
    } else {
        data = await getActivity(userId)     
    }  
    
    return data.data.sessions
}

async function formatAverageSessions(userId) {
    let data
    if (isMockedData) {
        data = mockedData.averageSessions
    } else {
        data = await getAverageSessions(userId)     
    }   

    let formatedData = {
        "data": [
            {
                "day": "L",
                "sessionLength": data.data.sessions[0].sessionLength
            },
            {
                "day": "M",
                "sessionLength": data.data.sessions[1].sessionLength
            },
            {
                "day": "M",
                "sessionLength": data.data.sessions[2].sessionLength
            },
            {
                "day": "J",
                "sessionLength": data.data.sessions[3].sessionLength
            },
            {
                "day": "V",
                "sessionLength": data.data.sessions[4].sessionLength
            },
            {
                "day": "S",
                "sessionLength": data.data.sessions[5].sessionLength
            },
            {
                "day": "D",
                "sessionLength": data.data.sessions[6].sessionLength
            }
        ]
    }

    return formatedData.data
}

async function formatUser(userId) {
    let data
    if (isMockedData) {
        data = mockedData.user
    } else {
        data = await getUser(userId)   
    }

    let formatedData = {
        "data": {
            "id": data.data.id,
            "userInfos": {
                "firstName": data.data.userInfos.firstName,
                "lastName": data.data.userInfos.lastName,
                "age": data.data.userInfos.age
            },
            "score": [
                {
                "value": (data.data.score ? data.data.score : data.data.todayScore)*100
                }
            ],
            "keyData": {
                "calorieCount": splitThousand(data.data.keyData.calorieCount),
                "proteinCount": splitThousand(data.data.keyData.proteinCount),
                "carbohydrateCount": splitThousand(data.data.keyData.carbohydrateCount),
                "lipidCount": splitThousand(data.data.keyData.lipidCount)
            }
        }
    }

    return formatedData.data
}

export { formatPerformance, formatActivity, formatAverageSessions, formatUser }