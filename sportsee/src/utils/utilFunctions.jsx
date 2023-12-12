function formateData(data) {
    data = Array.from(String(data))
    let length = data.length
    if (length > 3) {
        data.splice(length - 3, 0, ",")
        data.push("k")
    }
    return data.join('')
}

export { formateData }