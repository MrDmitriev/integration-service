const { map, prop, find, curry, type, toString, forEachObjIndexed } = require('ramda');
const {partnerToTigerConversionType} = require('../conversionMaps/conversionToTigerTemplate');

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

const updateObjValues = (body, templateValue) => {
	console.log('template - object', typeof templateValue);
	if (!!templateValue.name) {
		const newObjectValue = getObjectValueByPropName(body, templateValue.name) || '';
		return templateValue.type === 'Number' ? parseInt(newObjectValue) : newObjectValue.toString();
	} 
	
	if (typeof templateValue === 'object') {
		console.log('template ==== object')
		const replaceValues = curriedUpdateObjValues(body);
		return map(replaceValues, templateValue);
	}
};

const curriedUpdateObjValues = curry(updateObjValues);


const convertBodyByTemplate = (body, template) => {
	const replaceBodyValues = curriedUpdateObjValues(body);
	const newBody = map(replaceBodyValues, template);
	return newBody;
}

const getDateByISO8601 = () => {
	const dateObj = new Date();
	const dateISO8601 = dateObj.toISOString();
	return dateISO8601;
}


module.exports = {
	convertBodyByTemplate,
	getDateByISO8601
}