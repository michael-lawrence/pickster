/**
 * @exports Mixin
 * @param behaviour
 * @param sharedBehaviour
 * @returns {function}
 * @link http://raganwald.com/2015/06/26/decorators-in-es7.html
 */
export default function (behaviour, sharedBehaviour = {}) {
	const instanceKeys = Reflect.ownKeys(behaviour),
		sharedKeys = Reflect.ownKeys(sharedBehaviour),
		typeTag = Symbol('isa');

	function _mixin(clazz) {
		for (let property of instanceKeys) {
			Object.defineProperty(clazz.prototype, property, {
				'value': behaviour[property]
			});
		}

		Object.defineProperty(clazz.prototype, typeTag, {
			'value': true
		});

		return clazz;
	}

	for (let property of sharedKeys) {
		Object.defineProperty(_mixin, property, {
			'value': sharedBehaviour[property],
			'enumerable': sharedBehaviour.propertyIsEnumerable(property)
		});
	}

	Object.defineProperty(_mixin, Symbol.hasInstance, {
		'value': (i) => !!i[typeTag]
	});

	return _mixin;
}