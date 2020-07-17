let isActive = false;
const initHamburgerBtn = (hamburger, main, navigation) => {
    main.addEventListener('click', (e) => {
        if((e.target === hamburger) || (e.target.parentNode === hamburger)) {
            showNavMenu(navigation, main);
            return;    
        }

        if(isActive) {
            hideNavMenu(navigation, main);
        }
    });
};

const showNavMenu = (navigation, main) => {
    isActive = true;
    main.classList.add('transformed');
    navigation.classList.add('active');
};

const hideNavMenu = (navigation, main) => {
    isActive = false;
    navigation.classList.remove('active');
    main.classList.add('not-transformed');
    const timer = setTimeout(() => {
        main.classList.remove('not-transformed');
        main.classList.remove('transformed');
        clearTimeout(timer);
    }, 420);   
};

export {
    showNavMenu,
    hideNavMenu
};

export default initHamburgerBtn;