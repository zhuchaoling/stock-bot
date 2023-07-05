module.exports = class CacheData{
    #data = {};
    add(key, value) {
       this.#data[key] = value;
    }
    get(key){
       return  this.#data.hasOwnProperty(key)?  this.#data[key]: null;
    }
 }