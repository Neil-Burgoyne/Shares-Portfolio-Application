export const comma = (number) => {
    const string = number.toString()
    return string.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}