const { map, prop, find, curry } = require('ramda');

const getObjectValueByPropName = (object, key) => {
	for (let k in object) {
		if (k === key) {
				return object[key];
		}

		if (typeof object[k] === 'object') {
				const value = getObjectValueByPropName(object[k], key);
				if (value) {
						return value;
				}
		}
}
}

const replaceObjValues = (newObject, oldObjectValue) => {
	if (typeof (oldObjectValue) !== 'object') {
		const a = getObjectValueByPropName(newObject, oldObjectValue) || '';
		const newObjectValue = a;
		return newObjectValue;
	} else {
		const replaceValues = curriedReplaceObjValues(newObject);
		return map(replaceValues, oldObjectValue);
	}
};

const curriedReplaceObjValues = curry(replaceObjValues);

const convertBodyByTemplate = (newObject, conversionMap) => {
	const replaceValues = curriedReplaceObjValues(newObject);
	const newBody = map(replaceValues, conversionMap);
	console.log(newBody);
}

const getDateByISO8601 = () => {
	const dateObj = new Date();
	const dateISO8601 = dateobj.toISOString();
	return dateISO8601;
}

module.exports = {
	convertBodyByTemplate,
	getDateByISO8601
}