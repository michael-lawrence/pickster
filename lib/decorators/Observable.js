'use strict';

import Mixin from '../Mixin';

/**
 * @exports Observerable
 */
const Observerable = Mixin({
	'observe': function (type, callback) {
		Object.observe(this, changes => changes.forEach(callback, this), [type]);
	}
});

export default Observerable;