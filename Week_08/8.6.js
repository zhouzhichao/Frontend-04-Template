/**
 * 使用状态机，找到abcdef
 */

 function match(string) {
     let state = start;  // 表示状态机的当前状态,start是一个状态函数
     for (let c of string) {
         state = state(c); // 切换状态   当找到f之后，会一直停留在end里。
     }
     return state === end;
 }

 function start(c) {
     if (c === "a") {
         return foundA;
     }else {
         return start;
     }

 }
 // 小技巧：end 状态永远返回end  trap
 function end(c) {
     return end;
 }

 function foundA(c) {
     if (c === "b") {
         return foundB;
     }else {
         return start(c);
     }
 }
 function foundB(c) {
    if (c === "c") {
        return foundC;
    }else {
        return start(c);
    }
}
function foundC(c) {
    if (c === "d") {
        return foundD;
    }else {
        return start(c);
    }
}

function foundD(c) {
    if (c === "e") {
        return foundE;
    }else {
        return start(c);
    }
}

function foundE(c) {
    if (c === "f") {
        return end;
    }else {
        return start(c);
    }
}

// console.log(match("I amabcdefkkjh"));
console.log(match("ababcdef"));
