// Sample data for B&B listings
const listingsData = [
    {
        name: 'Spacious 3 Bedroom Apartment',
        images: ['images/1(37).jpg', 'images/1(48).jpg', 'images/1(61).jpg', 'images/1(64).jpg', 'images/1(74).jpg'],
        description: 'Spacious living room with modern decor',
        price: '$120/night',
        location: { lat: -1.2921, lng: 36.8219 }
    },
    {
        name: '2 Bedroom Apartment',
        images: ['images/images(1).jpg', 'images/images(2).jpg'],
        description: 'A peaceful retreat with ocean views.',
        price: '$200/night'
    },
    {
        name: 'Studio Apartment',
        images: ['images/images(3).jpg', 'images/images(4).jpg'],
        description: 'Cozy and affordable studio in the city center.',
        price: '$80/night'
    }
];

function initMap() {
    // Create a map centered at the first listing's location
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: listingsData[0].location
    });

    // Place a marker at the first listing's location
    const marker = new google.maps.Marker({
        position: listingsData[0].location,
        map: map,
        title: listingsData[0].name
    });
}

// Function to render listings
function renderListings() {
    const listingsContainer = document.getElementById('listings');
    listingsContainer.innerHTML = ''; // Clear existing listings

    listingsData.forEach((listing, index) => {
        const listingElement = document.createElement('div');
        listingElement.className = 'col-md-4 mb-4';
        listingElement.innerHTML = `
            <div class="card">
                <img src="${listing.images[0]}" class="card-img-top" alt="${listing.name}">
                <div class="card-body">
                    <h5 class="card-title">${listing.name}</h5>
                    <button type="button" class="btn btn-primary" onclick="showDetails(${index})">View Details</button>
                </div>
            </div>
        `;
        listingsContainer.appendChild(listingElement);
    });
}

// Function to display the details modal
function showDetails(index) {
    const selectedListing = listingsData[index];
    document.getElementById('detailsModalLabel').textContent = selectedListing.name;

    // Update the images in the details modal
    const modalImages = document.querySelectorAll('#detailsModal .gallery-img');
    selectedListing.images.forEach((image, idx) => {
        if (modalImages[idx]) {
            modalImages[idx].src = image;
            modalImages[idx].alt = selectedListing.name;
        }
    });

    // Handle the "+9 photos" button functionality
    document.querySelector('.more-photos').onclick = function() {
        // Populate the gallery modal with additional photos
        const galleryImages = document.querySelectorAll('#galleryModal .gallery-img');
        selectedListing.images.forEach((image, idx) => {
            if (galleryImages[idx]) {
                galleryImages[idx].src = image;
                galleryImages[idx].alt = selectedListing.name;
            }
        });
        $('#galleryModal').modal('show');
    };

    // Set the "Book Now" button to open the booking modal with the B&B name
    document.getElementById('bookNowButton').onclick = function() {
        showBookingForm(index);
    };

    // Show the details modal
    $('#detailsModal').modal('show');
}

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

// Function to handle booking form submission
function submitBooking() {
    const bookingData = {
        userName: document.getElementById('modalUserName').value,
        userId: document.getElementById('modalUserId').value,
        userPhone: document.getElementById('modalUserPhone').value,
        userEmail: document.getElementById('modalUserEmail').value,
        bnbName: document.getElementById('modalBnbName').value,
        checkinDate: document.getElementById('modalCheckinDate').value,
        checkoutDate: document.getElementById('modalCheckoutDate').value,
        numPeople: document.getElementById('modalNumPeople').value,
    };

    fetch('http://localhost:3000/book', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingData)
    })
    .then(response => response.json())
    .then(data => {
        // Show the alert modal for success or error
        $('#alertModal').modal('show');
        document.getElementById('alertModalLabel').textContent = 'Booking Status';
        document.getElementById('alertModal .modal-body').textContent = data.message;

        // Close the booking modal
        $('#bookingModal').modal('hide');
    })
    .catch(error => {
        // Show the alert modal for the error
        $('#alertModal').modal('show');
        document.getElementById('alertModalLabel').textContent = 'Error';
        document.getElementById('alertModal .modal-body').textContent = 'An error occurred. Please try again later.';

        console.error('Error:', error);
    });
}

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

function validateCheckoutTime() {
    const checkoutTimeInput = document.getElementById('modalCheckoutTime');
    const checkoutTime = checkoutTimeInput.value;

    // Convert checkout time to minutes since midnight for comparison
    const [hours, minutes] = checkoutTime.split(':');
    const totalMinutes = parseInt(hours) * 60 + parseInt(minutes);

    // 10:00 AM is 600 minutes since midnight
    const cutoffTime = 600;

    if (totalMinutes > cutoffTime) {
        // Show the custom Bootstrap modal
        $('#alertModal').modal('show');

        // Clear the invalid time after the modal is closed
        $('#alertModal').on('hidden.bs.modal', function () {
            checkoutTimeInput.value = ''; 
        });
    }
}

// Add event listener for checkout time change
document.getElementById('modalCheckoutTime').addEventListener('change', validateCheckoutTime);

