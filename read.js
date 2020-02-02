* Is this a string?
* @param input
* @returns {boolean}
*/
validator.isString = (input) => {
 return typeof input === 'string';
};

validator.isNumber = (input) => {
 return typeof input === 'number';
};

validator.isArray = (input) => {
 return Array.isArray(input);
};

validator.isObject = (input) => {
 return typeof input === 'object';
};

validator.isFunction = (input) => {
 return typeof input === 'function';