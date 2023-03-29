export const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const formatDate = (dateString) => {
    dateString = dateString.toString()
    if (dateString.split("-").length > 1) {
        dateString = "20" + dateString
    } else {
        const year = dateString.substring(0, 4)
        const month = dateString.substring(4, 6)
        const day = dateString.substring(6, 8);
        dateString = `${year}-${month}-${day}`
    }
    return new Date(dateString).toLocaleDateString("en-GB");
}
