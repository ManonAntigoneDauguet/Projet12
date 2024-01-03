import mockedData from "../mockedData/mockedUser.json"
import { getActivity, getAverageSessions, getUser, getPerformance } from "./api.service"

const isMockedData = false

/**
 * Return a number segmented by increments of a thousand
 * @param { Number } data 
 * @returns { String }
 */
function splitThousand(data) {
    data = Array.from(String(data))
    let length = data.length
    if (length > 3) {
        data.splice(length - 3, 0, ",")
        data.push("k")
    }
    return data.join('')
}


/**
 * Return a string with the first letter capitalized
 * @param { String } string 
 * @returns { String }
 */
function capitalizeFirstLetter( string ) {
    return string[0].toUpperCase() + string.slice(1)
}


/**
 * Return the data used for the Performance's radar chart
 * @param { Number } userId 
 * @returns { Object.<value: Number, kind: String> }
 */
async function formatPerformance(userId) {
    let data; let kind
    let formatedData = []
    if (isMockedData) {
        data = mockedData.performance
    } else {
       data = await getPerformance(userId)
    }  
    kind = data.data.kind
    data = data.data.data

    for (let i = data.length-1; i >= 0; i--) {
        formatedData.push({
            "value": data[i].value, 
            "kind": capitalizeFirstLetter(kind[data[i].kind])
        })
    }

    return formatedData
}


/**
 * Return the data used for the Activity's bar chart
 * @param { Number } userId 
 * @returns { Object.<day: String, kilogram: Number, calories: Number> }
 */
async function formatActivity(userId) {
    let data
    if (isMockedData) {
        data = mockedData.activity
    } else {
        data = await getActivity(userId)     
    }

    return data.data.sessions
}


/**
 * Return the data used for the AverageSessions's line chart
 * @param { Number } userId 
 * @returns { Object.<day: String, sessionLength: Number> }
 */
async function formatAverageSessions(userId) {
    let data
    let days = ["L", "M", "M", "J", "V", "S", "D"]
    let formatedData = []   
    if (isMockedData) {
        data = mockedData.averageSessions
    } else {
        data = await getAverageSessions(userId)     
    }   

    for (let i = 0; i < data.data.sessions.length; i++) {
        formatedData.push({ 
            "day": days[i], 
            "sessionLength": data.data.sessions[i].sessionLength
        })
    }

    return formatedData
}


/**
 * Return the main data about the user
 * @param { Number } userId 
 * @returns { Object } user
 * @returns { Number } user.id
 * @returns { Object.< age: Number, firstName : String, lastName: String > } user.userInfos
 * @returns { Array.<{ value: Number }> } user.score
 * @returns { Object.< calorieCount: String, carbohydrateCount: String, lipidCount: String, proteinCount: String > } user.keyData
 */
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