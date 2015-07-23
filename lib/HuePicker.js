'use strict';

import Color from 'color';
import CanvasWidget from './CanvasWidget';
import Emitter from './Emitter';

/**
 * @class HuePicker
 */
export default class HuePicker extends CanvasWidget {
	/**
	 * @public
	 * @param {number} width
	 * @param {number} height
	 */
	constructor(width, height) {
		super(width, height);

		this.selecting = false;
		this.color = Color({
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

	_drawSelection(y) {
		let thickness = 4;

		this.context.fillStyle = '#000';
		this.context.fillRect(0, y - (thickness / 2) - 1, this.element.width, 1);

		this.context.fillStyle = 'rgba(255, 255, 255, 0.75)';
		this.context.fillRect(0, y - (thickness / 2), this.element.width, thickness);

		this.context.fillStyle = '#000';
		this.context.fillRect(0, y + (thickness / 2) + 1, this.element.width, 1);
	}

	_addEvents() {
		this.element.addEventListener('mousedown', () => {
			this.selecting = true;
		});

		this.element.addEventListener('mouseup', () => {
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
			colorCount = 360,
			i;

		for (i = 0; i < colorCount; i++) {
			linearGradient.addColorStop(
				i / colorCount,
				'hsla(' + i + ', 100%, 50%, 1)'
			);
		}

		this.context.fillStyle = linearGradient;
		this.context.fillRect(0, 0, this.element.width, this.element.height);
	}
}

HuePicker.CHANGE = 'HuePickerChange';