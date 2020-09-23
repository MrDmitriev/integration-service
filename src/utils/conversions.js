const { map, curry, propOr } = require('ramda');
const countryCodeLookup = require('iso-countries-lookup');

const { CarrierCodes } = require('../constants/constants');

const getObjectValueByPropName = (object, ptopName) => {
	for (let k in object) {
		if (k === ptopName) {
			return object[ptopName];
		}

		if (typeof object[k] === 'object') {
			const value = getObjectValueByPropName(object[k], ptopName);
			if (value) {
				return value;
			}
		}
	}
}

const checkTemplateValue = (templateValue, newObjectValue) => {
	switch (templateValue.name) {
		case 'carrierKey':
			return propOr(null, newObjectValue)(CarrierCodes);
		case 'country':
			return templateValue.code ? countryCodeLookup(newObjectValue) : newObjectValue;
		default:
			return templateValue.type === 'Number' ? parseInt(newObjectValue) : newObjectValue.toString();
	}
}

const updateObjValues = (object, templateValue) => {
	if (!!templateValue.name) {
		const newObjectValue = getObjectValueByPropName(object, templateValue.name) || '0';
		return checkTemplateValue(templateValue, newObjectValue);
	}

	if (typeof templateValue === 'object') {
		const replaceValues = curriedUpdateObjValues(object);
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