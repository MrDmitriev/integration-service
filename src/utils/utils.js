const {map, prop, find, curry} = require('ramda');

const replaceObjValues = (newObject, oldObjectValue) => {
	if (typeof(oldObjectValue) !== 'object') {
		console.log('newObject', newObject);
		console.log('oldObjectValue', oldObjectValue);
		return newObject;
	} else {
		const replaceValues = curriedReplaceObjValues(newObject);
		return map(replaceValues, oldObjectValue);
	}
};

const curriedReplaceObjValues = curry(replaceObjValues);

const updateBodyValues = (newObject, conversionMap) => {
	const replaceValues = curriedReplaceObjValues(newObject);
	const newBody = map(replaceValues, conversionMap);
	console.log(newBody);
}

module.exports = {
	updateBodyValues
}