'use strict';

import Widget from './Widget';

/**
 * @class CanvasWidget
 */
export default class CanvasWidget extends Widget {
	/**
	 * @public
	 * @param {number} width
	 * @param {number} height
	 */
	constructor(width, height) {
		super('canvas');

		/** @member {CanvasRenderingContext2D} */
		this.context = this.element.getContext('2d');

		this.element.setAttribute('width', width);
		this.element.setAttribute('height', height);
	}
}