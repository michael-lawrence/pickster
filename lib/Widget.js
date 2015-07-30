'use strict';

import NotifierMixin from "./mixins/NotifierMixin";
import ObservableMixin from "./mixins/ObservableMixin";

/**
 * @class Widget
 */
export default class Widget {
	/**
	 * @param {string} tagName
	 * @public
	 */
	constructor(tagName) {
		Object.assign(this, NotifierMixin, ObservableMixin);

		/** @member {Element} */
		this.element = document.createElement(tagName);
	}

	/**
	 * @param {Element} parentElement
	 * @public
	 */
	appendTo(parentElement) {
		parentElement.appendChild(this.element);
	}
}