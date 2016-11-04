'use strict';
class FriendlyError extends Error {
	get friendly() {
		return true;
	}
}

module.exports = FriendlyError;
