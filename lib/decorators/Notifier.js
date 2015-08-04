'use strict';

import Mixin from '../Mixin';

/**
 * @exports Notifier
 */
const Notifier = Mixin({
	'notify': function (type, object) {
		Object
			.getNotifier(this)
			.performChange(type, () => object);
	}
});

export default Notifier;