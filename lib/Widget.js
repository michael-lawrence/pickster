'use strict';

import Notifier from "./decorators/Notifier";
import Observable from "./decorators/Observable";

/**
 * @class Widget
 */
@Notifier
@Observable
export default class Widget {
	/**
	 * @param {string} tagName
	 * @public
	 */
	constructor(tagName) {
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