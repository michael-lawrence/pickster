'use strict';

import Color from 'color';

/**
 * @class SwatchList
 */
export default class SwatchList {
	get colors() {
		return this._colors;
	}

	set colors(value) {
		this._colors = value;
		this._render();
	}

	/**
	 * @public
	 * @param {Element} element
	 */
	constructor(element) {
		this.element = element;
	}

	_render() {
		this.element.innerHTML = '';


	}
}