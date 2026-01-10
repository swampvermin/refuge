


// zine page

document.addEventListener("DOMContentLoaded", function () {
    const pageNumberElement = document.querySelector(".pageNumber");
    const zinePageImage = document.querySelector(".zinePage img");
    const nextButton = document.getElementById("nextPage");
    const prevButton = document.getElementById("prevPage");
    const imageThumbnails = document.querySelectorAll('.imagesZine div'); // Thumbnail images
    const progressBar = document.querySelector(".progress-bar");  // Progress bar element

    // Detect which zine is being viewed
    const currentZine = document.body.getAttribute("data-zine");

    // Map the zine names to their respective folder paths
    const zineFolders = {
        "zine1": "washingtonSquarePark",
        "zine2": "collectPond",
        "zine3": "brooklynHeightsPromenade"
    };

    // Set total *pages* for each zine (for page display text)
    const totalPages = {
        "zine1": 16,
        "zine2": 12,
        "zine3": 12
    };

    // ✅ new: set total *thumbnails* (spreads) for each zine
    const totalThumbnails = {
        "zine1": 9,
        "zine2": 7,
        "zine3": 7
    };

    let currentThumbnail = 1; // Default to first thumbnail

    // Helper function to update page and image
    function updatePage() {
        let pageDisplay;
        let imgFileName;

        // Map the thumbnail clicks to the correct page range
        // Replace your switch(currentThumbnail) with this:

        switch(currentThumbnail) {
            case 1:
                pageDisplay = "1";
                imgFileName = "1";
                break;
            case 2:
                pageDisplay = currentZine === "zine1" ? "2-3" : "2-3"; // still ok
                imgFileName = "2";
                break;
            case 3:
                pageDisplay = currentZine === "zine1" ? "4-5" : "4-5";
                imgFileName = "3";
                break;
            case 4:
                pageDisplay = currentZine === "zine1" ? "6-7" : "6-7";
                imgFileName = "4";
                break;
            case 5:
                pageDisplay = currentZine === "zine1" ? "8-9" : "8-9";
                imgFileName = "5";
                break;
            case 6:
                pageDisplay = currentZine === "zine1" ? "10-11" : "10-11";
                imgFileName = "6";
                break;
            case 7:
                // ✅ This is the key change for zine2/zine3 last page
                pageDisplay = currentZine === "zine1" ? "12-13" : "12"; 
                imgFileName = "7";
                break;
            case 8:
                pageDisplay = "14-15";
                imgFileName = "8";
                break;
            case 9:
                pageDisplay = "16";
                imgFileName = "9";
                break;
        }


        // Update page number display
        pageNumberElement.textContent = `Page ${pageDisplay} of ${totalPages[currentZine]}`;

        // Get the correct folder based on the zine
        const zineFolder = zineFolders[currentZine];

        // Update the image source dynamically
        zinePageImage.src = `../assets/zine/${zineFolder}/pg${imgFileName}.png`;

        // Update transcript visibility
        document.querySelectorAll(".transcript p[data-page-transcript]").forEach(transcript => {
            transcript.style.display = "none";
        });

        const activeTranscript = document.querySelector(`.transcript p[data-page-transcript="${currentThumbnail}"]`);
        if (activeTranscript) {
            activeTranscript.style.display = "block";
        }

        // ✅ Update the progress bar dynamically per zine
        const total = totalThumbnails[currentZine];
        const progress = (currentThumbnail - 1) / (total - 1) * 100;
        progressBar.style.width = `${progress}%`;
    }

    // Next and previous buttons
    nextButton.addEventListener("click", function () {
        const total = totalThumbnails[currentZine];
        if (currentThumbnail < total) {
            currentThumbnail++;
        } else {
            currentThumbnail = 1; // Wrap around to start
        }
        updatePage();
    });

    prevButton.addEventListener("click", function () {
        const total = totalThumbnails[currentZine];
        if (currentThumbnail > 1) {
            currentThumbnail--;
        } else {
            currentThumbnail = total; // Wrap around to end
        }
        updatePage();
    });

    // Thumbnail click behavior
    imageThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function () {
            const pageNum = parseInt(this.getAttribute('data-page'), 10); // Get the page number from the thumbnail

            // Update the currentThumbnail based on clicked page number
            currentThumbnail = pageNum;

            updatePage();
        });
    });

    updatePage(); // Initial page load
});


const img = document.querySelector('.zinePage img');


img.addEventListener('mouseenter', function() {
    img.style.cursor = 'zoom-in'; // Change cursor to magnifying glass on hover
});

img.addEventListener('click', function() {
    // Open the image in a new tab with the full size
    const fullSizeImageUrl = img.src; // Get the full size image URL
    window.open(fullSizeImageUrl, '_blank'); // Open it in a new tab
});



