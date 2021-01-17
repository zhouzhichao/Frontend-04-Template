
function StringToNumber(string, radix = 10) {

    if (radix > 10) {
        return Number(string);
    }

    let flag = /e|E/.test(string)
    if (!flag) {
        let chars = string.split('')
        let number = 0
        let i = 0
        while (i < chars.length && chars[i] != '.') {
            number = number * radix
            number += chars[i].codePointAt(0) - '0'.codePointAt(0)
            i++
        }
        if (chars[i] === '.') {
            i++
        }
        let fraction = 1
        while (i < chars.length) {
            fraction /= radix
            number += (chars[i].codePointAt(0) - '0'.codePointAt(0)) * fraction
            i++
        }
        return number
    } else {
        let logNumber = Number(string.match(/\d+$/)[0])
        let number = string.match(/^[\d\.]+/)[0].replace(/\./, '')
        if (/e-|E-/.test(string)) {
            return Number(number.padEnd(logNumber + 1, 0))
        } else {
            return Number(
                number.padStart(logNumber + number.length, 0).replace(/^0/, '0.')
            )
        }
    }
}


function NumberToString(number, radix) {
    if (radix > 10) {
        return (number).toString(radix);
    }
    let integer = Math.floor(number)
    let fraction = String(number).match(/\.\d+$/)
    if (fraction) {
        fraction = fraction[0].replace('.', '')
    }
    let string = ''
    while (integer > 0) {
        string = String(integer % radix) + string
        integer = Math.floor(integer / radix)
    }
    return fraction ? `${string}.${fraction}` : string
}


console.log("输出：", NumberToString(13, 16));

// function StringToNumber(string) {
//     return Number(string);
// }
// function NumberToString(number, radix) {
//     return (number).toString(radix);
// }

// console.log("输出2：", NumberToString(11, 12));



