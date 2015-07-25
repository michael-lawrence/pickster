'use strict';

/**
 * @class Emitter
 */
export default class Emitter {
	/**
	 * @public
	 */
	constructor() {
		/**
		 * @member {Element}
		 * @private
		 */
		this._listeners = [];
	}

	/**
	 * @param {string} event
	 * @private
	 * @static
	 */
	_checkParameters(event) {
		if (!event) {
			throw new Error('Parameter "event" is invalid.');
		}
	}

	/**
	 * @param {string} event
	 * @param {function} handler
	 * @public
	 */
	on(event, handler) {
		this._checkParameters(event);

		this._listeners[event] = this._listeners[event] || [];
		this._listeners[event].push(handler);
	}

	/**
	 * @param {string} event
	 * @param {function} handler
	 * @public
	 */
	off(event, handler) {
		this._checkParameters(event);

		if (handler) {
			let handlers = this._listeners[event];
			handlers.splice(handlers.indexOf(handler), 1);
		} else {
			this._listeners[event] = [];
		}
	}

	/**
	 * @param {string} event
	 * @param {...*} args
	 * @public
	 */
	emit(event, ...args) {
		this._checkParameters(event);

		const eventListeners = this._listeners[event];

		if (eventListeners) {
			eventListeners.forEach(event => {
				event.apply(this, args);
			})
		}
	}

	/**
	 * @param {string} event
	 * @returns {function[]}
	 * @public
	 */
	getEventHandlers(event) {
		this._checkParameters(event);

		return this._listeners[event];
	}
}