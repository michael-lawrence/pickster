'use strict';

/**
 * @exports NotifierMixin
 */
export default {
	notify(type, object) {
		Object
			.getNotifier(this)
			.performChange(type, () => object);
	}
}