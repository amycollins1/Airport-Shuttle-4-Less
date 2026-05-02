$(document).ready(function () {
  window.onscroll = function () {
    toggleStickyHeader();
  };

  function toggleStickyHeader() {
    const header = document.querySelector("header");
    const stickyPosition = 50; // Change this value to set when the header becomes sticky

    if (window.pageYOffset > stickyPosition) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  }
});

// navigation js
document.addEventListener("DOMContentLoaded", function () {
  // Select all dropdown toggle buttons
  const dropdowns = document.querySelectorAll(".dropdown-toggle");
  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener("click", function (event) {
      // Prevent default anchor behavior
      event.preventDefault();

      // Find the corresponding dropdown menu
      const dropdownMenu = this.nextElementSibling;

      // Check if the dropdown menu exists and toggle the 'show' class
      if (dropdownMenu && dropdownMenu.classList.contains("dropdown-menu")) {
        dropdownMenu.classList.toggle("show");

        // Hide other dropdowns if you want to ensure only one is open at a time
        dropdowns.forEach((d) => {
          if (d !== this) {
            const otherMenu = d.nextElementSibling;
            if (otherMenu) {
              otherMenu.classList.remove("show");
            }
          }
        });
      }
    });
  });

  // Optional: Close dropdown when clicking outside of it
  document.addEventListener("click", function (event) {
    if (!event.target.closest(".dropdown")) {
      dropdowns.forEach((dropdown) => {
        const dropdownMenu = dropdown.nextElementSibling;
        if (dropdownMenu) {
          dropdownMenu.classList.remove("show");
        }
      });
    }
  });
});

// hide and show div
$(document).ready(function () {
  function toggleReturnDiv(tabId) {
    const activeTab = $(`#${tabId}`); // Get the specific tab by ID
    const checkbox = activeTab.find('input[type="checkbox"]');
    const returnDiv = activeTab.find(".returnDiv");

    if (checkbox.is(":checked")) {
      ChkRetReservation = true;
      returnDiv.show();
    } else {
      ChkRetReservation = false;
      returnDiv.hide();
    }
  }
  $('#airport input[type="checkbox"]').change(function () {
    toggleReturnDiv("airport");
  });
  $('#pointToPoint input[type="checkbox"]').change(function () {
    toggleReturnDiv("pointToPoint");
  });
  $('#fredrick input[type="checkbox"]').change(function () {
    toggleReturnDiv("fredrick");
  });
  $('button[data-bs-toggle="tab"]').on("shown.bs.tab", function () {
    $('.tab-pane input[type="checkbox"]').prop("checked", false);
    $(".tab-pane .returnDiv").hide();
  });
});

// -------------
// reviewSlider
$(".fleetSlider").slick({
  dots: false,
  arrows: true,
  autoplay: true,
  infinite: true,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: false,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
      },
    },
  ],
});

// -------------
// reviewSlider
$(".reviewSlider").slick({
  dots: false,
  arrows: false,
  autoplay: true,
  infinite: true,
  speed: 300,
  slidesToShow: 2,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
});

// -------------
// fancybox js
$(document).ready(function () {
  $('[data-fancybox="gallery"]').fancybox({
    // Customize options if needed
    buttons: ["zoom", "share", "slideShow", "fullScreen", "close"],
  });
});

// -------------
// date & time picker
$(".date-pick").datetimepicker({
  timepicker: false,
  datepicker: true,
  format: "d-m-y",
  step: 10,
});
// Only Time Picker
$(".time-pick").datetimepicker({
  datepicker: false,
  format: "H:i",
  step: 30,
});

// -------------
// pickupSec js
$(document).ready(function () {
  // Change the label based on the dropdown selection
  $("#Service").on("change", function () {
    // Get the selected option value
    const selectedOption = $(this).val();
    // Update the service label text based on the selected option
    if (selectedOption === "To Airport") {
      $(".serviceLabel").text("Pick Up Location");
      $(".serviceDate").text("Pick-up Date");
      $(".serviceTime").text("Pickup Time");
      $(".flightService").text("Flight Arrival Time");
    } else if (selectedOption === "From Airport") {
      $(".serviceLabel").text("Drop Location");
      $(".serviceDate").text("Drop Date");
      $(".serviceTime").text("Drop Time");
      $(".flightService").text("Return Time");
    }
    if (selectedOption === "From Airport") {
      $(".fromAirport").show();
    } else {
      $(".fromAirport").hide();
    }
      if (selectedOption === "To Airport" && ChkRetReservation) {
      $(".toAirport").show();
    } else {
      $(".toAirport").hide();
    }
  });
  $("#FredrickService").on("change", function () {
    const selectedOption = $(this).val();
    if (selectedOption === "From Airport") {
      $(".airline").show();
      $(".flightNumber").show();
      $(".flightTime").text("Flight arrival time");
    } else {
      $(".airline").hide();
      $(".flightNumber").hide();
      $(".flightTime").text("Pickup time");
    }
  });
});

$(document).ready(function () {
  // Handle the click event on each list item (disabled switching)
  $(".steps .list-inline li").click(function (event) {
    event.preventDefault();
  });
  // Handle the click event on the Search Now button
  $(".primaryButton").click(function () {
    if ($(this).text().trim().includes("Search Now")) {
      if (bValid) {
        $(".rideInfo").hide();
        $(".selectRide").show();
        $(".list-inline li").removeClass("active");
        $('.list-inline li[data-target=".selectRide"]').addClass("active");
      }
      // $('html, body').animate({ scrollTop: $('.selectRide').offset().top }, 'slow');
    }
  });

  // Handle the click event on the Book Now button
  $(".bookNowBtn").click(function () {
    $(".selectRide").hide();
    $(".bookRide").show();
    $(".list-inline li").removeClass("active");
    $('.list-inline li[data-target=".bookRide"]').addClass("active");
    // $('html, body').animate({ scrollTop: $('.bookRide').offset().top }, 'slow');
  });

  // All vehicle except Frederick Book Now on search tab/page
  $("#VehicleList").on("click", ".bookNowBtn", function () {
    $(".selectRide").hide();
    $(".bookRide").show();
    $(".list-inline li").removeClass("active");
    $('.list-inline li[data-target=".bookRide"]').addClass("active");
    // $('html, body').animate({ scrollTop: $('.bookRide').offset().top }, 'slow');
  });

  // Frederick vehicle Book Now on search tab/page
  $("#VehicleList").on("click", ".primaryButton", function () {
    $(".selectRide").hide();
    $(".bookRide").show();
    $(".list-inline li").removeClass("active");
    $('.list-inline li[data-target=".bookRide"]').addClass("active");
    // $('html, body').animate({ scrollTop: $('.bookRide').offset().top }, 'slow');
  });

  // Handle the click event on the Back button to navigate to the previous step
  $("#VehicleList").on("click", ".secondaryButton", function () {
    if ($(".bookRide").is(":visible")) {
      // If currently on step 3, go back to step 2
      $(".bookRide").hide();
      $(".selectRide").show();
      $(".list-inline li").removeClass("active");
      $('.list-inline li[data-target=".selectRide"]').addClass("active");
      $("html, body").animate({ scrollTop: $(".selectRide").offset().top });
    } else if ($(".selectRide").is(":visible")) {
      // If currently on step 2, go back to step 1
      $(".selectRide").hide();
      $(".rideInfo").show();
      $(".list-inline li").removeClass("active");
      $('.list-inline li[data-target=".rideInfo"]').addClass("active");
      $("html, body").animate({ scrollTop: $(".rideInfo").offset().top });
    }
  });
});

// -------------
// Get the checkbox and button elements
$(document).ready(function () {
  const checkbox = document.getElementById("termNCon");
  const completeBookingBtn = document.getElementById("completeBookingBtn");

  // Add an event listener to the checkbox
  checkbox.addEventListener("change", function () {
    // Enable the button if the checkbox is checked, otherwise disable it
    completeBookingBtn.disabled = !this.checked;
  });
});
