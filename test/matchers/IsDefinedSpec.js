'use strict';

var IsDefined = require('../../lib/matchers/IsDefined')
	, Description = require('../../lib/Description')
	, __ = require('../../lib/hamjest')
	;

describe('IsDefined', function () {

	describe('defined', function () {
		var defined = IsDefined.defined;
		var sut;

		beforeEach(function () {
			sut = defined();
		});

		it('should match any value', function () {
			__.assertThat(sut.matches(0), __.is(true));
			__.assertThat(sut.matches(''), __.is(true));
			__.assertThat(sut.matches([]), __.is(true));
			__.assertThat(sut.matches({}), __.is(true));

			__.assertThat(sut.matches(), __.is(false));
			__.assertThat(sut.matches(undefined), __.is(false));
		});

		describe('description', function () {
			var description;

			beforeEach(function () {
				description = new Description();
			});

			it('should be concise', function () {

				sut.describeTo(description);

				__.assertThat(description.get(), __.equalTo('defined'));
			});

			it('should contain mismatched values', function () {
				var description = new Description();

				sut.describeMismatch({an: 'object'}, description);

				__.assertThat(description.get(), __.equalTo('was {"an":"object"}'));
			});
		});
	});
});