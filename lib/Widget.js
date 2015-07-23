'use strict';

import Emitter from './Emitter';

/**
 * @class Widget
 */
export default class Widget {
	/**
	 * @public
	 * @param {string} tagName
	 */
	constructor(tagName) {
		/** @member {Element} */
		this.element = document.createElement(tagName);
	}

	on(event, handler) {
		Emitter.on(this, event, handler);
	}

	off(event, handler) {
		Emitter.off(this, event, handler);
	}

	emit(event, ...args) {
		Emitter.emit.apply(Emitter, [this, event].concat(args));
	}

	getEventHandlers(event) {
		return Emitter.getEventHandlers(this, event);
	}

	/**
	 * @param {Element} parentElement
	 */
	appendTo(parentElement) {
		parentElement.appendChild(this.element);
	}
}