# enum-js
Allows used of enum TypeScript in JavaScript

## How use enum-js
```js
// ES6
import Enum from "*link*"
// ES5
const Enum = require("*link*")

let enums = new Enum("item1", 2, {item3: "item3"}, ["item4", "item4"], function(){
  return {item5: "item5"}
}, new Promise((resolv) =>resolv({item6: "item6"})), function*(){
  yield {item7: "item7"}
  return {item8: "item8"}
}, "item9 = 9") // return {item1: "item1", 2: 2, item3: "item3", item4: "item4", item5: "item5", item7: "item7", item8: "item8", item9: 9}
```
Enum methods:
```js
enums.size // {number} return the length of enumeration
enums.toMap() // {Map} return a new Map object
enums.toArray() // {Array} return a new Array
enums.toObject() // {Object} return a new Object
enums.forEach(callback) // {nothing} allows of browse each element of enumeration
enums.map(callback) // {Enum} allows of browse each element of enumeration and edit this element all the promises
enums.set(...items) // {Enum} add or edit the elements of enumerable with `items` remove all the promises
enums.promise(callback?) // {Promise<Enum>} add all the promises in the list enumerable 
enums.clone() // {Enum} clone enumeration
enums.cloneWithPromise(callback?) // {Promise<Enum>} clone enumeration with promise
```
