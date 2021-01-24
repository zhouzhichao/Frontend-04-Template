/**
 * 
 * abcdef
 */
function matchAB(string) {
    let foundA = false;
    let foundB = false;
    let foundC = false;
    let foundD = false;
    let foundE = false;
    // let foundF = false;
    
    for (const c of string) {
        if(c == "a"){
            foundA = true;
        }else if(foundA && !foundB && c == "b"){
           foundB = true;
        }else if(foundB && !foundC && c == "c"){
            foundC = true;
         }else if(foundC && !foundD && c == "d"){
            foundD = true;
         }else if(foundD && !foundE && c == "e"){
            foundE = true;
         }else if(foundE && c == "f"){
            return true;
         }else {
            foundA = false;
            foundB = false;
            foundC = false;
            foundD = false;
            foundE = false;
            
        }
        
    }
    return false;
}

console.log(matchAB("abcdefgs"))