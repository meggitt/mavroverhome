let currentIndex = 1; // Start with the 3rd item active
const items = document.querySelectorAll('.carousel-item'); // All carousel items
const dots = document.querySelectorAll('.dot'); // All dots
const carousel = document.querySelector('.carousel'); // The carousel container

// Function to update the carousel's active item
function updateCarousel(index) {
    // Remove 'active' class from all items and 'active-dot' from dots
    items.forEach(item => item.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active-dot'));

    // Add 'active' class to the current item and dot
    items[index].classList.add('active');
    dots[index].classList.add('active-dot');

    // Scroll to the active item
    items[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
}

// Function to auto-slide through the items
function autoSlide() {
    currentIndex = (currentIndex + 1) % items.length; // Loop through items
    updateCarousel(currentIndex);
}

// Start the carousel auto-sliding every 3 seconds
// setInterval(autoSlide, 3000);

// Add event listeners to dots for manual navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index; // Set the current index to the clicked dot's index
        updateCarousel(currentIndex); // Update the carousel
    });
});

// Function to find the middle item when scrolling
function findActiveItemOnScroll() {
    const carouselRect = carousel.getBoundingClientRect();
    const middleX = carouselRect.left + carouselRect.width / 2;

    let closestIndex = -1;
    let closestDistance = Infinity;

    items.forEach((item, index) => {
        const itemRect = item.getBoundingClientRect();
        const itemMiddleX = itemRect.left + itemRect.width / 2;
        const distance = Math.abs(middleX - itemMiddleX);

        // Find the closest item to the center
        if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
        }
    });

    // Set the currentIndex to the item in the center
    currentIndex = closestIndex;

    // Update the carousel
    updateCarousel(currentIndex);
}

// Listen for scroll events to update the active item
carousel.addEventListener('scroll', findActiveItemOnScroll);

// Ensure the carousel correctly initializes the active item
updateCarousel(currentIndex);
