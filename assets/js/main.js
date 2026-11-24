/*
	Read Only by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var $window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$titleBar = null,
		$nav = $('#nav'),
		$wrapper = $('#wrapper');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '1025px',  '1280px' ],
			medium:   [ '737px',   '1024px' ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ],
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Tweaks/fixes.

		// Polyfill: Object fit.
			if (!browser.canUse('object-fit')) {

				$('.image[data-position]').each(function() {

					var $this = $(this),
						$img = $this.children('img');

					// Apply img as background.
						$this
							.css('background-image', 'url("' + $img.attr('src') + '")')
							.css('background-position', $this.data('position'))
							.css('background-size', 'cover')
							.css('background-repeat', 'no-repeat');

					// Hide img.
						$img
							.css('opacity', '0');

				});

			}

	// Header Panel.

// Nav.
			var $nav_a = $nav.find('a'),
				lockTimeout = null;

			$nav_a
				.addClass('scrolly')
				.on('click', function() {

					var $this = $(this);

					// External link? Bail.
						if ($this.attr('href').charAt(0) != '#')
							return;

					// Remove active and locked states from all links, then activate and lock this one.
						$nav_a.removeClass('active active-locked');
						$this.addClass('active active-locked');

					// Keep the lock active for the duration of the 1000ms Scrolly animation
					// so intermediate sections never highlight mid-scroll.
						window.clearTimeout(lockTimeout);
						lockTimeout = window.setTimeout(function() {
							$nav_a.removeClass('active-locked');
						}, 1050);

				})
				.each(function() {

					var	$this = $(this),
						id = $this.attr('href'),
						$section = $(id);

					// No section for this link? Bail.
						if ($section.length < 1)
							return;

					// Scrollex.
						$section.scrollex({
							mode: 'middle',
							top: '5vh',
							bottom: '5vh',
							initialize: function() {

								// Deactivate section.
									$section.addClass('inactive');

							},
							enter: function() {

								// Activate section.
									$section.removeClass('inactive');

								// Only update the sidebar highlight if we aren't currently scrolling from a click.
									if ($nav_a.filter('.active-locked').length == 0) {
										$nav_a.removeClass('active');
										$this.addClass('active');
									}

							}
						});

				});
			// Title Bar.
			$titleBar = $(
				'<div id="titleBar">' +
					'<a href="#header" class="toggle"></a>' +
					'<span class="title"><a href="#"><img src="images/logo.png" alt="Therapy with Xanthe logo" class="titlebar-logo" />Therapy with Xanthe</a></span>' +
				'</div>'
			)
				.appendTo($body);
		// Panel.
			$header
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right',
					target: $body,
					visibleClass: 'header-visible'
				});

	// Scrolly.
		$('.scrolly').scrolly({
			speed: 1000,
			offset: function() {

				if (breakpoints.active('<=medium'))
					return $titleBar.height();

				return 0;

			}
		});

})(jQuery);

/* --- Custom Image Modal Behavior --- */
$(document).ready(function() {
    const $modal = $('#imageModal');
    const $modalImg = $('#modalImage');
    const $modalCaption = $('#modalCaption');

    // Open modal on trigger click
    $(document).on('click', '.modal-trigger', function(e) {
        e.preventDefault();
        const imgSrc = $(this).attr('data-image');
        const imgTitle = $(this).attr('data-title');

        if (imgSrc) {
            $modalImg.attr('src', imgSrc);
            $modalCaption.text(imgTitle || '');
            $modal.addClass('is-visible');
        }
    });

    // Close modal functions
    function closeModal() {
        $modal.removeClass('is-visible');
        $modalImg.attr('src', ''); // Clear source
    }

    $('.custom-modal-close').on('click', function() {
        closeModal();
    });

    // Close when clicking outside the image content wrapper
    $modal.on('click', function(e) {
        if ($(e.target).is($modal)) {
            closeModal();
        }
    });

    // Close on pressing the ESC key
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});