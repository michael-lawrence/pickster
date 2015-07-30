'use strict';

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
		'hsl(0, 0%, 0%)',

		'hsl(0, 100%, 50%)',
		'hsl(36, 100%, 50%)',
		'hsl(72, 100%, 50%)',
		'hsl(108, 100%, 50%)',
		'hsl(144, 100%, 50%)',
		'hsl(180, 100%, 50%)',
		'hsl(216, 100%, 50%)',
		'hsl(252, 100%, 50%)',
		'hsl(288, 100%, 50%)',
		'hsl(324, 100%, 50%)'
	]),
	customSwatches = new SwatchList($customSwatches);

colorPicker.observe(ColorPicker.CHANGE, change => {
	swatch.color = change.color;
});

huePicker.observe(HuePicker.CHANGE, change => {
	colorPicker.hue = change.color.hue();
});

swatches.observe(SwatchList.CHANGE, change => {
	colorPicker.hue = change.color.hue();

	huePicker.color =
		swatch.color = change.color;

	saturationPicker.hue = change.color.hue();
	saturationPicker.lightness = change.color.lightness();
});

hslPicker.observe(HSLPicker.CHANGE, change => {
	saturationPicker.hue = change.color.hue();
	saturationPicker.lightness = change.color.lightness();

	swatch.color = change.color;
});

saturationPicker.observe(SaturationPicker.CHANGE, change => {
	hslPicker.saturation = change.color.saturation();
});

swatches.appendTo($swatches);
colorPicker.appendTo($colorPicker);
huePicker.appendTo($huePicker);
swatch.appendTo($swatch);
hslPicker.appendTo($hslPicker);
saturationPicker.appendTo($saturationPicker);