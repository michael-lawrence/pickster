'use strict';

import Color from 'color';
import Widget from './Widget';
import Swatch from './Swatch';

/**
 * @class SwatchList
 */
export default class SwatchList extends Widget {
	/**
	 * @returns {Color[]|string[]|object[]}
	 * @public
	 */
	get colors() {
		return this._colors;
	}

	/**
	 * @param {Color[]|string[]|object[]} value
	 * @public
	 */
	set colors(value) {
		this._colors = value;
		this._render();
	}

	/**
	 * @public
	 * @param {number} swatchWidth
	 * @param {number} swatchHeight
	 * @param {Color[]|string[]|object[]} [colors]
	 */
	constructor(swatchWidth, swatchHeight, colors) {
		super('div');

		this.swatchWidth = swatchWidth;
		this.swatchHeight = swatchHeight;

		this._colors = colors || [];
		this._render();
	}

	/**
	 * @param {Color|string|object} color
	 * @public
	 */
	addColor(color) {
		this._colors.push(Color(color));
		this._render();
	}

	/**
	 * @private
	 */
	_render() {
		this.element.innerHTML = '';

		this._colors.forEach(function (color) {
			let swatch = new Swatch(this.swatchWidth, this.swatchHeight, color);

			swatch.element.addEventListener('click', () => {
				this.emit(SwatchList.CHANGE, swatch.color);
			});

			swatch.appendTo(this.element);
		}, this);
	}
}



/**
 * @default
 * @type {string}
 * @public
 * @static
 */
SwatchList.CHANGE = 'SwatchListChange';