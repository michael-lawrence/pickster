'use strict';

import Color from 'color';
import Picker from './Picker';

/**
 * @class HSLPicker
 */
export default class HSLPicker extends Picker {
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