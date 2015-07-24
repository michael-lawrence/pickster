'use strict';

import Widget from './Widget';

/**
 * @class CanvasWidget
 */
export default class CanvasWidget extends Widget {
	/**
	 * @param {number} width
	 * @param {number} height
	 * @public
	 */
	constructor(width, height) {
		super('canvas');

		/** @member {CanvasRenderingContext2D} */
		this.context = this.element.getContext('2d');

		this.element.setAttribute('width', width);
		this.element.setAttribute('height', height);
	}
}