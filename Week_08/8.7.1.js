/**
 * 7. 状态机 | 使用状态机处理字符串（二） abcabx
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
   if (c === "a") {
       return foundA2;
   }else {
       return start(c);
   }
}

function foundA2(c) {
   if (c === "b") {
       return foundB2;
   }else {
       return start(c);
   }
}

// function foundB2(c) {
//     if (c === "x") {
//         return end;
//     }else {
//         return start(c);
//     }
//  }

function foundB2(c) {
    if (c === "x") {
        return end;
    }else {
        return foundB(c); // 如果不是x，还有可能是c。  abcabx  , ab 回文。 状态机处理重复字符的技巧
    }
 }


// console.log(match("sdgfsaabcabxfsd"));
console.log(match("abcabcabx"));
