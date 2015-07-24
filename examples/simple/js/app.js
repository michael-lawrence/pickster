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
	swatches = new SwatchList(20, 20, [
		'#ff0000',
		'#ffff00',
		'#00ff00',
		'#00ffff',
		'#0000ff',
		'#ff00ff',
		'hsl(0, 0%, 100%)',
		'hsl(0, 0%, 90%)',
		'hsl(0, 0%, 80%)',
		'hsl(0, 0%, 70%)',
		'hsl(0, 0%, 60%)',
		'hsl(0, 0%, 50%)',
		'hsl(0, 0%, 40%)',
		'hsl(0, 0%, 30%)',
		'hsl(0, 0%, 20%)',
		'hsl(0, 0%, 10%)',
		'hsl(0, 0%, 0%)'
	]),
	customSwatches = new SwatchList($customSwatches);

colorPicker.on(ColorPicker.CHANGE, function (color) {
	swatch.color = color;
});

huePicker.on(HuePicker.CHANGE, function (color) {
	colorPicker.hue = color;
});

swatches.on(SwatchList.CHANGE, function (color) {
	colorPicker.hue =
		huePicker.color =
			swatch.color = color;
});

swatches.appendTo($swatches);
colorPicker.appendTo($colorPicker);
huePicker.appendTo($huePicker);
swatch.appendTo($swatch);