'use strict';

import Color from 'color';
import Picker from './Picker';

/**
 * @class ColorPicker
 */
export default class ColorPicker extends Picker {
	/**
	 * @returns {Color|string|object}
	 * @public
	 */
	get hue() {
		return this._hue;
	}

	/**
	 * @param {Color|string|object} value
	 * @public
	 */
	set hue(value) {
		this._hue = Color(value);
		this._render();
	}

	/**
	 * @param {number} width
	 * @param {number} height
	 * @param {Color|string|object} [color]
	 * @param {Color|string|object} [hue]
	 * @public
	 */
	constructor(width, height, color, hue) {
		super(width, height, color);

		this._hue = Color(hue || {
				'h': 0,
				's': 50,
				'l': 50
			});

		this._render();
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
				data = this.context.getImageData(x, y, 1, 1).data,
				color = Color({
					'r': data[0],
					'g': data[1],
					'b': data[2]
				});

			this.emit(ColorPicker.CHANGE, color);

			this._drawSelection(x, y, color);
		}
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 * @param {Color} selectedColor
	 * @private
	 */
	_drawSelection(x, y, selectedColor) {
		this.context.beginPath();
		this.context.arc(x, y, 6, 0, 2 * Math.PI, false);
		this.context.lineWidth = 1;
		this.context.strokeStyle = selectedColor.luminosity() > 0.5 ? '#000' : '#fff';
		this.context.stroke();
	}

	/**
	 * @private
	 */
	_render() {
		if (this._hue) {
			let linearGradient = this.context.createLinearGradient(0, 0, 1, this.element.height),
				radialGradient = this.context.createRadialGradient(this.element.width, 0, this.element.width, this.element.width, 0, 0);

			linearGradient.addColorStop(0, '#fff');
			linearGradient.addColorStop(1, '#000');

			radialGradient.addColorStop(0, this._hue.clone().alpha(0).rgbaString());
			radialGradient.addColorStop(1, this._hue.rgbaString());

			this.context.fillStyle = linearGradient;
			this.context.fillRect(0, 0, this.element.width, this.element.height);

			this.context.fillStyle = radialGradient;
			this.context.fillRect(0, 0, this.element.width, this.element.height);
		}
	}
}