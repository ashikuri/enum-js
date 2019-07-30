let Enum = function(...items) {
  let promiseList = items.filter(item => item instanceof Promise);
  let toObj = (item) =>{
  	if (item instanceof Function) {
  		let fn = item()
  		if("next" in fn && fn.next instanceof Function) return toObj(new Enum(...fn))
  		return toObj(fn)
  	}
  	if (item instanceof Promise) return null
  	if (item instanceof Array) return { [item[0]]: item[1] }
  	if (item instanceof Object) return item
  	if (/([ ]+)?=([ ]+)?/.test(item)) return {
  		[item.split(/([ ]+)?=/)[0]]:
  			item.split(/=/)[1][0] === " "
  			? item.split(/=/)[1].slice(1)
  			: item.split(/=/)[1]
  	}
  	return { [item]: item }
  }
  let object = Object.assign({}, ...items.map(toObj))
  if (!(this instanceof Enum)) return object
  for (const item in object) this[item] = object[item]
  Enum.prototype.size = items.length
  Enum.prototype.forEach = function(callbackfn) {
  	for (const item in object) callbackfn(object[item], item, this)
  }
  Enum.prototype.map = function(callbackfn) {
  	let newObject = {}
  	for (const item in object) 
  		newObject = Object.assign({}, newObject, callbackfn(object[item], item, { [item]: object[item] }, this))
  	return new Enum(newObject)
  }
  Enum.prototype.set = function(...items) {
  	return new Enum(object, ...items);
  }
  Enum.prototype.promise = async function(callbackfn) {
  	let list = []
  	for (const promiseItem of promiseList) list.push(await promiseItem)
  	let enumList = new Enum(...list, object)
  	!!callbackfn && callbackfn(enumList)
  	return enumList
  }
  Enum.prototype.toArray = function(){
  	return Object.keys(object).map((key) =>[key, object[key]])
  }
  Enum.prototype.toMap = function(){
  	return new Map(Object.keys(object).map((key) =>[key, object[key]]))
  }
}
module.exports = Enum
