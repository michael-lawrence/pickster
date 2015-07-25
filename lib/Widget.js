'use strict';

import Emitter from './Emitter';

/**
 * @class Widget
 */
export default class Widget extends Emitter {
	/**
	 * @param {string} tagName
	 * @public
	 */
	constructor(tagName) {
		super();

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