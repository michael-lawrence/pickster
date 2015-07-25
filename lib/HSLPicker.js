'use strict';

import Color from 'color';
import CanvasWidget from './CanvasWidget';
import Emitter from './Emitter';

/**
 * @class HSLPicker
 */
export default class HSLPicker extends CanvasWidget {
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

			this.emit(HSLPicker.CHANGE, this._color);

			this._drawSelection(x, y);
		}
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 * @private
	 */
	_drawSelection(x, y) {
		this.context.beginPath();
		this.context.arc(x, y, 6, 0, 2 * Math.PI, false);
		this.context.lineWidth = 1;
		this.context.strokeStyle = this._color.luminosity() > 0.5 ? '#000' : '#fff';
		this.context.stroke();
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
	 * @private
	 */
	_render() {
		let tempCanvas = document.createElement('canvas'),
			numColors = 360,
			tempContext,
			i;

		tempCanvas.setAttribute('width', numColors.toString());
		tempCanvas.setAttribute('height', numColors.toString());

		tempContext = tempCanvas.getContext('2d');

		for (i = 0; i < numColors; i++) {
			let linearGradient = tempContext.createLinearGradient(0, 0, 1, numColors),
				saturation = this._color.saturation();

			linearGradient.addColorStop(0, 'hsl(' + i + ', ' + saturation + '%, 100%)');
			linearGradient.addColorStop(0.5, 'hsl(' + i + ', ' + saturation + '%, 50%)');
			linearGradient.addColorStop(1, 'hsl(' + i + ', ' + saturation + '%, 0%)');

			tempContext.fillStyle = linearGradient;
			tempContext.fillRect(i, 0, 1, numColors);
		}

		this.context.drawImage(tempCanvas, 0, 0, this.element.width, this.element.height);
	}
}

/**
 * @default
 * @type {string}
 * @public
 * @static
 */
HSLPicker.CHANGE = 'HSLPickerChange';