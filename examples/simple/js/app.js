'use strict';

import Emitter from 'pickster/Emitter';
import HuePicker from 'pickster/HuePicker';
import ColorPicker from 'pickster/ColorPicker';
import Swatch from 'pickster/Swatch';
import SwatchList from 'pickster/SwatchList';
import HSLPicker from 'pickster/HSLPicker';
import SaturationPicker from 'pickster/SaturationPicker';

let $colorPicker = document.getElementById('colorPicker'),
	$huePicker = document.getElementById('huePicker'),
	$swatch = document.getElementById('swatch'),
	$swatches = document.getElementById('swatches'),
	$customSwatches = document.getElementById('customSwatches'),
	$hslPicker = document.getElementById('hslPicker'),
	$saturationPicker = document.getElementById('saturationPicker'),
	colorPicker = new ColorPicker(360, 360),
	huePicker = new HuePicker(20, 360),
	hslPicker = new HSLPicker(720, 360),
	saturationPicker = new SaturationPicker(20, 360),
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
	colorPicker.hue = color.hue();
});

swatches.on(SwatchList.CHANGE, function (color) {
	colorPicker.hue = color.hue();

	huePicker.color =
		swatch.color = color;
});

hslPicker.on(HSLPicker.CHANGE, function (color) {
	saturationPicker.hue = color.hue();
	saturationPicker.lightness = color.lightness();
});

saturationPicker.on(SaturationPicker.CHANGE, function (color) {
	hslPicker.saturation = color.saturation();
});

swatches.appendTo($swatches);
colorPicker.appendTo($colorPicker);
huePicker.appendTo($huePicker);
swatch.appendTo($swatch);
hslPicker.appendTo($hslPicker);
saturationPicker.appendTo($saturationPicker);