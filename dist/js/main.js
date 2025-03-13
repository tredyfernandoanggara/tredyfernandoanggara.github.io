$(document).ready(function () {
	// Warna Background
	$("section").each(function (idx) {
		var num = idx + 1;
		if (num % 2 === 0) {
			$(this).addClass("bg-second");
		}
	});

	// List Portfolio
	portfolio();

	function portfolio() {
		var portfolio = $("section.portfolio");
		var portfolioFilter = portfolio.find(".portfolio-filters li");
		var portfolioTools = portfolio.find(".portfolio-tools");
		var portfolioContainer = portfolio.find(".portfolio-container");
		var portfolioItem = portfolio.find(".portfolio-item");

		// List On Click
		portfolioFilter.on("click", function () {
			var filterData = $(this).data("filter");
			// Create Active Link
			portfolioFilter.removeClass("active");
			$(this).addClass("active");

			if (filterData === "*") {
				portfolioContainer.children().fadeIn(300);
			} else {
				portfolioContainer.children().hide();
				portfolioContainer.find(filterData).fadeIn(300);
			}
		});

		// Tools
		portfolioTools.each(function () {
			// CheckBox
			var checkBox = $(this).find("#check-item-show");
			var textDetail = portfolioItem.find(".overlay-text");

			checkBox.on("change", function () {
				if ($(this).is(":checked")) {
					// Add Class
					textDetail.addClass("show").fadeIn(300);
				} else {
					// Remove Class
					textDetail.removeClass("show").fadeOut(300);
				}
			});
		});

		// Text Show
		portfolioItem.each(function () {
			$(this)
				.on("mouseenter", function () {
					var text = $(this).find(".overlay-text");
					text.stop(true, true).fadeIn(300); // Menampilkan overlay dengan efek fade in
				})
				.on("mouseleave", function () {
					var text = $(this).find(".overlay-text:not(.show)");
					text.stop(true, true).fadeOut(300); // Menyembunyikan overlay dengan efek fade out
				});
		});

		// Portfolio On Click
		portfolioItem.on("click", function () {
			// Fetch data attributes
			var title = $(this).data("title");
			var descriptionText = $(this).data("description");
			var imgText = $(this).data("img");
			var urlImg = $(this).data("urlimg");
			var skills = $(this).data("skill");

			// Modal elements
			var modal = $("#myModal");
			var modalTitle = modal.find(".modal-title");
			var modalBody = modal.find(".modal-body");
			var modalFooter = modal.find(".modal-footer");

			// Clear the modal body and set title
			modalBody.html("");
			modalTitle.text(title);

			// Process descriptions and images
			var descriptions = descriptionText.split(";;;;;");
			var images = imgText.split(";;;;;");

			// Start building HTML
			var carouselHtml = `<div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
                                    <div class="carousel-inner">`;

			var rowHtml = "";

			// Generate carousel items and row content
			for (let i = 0; i < images.length; i++) {
				var isEven = (i + 1) % 2 === 0;

				// Carousel item
				carouselHtml += `<div class="carousel-item ${i === 0 ? "active" : ""}" ${i + 1 !== images.length ? 'data-bs-interval="5000"' : ""}>
                                    <img src="${urlImg}/${images[i]}" class="d-block w-100" alt="Image ${i + 1}">
                                </div>`;

				// Row content
				rowHtml += `<hr />
                            <div class="row detail-portfolio">
                                <div class="col-md-6 ${isEven ? "portfolio-text" : "portfolio-image"}">
                                    ${isEven ? `${descriptions[i]}` : `<img src="${urlImg}/${images[i]}" class="img-portfolio-detail" />`}
                                </div>
                                <div class="col-md-6 ${isEven ? "portfolio-image" : "portfolio-text"}">
                                    ${isEven ? `<img src="${urlImg}/${images[i]}" class="img-portfolio-detail" />` : `${descriptions[i]}`}
                                </div>
                            </div>`;
			}

			// Close carousel HTML
			carouselHtml += `</div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                            </div>`;

			// Combine carousel HTML and row HTML
			var fullHtml = carouselHtml + rowHtml;

			// Inject the HTML into the modal body and show the modal
			modalBody.html(fullHtml);
			modalFooter.html(`<div style="margin-right:auto;"><p>Skills: ${skills}</p></div>`);
			modal.modal("show");
		});
	}

	// Form Contact
	var form_email = $("form[id=form-email]");

	function send_email() {
		form_email.on("submit", function (event) {
			event.preventDefault();
			var url = $(this).attr("action");

			$.ajax({
				url: url,
				method: "POST",
				data: $(this).serialize(),
				dataType: "json",
				success: function (response) {
					var status = response.status;
					var message = response.message;
					if (status == "success") {
						toastr.success(message);
					} else {
						toastr.error(message);
					}

					setTimeout(() => {
						window.location.reload();
					}, 1000);
				},
				error: function () {},
			});
		});
	}

	send_email();
});
