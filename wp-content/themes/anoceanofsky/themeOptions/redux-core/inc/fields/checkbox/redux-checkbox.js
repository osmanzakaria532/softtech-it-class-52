/**
 * Redux Checkbox
 * Dependencies        : jquery
 * Feature added by    : Dovy Paukstys
 * Date                : 17 June 2014
 */

/*global redux_change, redux*/

(function ( $ ) {
	'use strict';

	redux.field_objects          = redux.field_objects || {};
	redux.field_objects.checkbox = redux.field_objects.checkbox || {};

	redux.field_objects.checkbox.init = function ( selector ) {
		selector = $.redux.getSelector( selector, 'checkbox' );

		$( selector ).each(
			function () {
				const el   = $( this );
				let parent = el;

				if ( ! el.hasClass( 'redux-field-container' ) ) {
					parent = el.parents( '.redux-field-container:first' );
				}

				if ( parent.is( ':hidden' ) ) {
					return;
				}

				if ( parent.hasClass( 'redux-field-init' ) ) {
					parent.removeClass( 'redux-field-init' );
				} else {
					return;
				}

				el.find( '.checkbox' ).on(
					'click',
					function () {
						let val = 0;

						if ( $( this ).is( ':checked' ) ) {
							val = $( this ).parent().find( '.checkbox-check' ).attr( 'data-val' );
						}

						$( this ).parent().find( '.checkbox-check' ).val( val );

						redux_change( $( this ) );
					}
				);
			}
		);
	};
})( jQuery );
