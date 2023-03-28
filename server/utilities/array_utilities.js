const getUniqueValues = (data, uniqueKey) => {
    return data.reduce((uniqueValues, element) => {
        testSubject = element[uniqueKey];
        if (!uniqueValues.includes(testSubject)) {
            uniqueValues.push(testSubject);
        }
        return uniqueValues;
    }, []
    )
}

module.exports = { getUniqueValues };