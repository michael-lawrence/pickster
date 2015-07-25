'use strict';

import Color from 'color';
import CanvasWidget from './CanvasWidget';

/**
 * @class Picker
 */
export default class Picker extends CanvasWidget {
	/**
	 * @returns {Color|string|object}
	 * @public
	 */
	get color() {
		return this._color;
	}

	/**
	 * @param {Color|string|object} value
	 * @public
	 */
	set color(value) {
		this._color = Color(value);
		this._render();
	}

	/**
	 * @param {number} width
	 * @param {number} height
	 * @param {Color|string|object} [color]
	 * @public
	 */
	constructor(width, height, color) {
		super(width, height);

		this.selecting = false;

		this._color = Color(color || {
				'h': 0,
				's': 50,
				'l': 50
			});

		this._addEvents();
		this._render();
	}

	/**
	 * @private
	 */
	_addEvents() {
		this.element.addEventListener('mousedown', () => {
			this.selecting = true;
		});

		this.element.addEventListener('mouseup', (event) => {
			this._change(event);

			this.selecting = false;
		});

		this.element.addEventListener('mousemove', (event) => {
			this._change(event);
		});

		document.addEventListener('mouseup', () => {
			this.selecting = false;
		});
	}

	/**
	 * @param {Event} event
	 * @private
	 * @abstract
	 */
	_change(event) {
		throw new Error('_change is meant to be overridden.');
	}

	/**
	 * @private
	 * @abstract
	 */
	_render() {
		throw new Error('_change is meant to be overridden.');
	}
}

/**
 * @default
 * @type {string}
 * @public
 * @static
 */
Picker.CHANGE = 'PickerChange';