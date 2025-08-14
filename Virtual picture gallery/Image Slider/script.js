const initSlider = () => {
    const imageList=document.querySelector(".slider-wrapper .image-list");
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
    const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

    //Handle scrollbar thumb drag
    scrollbarThumb.addEventListener("mousedown", (e) =>{
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;

        //Update thumb position on mouse move
        const handleMouseMove = (e)=>{
            const deltaX =e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;
            const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;

            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            const scrollPosition = (boundedPosition/maxThumbPosition) * maxScrollLeft;

            scrollbarThumb.style.left= `${newThumbPosition}px`;
            imageList.scrollLeft = scrollPosition;
        }

        //Remove event listeners on mouse up
        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }

        //Add event listeners for drag interaction
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });

    slideButtons.forEach(button => {
        button.addEventListener("click",()=>{
            const direction =  button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth"});
        });
    });

    const handleSlideButtons = () =>{
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" :"block";
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft? "none" :"block";
    }

    const updateScrollThumbPosition = () =>{
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition/ maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    }

    imageList.addEventListener("scroll",()=>{
        handleSlideButtons();
        updateScrollThumbPosition();
    });
}

window.addEventListener("load",initSlider);