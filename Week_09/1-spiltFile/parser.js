const css = require("css");

let currentToken = null;

let currentAttribute = null;

let stack = [{type: "document", children: []}];

let currentTextNode = null;

let rules = [];

// 加入一个新的函数， addCSSRules，把 CSS 规则暂存到一个数组里
function addCSSRules(text) {
    var ast = css.parse(text); // 不要保存文本

    /**
     * {
  type: "stylesheet",
  stylesheet: {
    source: undefined,
    rules: [
      {
        type: "rule",
        selectors: [
          "body div #myid",
        ],
        declarations: [
          {
            type: "declaration",
            property: "width",
            value: "100px",
            position: {
              start: {
                line: 3,
                column: 9,
              },
              end: {
                line: 3,
                column: 20,
              },
              source: undefined,
            },
          },
          {
            type: "declaration",
            property: "background-color",
            value: "#ff5000",
            position: {
              start: {
                line: 4,
                column: 9,
              },
              end: {
                line: 4,
                column: 34,
              },
              source: undefined,
            },
          },
        ],
        position: {
          start: {
            line: 2,
            column: 7,
          },
          end: {
            line: 5,
            column: 8,
          },
          source: undefined,
        },
      },
      {
        type: "rule",
        selectors: [
          "body div img",
        ],
        declarations: [
          {
            type: "declaration",
            property: "width",
            value: "30px",
            position: {
              start: {
                line: 7,
                column: 9,
              },
              end: {
                line: 7,
                column: 19,
              },
              source: undefined,
            },
          },
          {
            type: "declaration",
            property: "background-color",
            value: "#ff1111",
            position: {
              start: {
                line: 8,
                column: 9,
              },
              end: {
                line: 8,
                column: 34,
              },
              source: undefined,
            },
          },
        ],
        position: {
          start: {
            line: 6,
            column: 7,
          },
          end: {
            line: 9,
            column: 8,
          },
          source: undefined,
        },
      },
    ],
    parsingErrors: [
    ],
  },
}
     */


    // console.log(JSON.stringify(ast, null, "   "));
    rules.push(...ast.stylesheet.rules);  
    /**
     * [
  {
    type: "rule",
    selectors: [
      "body div #myid",
    ],
    declarations: [
      {
        type: "declaration",
        property: "width",
        value: "100px",
        position: {
          start: {
            line: 3,
            column: 9,
          },
          end: {
            line: 3,
            column: 20,
          },
          source: undefined,
        },
      },
      {
        type: "declaration",
        property: "background-color",
        value: "#ff5000",
        position: {
          start: {
            line: 4,
            column: 9,
          },
          end: {
            line: 4,
            column: 34,
          },
          source: undefined,
        },
      },
    ],
    position: {
      start: {
        line: 2,
        column: 7,
      },
      end: {
        line: 5,
        column: 8,
      },
      source: undefined,
    },
  },
  {
    type: "rule",
    selectors: [
      "body div img",
    ],
    declarations: [
      {
        type: "declaration",
        property: "width",
        value: "30px",
        position: {
          start: {
            line: 7,
            column: 9,
          },
          end: {
            line: 7,
            column: 19,
          },
          source: undefined,
        },
      },
      {
        type: "declaration",
        property: "background-color",
        value: "#ff1111",
        position: {
          start: {
            line: 8,
            column: 9,
          },
          end: {
            line: 8,
            column: 34,
          },
          source: undefined,
        },
      },
    ],
    position: {
      start: {
        line: 6,
        column: 7,
      },
      end: {
        line: 9,
        column: 8,
      },
      source: undefined,
    },
  },
]
     */
}

function computeCSS(element){
    // console.log(rules);
    // console.log("compute CSS for Element", element);
    var elements = stack.slice().reverse();
}

function emit(token) {
    // if (token.type === "text") {
    //     return ;
    // }
    let top = stack[stack.length - 1]; // 把栈顶取出来

    if(token.type === "startTag") {
        let element = {
            type: "element",
            children: [],
            attributes: [],
        };

        element.tagName = token.tagName;

        for (let p in token) {
           if(p != "type" && p != "tagName") {
                element.attributes.push({
                    name: p,
                    value: token[p]
                });
           }
        }

        computeCSS(element); // 9.9

        top.children.push(element);
        element.parent = top;

        if(!token.isSelfClosing){
            stack.push(element);
        }

        currentTextNode = null;

    }else if(token.type == "endTag"){
        if (top.tagName !== token.tagName) {
            throw new Error("Tag start end does not match!");
          } else {
            // encounter style tag, add css rules
            if (top.tagName === "style") {
              addCSSRules(top.children[0].content);
            }
            stack.pop();
          }
          currentTextNode = null;
        } else if (token.type === "text") {
          if (currentTextNode == null) {
            currentTextNode = {
              type: "text",
              content: ""
            };
            top.children.push(currentTextNode);
          }
          currentTextNode.content += token.content; // 给当前文本节点追加一个 content
    }
}

const EOF = Symbol("EOF");

function data(c) {
    if(c == "<") {
        return tagOpen;
    }else if(c == EOF){
        emit({
            type:"EOF",
        })
        return ;
    }else {
        emit({
            type: "text",
            content: c,
        })
        return data;
    }
}

function tagOpen(c){
    if(c == "/"){
        return endTagOpen;
    }else if(c.match(/^[a-zA-Z]$/)) {
        // <a 后跟一个字母，可以赋一个初值
        currentToken = {
            type: "startTag",
            tagName: ""
        }
        return tagName(c);
    }else {
        return ;
    }
}

function endTagOpen(c) {
    if(c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: "endTag",
            tagName: ""
        }
        return tagName(c);
    }else if(c == ">"){

    }else if(c == EOF){

    }else {

    }
}

// <html prop
function tagName(c) {
    if(c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    }else if(c == "/"){
        return selfClosingStartTag;
    }else if(c.match(/^[a-zA-Z]$/)){
        currentToken.tagName += c;
        return tagName;
    }else if(c == ">"){
        emit(currentToken);
        return data;
    }else {
        return tagName;
    }
}

function beforeAttributeName(c) {
    if(c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    }else if(c == "/" || c == ">" || c == EOF){
        return afterAttributeName(c);
    }else if(c == "="){
        return beforeAttributeName;
    }else {
        currentAttribute = {
            name: "",
            value: "",
        }
        return attributeName(c);
    }
}

function attributeName(c) {
    if(c.match(/^[\t\n\f ]$/) || c == "/" ||c == ">" || c == EOF) {
        return afterAttributeName(c);
    }else if(c == "="){
        return beforAttributeValue;
    }else if(c == "\u0000") {

    }else if(c == "\"" || c =="'" || c == "<") {

    }else {
       currentAttribute.name += c;
        return attributeName;
    }
}

function afterAttributeName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return afterAttributeName;
  } else if (c == "/") {
    return selfClosingStartTag;
  } else if (c == "=") {
    return beforeAttributeValue;
  } else if (c == ">") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  } else if (c == EOF) {
    // error
  } else {
    currentToken[currentAttribute.name] = currentAttribute.value;
    currentAttribute = {
      name: "",
      value: ""
    };
    return attributeName;
  }
}

function beforAttributeValue(c) {
    if(c.match(/^[\t\n\f ]$/) || c == "/" ||c == ">" || c == EOF) {
        return beforAttributeValue(c);
    }else if(c == "\""){
        return doubleQuotedAttributeValue;
    }else if(c == "\'"){
        return singleQuotedAttributeValue;
    }else if(c == ">") {

    }else {
        return unQuotedAttributedValue(c);
    }
}

function doubleQuotedAttributeValue(c) {
    if(c == "\""){
        currentToken[currentAttribute.name] = currentAttribute.value;
        return afterQuotedAttributeValue;
    }else if(c == "\u0000"){

    }else if(c == EOF){

    }else {
        currentAttribute.value += c;
        return doubleQuotedAttributeValue;
    }
}

function singleQuotedAttributeValue(c) {
    if(c == "\'"){
        currentToken[currentAttribute.name] = currentAttribute.value;
        return afterQuotedAttributeValue;
    }else if(c == "\u0000"){

    }else if(c == EOF){

    }else {
        currentAttribute.value += c;
        return doubleQuotedAttributeValue;
    }
}

function afterQuotedAttributeValue(c) {
    if (c.match(/^[\t\n\f ]$/)) {
      return beforeAttributeName;
    } else if (c == "/") {
      return selfClosingStartTag;
    } else if (c == ">") {
      currentToken[currentAttribute.name] = currentAttribute.value;
      emit(currentToken);
      return data;
    } else if (c == EOF) {
      // error
    } else {
      currentAttribute.value += c;
      return afterQuotedAttributeValue;
    }
  }


function unQuotedAttributedValue(c) {

    if (c.match(/^[\t\n\f ]$/)) {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return beforeAttributeName;
      } else if (c == "/") {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return selfClosingStartTag;
      } else if (c == ">") {
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
      } else if (c == "\"" || c == "'" || c == "<" || c == "=") {
        
      } else if (c == "\u0000") {
        
      } else if (c == EOF) {
        
      } else {
        currentAttribute.value += c;
        return unQuotedAttributedValue;
      }
}

function selfClosingStartTag(c) {
    if(c == ">"){
        currentToken.isSelfClosing = true;
        return data;
    }else if(c == "EOF"){
        
    }else {
        
    }
}



module.exports.parseHTML = function parseHTML(html){
    // console.log(html)
    let state = data;
    for (let c of html) {
        state = state(c);
    }

    state = state(EOF); 
    // 小技巧：利用Symbol的唯一性创建了一个新的符号 EOF，作为状态机的最后一个输入给到状态机
}