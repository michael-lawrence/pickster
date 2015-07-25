'use strict';

import Color from 'color';
import CanvasWidget from './CanvasWidget';
import Emitter from './Emitter';

/**
 * @class SaturationPicker
 */
export default class SaturationPicker extends CanvasWidget {
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
				'r': 255,
				'g': 255,
				'b': 255
			});

		this._addEvents();
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

			this.emit(SaturationPicker.CHANGE, this._color);

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
	_addEvents() {
		this.element.addEventListener('mousedown', () => {
			this.selecting = true;
		});

		this.element.addEventListener('mouseup', () => {
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
	 * @private
	 */
	_render() {
		let linearGradient = this.context.createLinearGradient(0, 0, 1, this.element.height);

		var hue = this._color.hue(),
			lightness = this._color.lightness();

		linearGradient.addColorStop(0, 'hsl(' + hue + ', 0%, ' + lightness + '%)');
		linearGradient.addColorStop(1, 'hsl(' + hue + ', 100%, ' + lightness + '%)');

		this.context.fillStyle = linearGradient;
		this.context.fillRect(0, 0, this.element.width, this.element.height);
	}
}

/**
 * @default
 * @type {string}
 * @public
 * @static
 */
SaturationPicker.CHANGE = 'SaturationPickerChange';