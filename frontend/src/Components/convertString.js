function convertToQueryString (aString) {
    let converted = ''
    for (let i = 0; i < aString.length; i++) {
        if (aString[i] !== ' ') {
            converted += aString[i]
        } else if (aString[i] === ' ') {
            converted += '+'
        }
    }
    return converted
};

export default convertToQueryString;





