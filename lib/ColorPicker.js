'use strict';

import Color from 'color';
import CanvasWidget from './CanvasWidget';
import Emitter from './Emitter';

/**
 * @class ColorPicker
 */
export default class ColorPicker extends CanvasWidget {
	get hue() {
		return this._hue;
	}

	set hue(value) {
		this._hue = value;
		this._render();
	}

	/**
	 * @public
	 * @param {number} width
	 * @param {number} height
	 */
	constructor(width, height) {
		super(width, height);

		this.selecting = false;

		this._hue = Color({
			'r': 255,
			'g': 255,
			'b': 255
		});

		this._addEvents();
		this._render();
	}

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

	_drawSelection(x, y, selectedColor) {
		this.context.beginPath();
		this.context.arc(x, y, 6, 0, 2 * Math.PI, false);
		this.context.lineWidth = 1;
		this.context.strokeStyle = selectedColor.luminosity() > 0.5 ? '#000' : '#fff';
		this.context.stroke();
	}

	_addEvents() {
		this.element.addEventListener('mousedown', () => {
			this.selecting = true;
		});

		this.element.addEventListener('mouseup', (event) => {
			this._change(event);

			this.selecting = false;
		});

		this.element.addEventListener('mouseleave', () => {
			this.selecting = false;
		});

		this.element.addEventListener('mousemove', (event) => {
			this._change(event);
		});
	}

	_render() {
		let linearGradient = this.context.createLinearGradient(0, 0, 1, this.element.height),
			radialGradient = this.context.createRadialGradient(this.element.width, 0, this.element.width, this.element.width, 0, 0);

		linearGradient.addColorStop(0, '#fff');
		linearGradient.addColorStop(1, '#000');

		radialGradient.addColorStop(0, this.hue.clone().alpha(0).rgbaString());
		radialGradient.addColorStop(1, this.hue.rgbaString());

		this.context.fillStyle = linearGradient;
		this.context.fillRect(0, 0, this.element.width, this.element.height);

		this.context.fillStyle = radialGradient;
		this.context.fillRect(0, 0, this.element.width, this.element.height);
	}
}

ColorPicker.CHANGE = 'ColorPickerChange';