'use strict';

import Emitter from './Emitter';

/**
 * @class Widget
 */
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
	 * @param {string} event
	 * @param {function} handler
	 * @public
	 */
	on(event, handler) {
		Emitter.on(this, event, handler);
	}

	/**
	 * @param {string} event
	 * @param {function} handler
	 * @public
	 */
	off(event, handler) {
		Emitter.off(this, event, handler);
	}

	/**
	 * @param {string} event
	 * @param {...*} args
	 * @public
	 */
	emit(event, ...args) {
		Emitter.emit.apply(Emitter, [this, event].concat(args));
	}

	/**
	 * @param event
	 * @returns {*}
	 * @public
	 */
	getEventHandlers(event) {
		return Emitter.getEventHandlers(this, event);
	}

	/**
	 * @param {Element} parentElement
	 * @public
	 */
	appendTo(parentElement) {
		parentElement.appendChild(this.element);
	}
}