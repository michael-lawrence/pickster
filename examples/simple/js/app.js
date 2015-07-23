'use strict';

import Emitter from 'pickster/Emitter';
import HuePicker from 'pickster/HuePicker';
import ColorPicker from 'pickster/ColorPicker';
import Swatch from 'pickster/Swatch';
import SwatchList from 'pickster/SwatchList';

let $colorPicker = document.getElementById('colorPicker'),
	$huePicker = document.getElementById('huePicker'),
	$swatch = document.getElementById('swatch'),
	$swatches = document.getElementById('swatches'),
	$customSwatches = document.getElementById('customSwatches'),
	colorPicker = new ColorPicker(320, 320),
	huePicker = new HuePicker(20, 320),
	swatch = new Swatch(20, 20),
	swatches = new SwatchList($swatches),
	customSwatches = new SwatchList($customSwatches);

colorPicker.on(ColorPicker.CHANGE, function (color) {
	swatch.color = color;
});

huePicker.on(HuePicker.CHANGE, function (color) {
	colorPicker.hue = color;
});

colorPicker.appendTo($colorPicker);
huePicker.appendTo($huePicker);
swatch.appendTo($swatch);