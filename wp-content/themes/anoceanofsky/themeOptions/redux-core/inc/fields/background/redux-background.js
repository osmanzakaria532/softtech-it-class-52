/**
 * Redux Background
 * Dependencies        : jquery, wp media uploader
 * Feature added by    : Dovy Paukstys
 * Date                : 07 Jan 2014
 */

/*global redux_change, wp, redux, colorValidate, jQuery */

(function ( $ ) {
	'use strict';

	redux.field_objects            = redux.field_objects || {};
	redux.field_objects.background = redux.field_objects.background || {};

	redux.field_objects.background.init = function ( selector ) {
		selector = $.redux.getSelector( selector, 'background' );

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

				// Remove the image button.
				el.find( '.redux-remove-background' ).off( 'click' ).on(
					'click',
					function ( e ) {
						e.preventDefault();
						redux.field_objects.background.removeImage( $( this ).parents( '.redux-container-background:first' ) );
						redux.field_objects.background.preview( $( this ) );
						return false;
					}
				);

				// Upload media button.
				el.find( '.redux-background-upload' ).off().on(
					'click',
					function ( event ) {
						redux.field_objects.background.addImage( event, $( this ).parents( '.redux-container-background:first' ) );
					}
				);

				el.find( '.redux-background-input' ).on(
					'change',
					function () {
						redux.field_objects.background.preview( $( this ) );
					}
				);

				el.find( '.redux-color' ).wpColorPicker(
					{
						change: function ( e, ui ) {
							$( this ).val( ui.color.toString() );
							redux_change( $( this ) );
							$( '#' + e.target.id + '-transparency' ).prop( 'checked', false );
							redux.field_objects.background.preview( $( this ) );
						},

						clear: function ( e ) {
							e = null;
							redux_change( $( this ).parent().find( '.redux-color-init' ) );
							redux.field_objects.background.preview( $( this ) );
						}
					}
				);

				// Replace and validate field on blur.
				el.find( '.redux-color' ).on(
					'blur',
					function () {
						const value = $( this ).val();
						const id    = '#' + $( this ).attr( 'id' );

						if ( 'transparent' === value ) {
							$( this ).parent().parent().find( '.wp-color-result' ).css( 'background-color', 'transparent' );

							el.find( id + '-transparency' ).prop( 'checked', true );
						} else {
							if ( colorValidate( this ) === value ) {
								if ( 0 !== value.indexOf( '#' ) ) {
									$( this ).val( $( this ).data( 'oldcolor' ) );
								}
							}

							el.find( id + '-transparency' ).prop( 'checked', false );
						}
					}
				);

				el.find( '.redux-color' ).on(
					'focus',
					function () {
						$( this ).data( 'oldcolor', $( this ).val() );
					}
				);

				el.find( '.redux-color' ).on(
					'keyup',
					function () {
						const value = $( this ).val();
						const color = colorValidate( this );
						const id    = '#' + $( this ).attr( 'id' );

						if ( 'transparent' === value ) {
							$( this ).parent().parent().find( '.wp-color-result' ).css( 'background-color', 'transparent' );
							el.find( id + '-transparency' ).prop( 'checked', true );
						} else {
							el.find( id + '-transparency' ).prop( 'checked', false );

							if ( color && color !== $( this ).val() ) {
								$( this ).val( color );
							}
						}
					}
				);

				// When transparency checkbox is clicked.
				el.find( '.color-transparency' ).on(
					'click',
					function () {
						let prevColor;

						if ( $( this ).is( ':checked' ) ) {
							el.find( '.redux-saved-color' ).val( $( '#' + $( this ).data( 'id' ) ).val() );
							el.find( '#' + $( this ).data( 'id' ) ).val( 'transparent' );
							el.find( '#' + $( this ).data( 'id' ) ).parents( '.redux-field-container' ).find( '.wp-color-result' ).css( 'background-color', 'transparent' );
						} else {
							prevColor = $( this ).parents( '.redux-field-container' ).find( '.redux-saved-color' ).val();

							if ( '' === prevColor ) {
								prevColor = $( '#' + $( this ).data( 'id' ) ).data( 'default-color' );
							}

							el.find( '#' + $( this ).data( 'id' ) ).parents( '.redux-field-container' ).find( '.wp-color-result' ).css( 'background-color', prevColor );
							el.find( '#' + $( this ).data( 'id' ) ).val( prevColor );
						}

						redux_change( $( this ) );
					}
				);

				el.find( ' .redux-background-repeat, .redux-background-clip, .redux-background-origin, .redux-background-size, .redux-background-attachment, .redux-background-position' ).select2();
			}
		);
	};

	// Update the background preview.
	redux.field_objects.background.preview = function ( selector ) {
		let css;

		let hide      = true;
		const parent  = $( selector ).parents( '.redux-container-background:first' );
		const preview = $( parent ).find( '.background-preview' );

		if ( ! preview ) { // No preview present.
			return;
		}

		css = 'height:' + preview.height() + 'px;';

		$( parent ).find( '.redux-background-input' ).each(
			function () {
				let data = $( this ).serializeArray();

				data = data[0];
				if ( data && data.name.indexOf( '[background-' ) !== - 1 ) {
					if ( '' !== data.value ) {
						hide = false;

						data.name = data.name.split( '[background-' );
						data.name = 'background-' + data.name[1].replace( ']', '' );

						if ( 'background-image' === data.name ) {
							css += data.name + ':url("' + data.value + '");';
						} else {
							css += data.name + ':' + data.value + ';';
						}
					}
				}
			}
		);

		if ( ! hide ) {
			preview.attr( 'style', css ).fadeIn();
		} else {
			preview.slideUp();
		}
	};

	// Add a file via the wp.media function.
	redux.field_objects.background.addImage = function ( event, selector ) {
		let frame;
		const jQueryel = $( this );

		event.preventDefault();

		// If the media frame already exists, reopen it.
		if ( frame ) {
			frame.open();
			return;
		}

		// Create the media frame.
		frame = wp.media(
			{
				multiple: false,
				library: {

				},
				title: jQueryel.data( 'choose' ),
				button: {
					text: jQueryel.data( 'update' )

				}
			}
		);

		// When an image is selected, run a callback.
		frame.on(
			'select',
			function () {
				let thumbSrc;
				let height;
				let key;
				let object;

				// Grab the selected attachment.
				const attachment = frame.state().get( 'selection' ).first();
				frame.close();

				if ( 'image' !== attachment.attributes.type ) {
					return;
				}

				selector.find( '.upload' ).val( attachment.attributes.url );
				selector.find( '.upload-id' ).val( attachment.attributes.id );
				selector.find( '.upload-height' ).val( attachment.attributes.height );
				selector.find( '.upload-width' ).val( attachment.attributes.width );

				redux_change( $( selector ).find( '.upload-id' ) );

				thumbSrc = attachment.attributes.url;

				if ( 'undefined' !== typeof attachment.attributes.sizes && 'undefined' !== typeof attachment.attributes.sizes.thumbnail ) {
					thumbSrc = attachment.attributes.sizes.thumbnail.url;
				} else if ( 'undefined' !== typeof attachment.attributes.sizes ) {
					height = attachment.attributes.height;

					for ( key in attachment.attributes.sizes ) {
						if ( attachment.attributes.sizes.hasOwnProperty( key ) ) {
							object = attachment.attributes.sizes[key];
							if ( object.height < height ) {
								height   = object.height;
								thumbSrc = object.url;
							}
						}
					}
				} else {
					thumbSrc = attachment.attributes.icon;
				}

				selector.find( '.upload-thumbnail' ).val( thumbSrc );

				if ( ! selector.find( '.upload' ).hasClass( 'noPreview' ) ) {
					selector.find( '.screenshot' ).empty().hide().append( '<img alt="" class="redux-option-image" src="' + thumbSrc + '">' ).slideDown( 'fast' );
				}

				selector.find( '.redux-remove-background' ).removeClass( 'hide' );
				selector.find( '.redux-background-input-properties' ).slideDown();

				redux.field_objects.background.preview( selector.find( '.upload' ) );
			}
		);

		// Finally, open the modal.
		frame.open();
	};

	// Update the background preview.
	redux.field_objects.background.removeImage = function ( selector ) {
		let screenshot;

		// This shouldn't have been run...
		if ( ! selector.find( '.redux-remove-background' ).addClass( 'hide' ) ) {
			return;
		}

		selector.find( '.redux-remove-background' ).addClass( 'hide' ); // Hide "Remove" button.
		selector.find( '.upload' ).val( '' );
		selector.find( '.upload-id' ).val( '' );
		selector.find( '.upload-height' ).val( '' );
		selector.find( '.upload-width' ).val( '' );

		redux_change( $( selector ).find( '.upload-id' ) );

		selector.find( '.redux-background-input-properties' ).hide();

		screenshot = selector.find( '.screenshot' );

		// Hide the screenshot.
		screenshot.slideUp();

		selector.find( '.remove-file' ).off();

		// We don't display the upload button if .upload-notice is present
		// This means the user doesn't have the WordPress 3.5 Media Library Support.
		if ( $( '.section-upload .upload-notice' ).length > 0 ) {
			$( '.redux-background-upload' ).remove();
		}
	};
})( jQuery );
