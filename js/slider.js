const initSlider = (slider, items, prevBtn, nextBtn) => {
    const prevClass = 'prev',
          nextClass = 'next',
          activeClass = 'active';
    
    const maxIdx = items.length - 1;
    let activeIdx = 1;
    let neighborSlides = {
        prevIdx: 0,
        nextIdx: 2
    };

    const minusSlide = (activeIdx) => activeIdx == 0 ? maxIdx : activeIdx-1;

    const plusSlide = (activeIdx) => activeIdx == maxIdx ? 0 : activeIdx+1;

    const displaySlides = (activeIdx, { prevIdx, nextIdx }) => {
        items[prevIdx].classList.add(prevClass);
        items[activeIdx].classList.add(activeClass);
        items[nextIdx].classList.add(nextClass);
    };

    const hideSlides = (activeIdx, { prevIdx, nextIdx }) => {
        items[prevIdx].classList.remove(prevClass);
        items[activeIdx].classList.remove(activeClass);
        items[nextIdx].classList.remove(nextClass);
    };


    const getNeiborSlides = (activeIdx) => ({
        prevIdx: minusSlide(activeIdx),
        nextIdx: plusSlide(activeIdx)
    });

    const displaySlider = (activeIdx) => {
        neighborSlides = getNeiborSlides(activeIdx);
        displaySlides(activeIdx, neighborSlides); 
    };

    const buttonClickHandler = (action) => (e) => {
        // hide content
        slider.classList.add('fade-out');
        slider.classList.remove('fade-in');
        // show content after fade animation is over
        const timeout = setTimeout(() => {
            // remove classes from previous elements
            hideSlides(activeIdx, neighborSlides);
            // set new selected item index
            activeIdx = action(activeIdx);
            // assign classesNames to new active items
            displaySlider(activeIdx);  
            // show content, fadein animation
            slider.classList.remove('fade-out');
            slider.classList.add('fade-in');
            // delete timeout
            clearTimeout(timeout);
        }, 400);
    };


    prevBtn.addEventListener('click', buttonClickHandler(minusSlide));
    nextBtn.addEventListener('click', buttonClickHandler(plusSlide));

};

export default initSlider;
