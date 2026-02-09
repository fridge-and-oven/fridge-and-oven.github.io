function changeMainImage(largeImageSrc, clickedThumbnail) {
                // Get the main image element by its ID
                const mainImage = document.getElementById("main-image");

                // Update the main image's src attribute to the large image source
                mainImage.src = largeImageSrc;

            }
            

           let slideIndex = 0;
            let slideTimer;

            // Start the process
            showSlides();

            function showSlides() {
                clearTimeout(slideTimer); 

                let slides = document.getElementsByClassName("thumbnail");
                if (slides.length === 0) return;

                // 1. Show the CURRENT image first
                let currentSlide = slides[slideIndex];
                changeMainImage(currentSlide.src, currentSlide);

                // 2. Prepare the index for the NEXT time the function runs
                slideIndex = (slideIndex + 1) % slides.length;

                // 3. Wait 5 seconds before showing that next index
                slideTimer = setTimeout(showSlides, 5000);
            }
