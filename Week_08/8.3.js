
function findA(str) {
    let index = str.indexOf("a");
    return index;
}

console.log(findA("this is apple"))

function match(string) {
    for (const c of string) {
        if(c === "a"){
            return true;
        }
    }
    return false;
}

console.log(match("toady is nice"));

function findAB(string) {
    if (string.indexOf("ab") > -1) {
        return true;
    }
    return false;
}

function matchAB(string) {
    let foundA = false;
    for (const c of string) {
        if(c == "a"){
            foundA = true;
        }else if(foundA && c == "b"){
            return true
        }else {
            foundA = false;
        }
        
    }
    return false;
}

console.log(matchAB("hhahdddb"))