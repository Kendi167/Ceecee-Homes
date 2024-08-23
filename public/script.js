// Function to display the booking form modal
function showBookingForm(index) {
    const selectedListing = listingsData[index];
    document.getElementById('bookingModalLabel').textContent = `Booking: ${selectedListing.name}`;
    document.getElementById('modalBnbName').value = selectedListing.name;
    document.getElementById('modalPricePerNight').textContent = selectedListing.price;

    // Reset the form fields
    document.getElementById('modalUserName').value = '';
    document.getElementById('modalUserEmail').value = '';
    document.getElementById('modalCheckinDate').value = '';
    document.getElementById('modalCheckoutDate').value = '';
    document.getElementById('modalTotalCost').textContent = '';

    // Hide the details modal and show the booking modal
    $('#detailsModal').modal('hide');
    $('#bookingModal').modal('show');
}

function calculateTotalCost() {
    const checkinDate = new Date(document.getElementById('modalCheckinDate').value);
    const checkoutDate = new Date(document.getElementById('modalCheckoutDate').value);
    const pricePerNight = parseFloat(document.getElementById('modalPricePerNight').textContent.replace('$', '').replace('/night', ''));

    if (checkoutDate > checkinDate) {
        const nights = Math.round((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24));
        const totalCost = nights * pricePerNight;
        document.getElementById('modalTotalCost').textContent = `$${totalCost.toFixed(2)}`;
    } else {
        document.getElementById('modalTotalCost').textContent = '';
    }
}

// Add event listeners for date changes to calculate total cost
document.getElementById('modalCheckinDate').addEventListener('change', calculateTotalCost);
document.getElementById('modalCheckoutDate').addEventListener('change', calculateTotalCost);


// Call the function to render listings when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function () {
    renderListings();
});

// Intersection Observer for text fade-in effect
document.addEventListener('DOMContentLoaded', function () {
    const fadeElements = document.querySelectorAll('.text-fade-in');

    function checkVisibility() {
        const windowHeight = window.innerHeight;
        const scrollTop = window.scrollY;

        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top + scrollTop;
            const elementBottom = elementTop + element.clientHeight;

            // Check if element is within the viewport
            if (elementBottom > scrollTop && elementTop < (scrollTop + windowHeight)) {
                element.classList.add('show');
            }
        });
    }

    // Initial check
    checkVisibility();

    // Check on scroll
    window.addEventListener('scroll', checkVisibility);
});


