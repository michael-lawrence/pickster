'use strict';

import Color from 'color';
import Picker from './Picker';

/**
 * @class SaturationPicker
 */
export default class SaturationPicker extends Picker {
	/**
	 * @returns {number}
	 * @public
	 */
	get hue() {
		return this._hue;
	}

	/**
	 * @param {number} value
	 * @public
	 */
	set hue(value) {
		this._hue = Number(value);
		this._render();
	}

	/**
	 * @returns {number}
	 * @public
	 */
	get lightness() {
		return this._lightness;
	}

	/**
	 * @param {number} value
	 * @public
	 */
	set lightness(value) {
		this._lightness = Number(value);
		this._render();
	}

	/**
	 * @param {number} width
	 * @param {number} height
	 * @param {Color|string|object} [color]
	 * @param {number} hue
	 * @param {number} lightness
	 * @public
	 */
	constructor(width, height, color, hue = 0, lightness = 50) {
		super(width, height, color);

		this._hue = Number(hue);
		this._lightness = Number(lightness);

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
				data = this.context.getImageData(x, y, 1, 1).data;

			this._color = Color({
				'r': data[0],
				'g': data[1],
				'b': data[2]
			});

			this.notify(SaturationPicker.CHANGE, {'color': this._color});

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
		if (!isNaN(this._hue)) {
			let linearGradient = this.context.createLinearGradient(0, 0, 1, this.element.height);

			linearGradient.addColorStop(0, `hsl(${this._hue}, 0%, ${this._lightness}%)`);
			linearGradient.addColorStop(1, `hsl(${this._hue}, 100%, ${this._lightness}%)`);

			this.context.fillStyle = linearGradient;
			this.context.fillRect(0, 0, this.element.width, this.element.height);
		}
	}
}