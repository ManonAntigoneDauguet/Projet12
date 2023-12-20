import mockedData from "../mockedData/mockedUser.json"
import { getActivity, getAverageSessions, getUser, getPerformance } from "./api.service"

const isMockedData = false

async function formatPerformance(id) {
    let data
    if (isMockedData) {
        data = mockedData.performance
    } else {
       data = await getPerformance(id)
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

export { formatPerformance }