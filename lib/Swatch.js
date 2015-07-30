'use strict';

import Color from 'color';
import CanvasWidget from './CanvasWidget';

/**
 * @class Swatch
 */
export default class Swatch extends CanvasWidget {
	/**
	 * @type {Color|string|object}
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
	 * @public
	 * @param {number} [width]
	 * @param {number} [height]
	 * @param {Color|string|object} [color]
	 */
	constructor(width = 16, height = 16, color = {'r': 255, 'g': 255, 'b': 255}) {
		super(width, height);

		this._color = Color(color);

		this._render();
	}

	/**
	 * @private
	 */
	_render() {
		this.context.fillStyle = this._color.rgbaString();
		this.context.fillRect(0, 0, this.element.width, this.element.height);
	}
}