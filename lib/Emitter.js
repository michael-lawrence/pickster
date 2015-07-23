'use strict';

let listeners = {};

function _checkParameters(obj, event) {
	if (!obj) {
		throw new Error('Parameter "obj" is invalid.');
	}

	if (!event) {
		throw new Error('Parameter "event" is invalid.');
	}
}

function on(obj, event, handler) {
	_checkParameters(obj, event);

	listeners[obj] = listeners[obj] || [];
	listeners[obj][event] = listeners[obj][event] || [];
	listeners[obj][event].push(handler);
}

function off(obj, event, handler) {
	_checkParameters(obj, event);

	if (handler) {
		let handlers = listeners[obj][event];
		handlers.splice(handlers.indexOf(handler), 1);
	} else {
		listeners[obj][event] = [];
	}
}

function emit(obj, event, ...args) {
	_checkParameters(obj, event);

	const eventListeners = listeners[obj][event];

	if (eventListeners) {
		eventListeners.forEach(event => {
			event.apply(obj, args);
		})
	}
}

function getEventHandlers(obj, event) {
	_checkParameters(obj, event);

	return listeners[obj][event];
}

export default {
	on,
	off,
	emit,
	getEventHandlers
}