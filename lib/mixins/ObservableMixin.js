'use strict';

/**
 * @exports ObserverableMixin
 */
export default {
	observe(type, callback) {
		Object.observe(this, changes => changes.forEach(callback, this), [type]);
	}
}