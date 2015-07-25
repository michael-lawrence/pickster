'use strict';

import Color from 'color';
import Picker from './Picker';

/**
 * @class HuePicker
 */
export default class HuePicker extends Picker {
	/**
	 * @param {number} width
	 * @param {number} height
	 * @param {Color|string|object} [color]
	 * @public
	 */
	constructor(width, height, color) {
		super(width, height, color);
	}

	/**
	 * @param {Event} event
	 * @private
	 */
	_change(event) {
		if (this.selecting) {
			this._render();

			let x = event.pageX - this.element.offsetLeft,
				y = event.pageY - this.element.offsetTop,
				data = this.context.getImageData(x, y, 1, 1).data;

			this.color = Color({
				'r': data[0],
				'g': data[1],
				'b': data[2]
			});

			this.emit(HuePicker.CHANGE, this.color);

			this._drawSelection(y);
		}
	}

	/**
	 * @param {number} y
	 * @private
	 */
	_drawSelection(y) {
		let thickness = 4;

		this.context.fillStyle = '#000';
		this.context.fillRect(0, y - (thickness / 2) - 1, this.element.width, 1);

		this.context.fillStyle = 'rgba(255, 255, 255, 0.75)';
		this.context.fillRect(0, y - (thickness / 2), this.element.width, thickness);

		this.context.fillStyle = '#000';
		this.context.fillRect(0, y + (thickness / 2) + 1, this.element.width, 1);
	}

	/**
	 * @private
	 */
	_render() {
		let linearGradient = this.context.createLinearGradient(0, 0, 1, this.element.height),
			colorCount = 360,
			i;

		for (i = 0; i < colorCount; i++) {
			linearGradient.addColorStop(
				i / colorCount,
				'hsl(' + i + ', 100%, 50%)'
			);
		}

		this.context.fillStyle = linearGradient;
		this.context.fillRect(0, 0, this.element.width, this.element.height);
	}
}