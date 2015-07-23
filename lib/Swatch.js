'use strict';

import Color from 'color';
import CanvasWidget from './CanvasWidget';

/**
 * @class Swatch
 */
export default class Swatch extends CanvasWidget {
	get color() {
		return this._color;
	}

	set color(value) {
		this._color = value;
		this._render();
	}

	/**
	 * @public
	 * @param {number} width
	 * @param {number} height
	 */
	constructor(width, height) {
		super(width, height);

		this._color = Color({
			'r': 255,
			'g': 255,
			'b': 255
		});
	}

	_render() {
		this.context.fillStyle = this._color.rgbaString();
		this.context.fillRect(0, 0, this.element.width, this.element.height);
	}
}