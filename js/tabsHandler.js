import { hideNavMenu } from "./navMenu";

const tabs = (navigationItems, main) => {
    const navigationContainer = navigationItems[0].parentNode.parentNode;

    const pointActiveClass = 'sidebar__point-active';
    const tabActiveClass = 'display-active';
    const points = document.querySelectorAll('.sidebar__point');
    const tabs = document.querySelectorAll('main > section');
    let currentTab = 0;

    const toggleTab = (idx) => {
        navigationItems[idx].classList.add('active');
        points[idx].classList.toggle(pointActiveClass);
        tabs[idx].classList.toggle(tabActiveClass);    
    };

    const switchTab = (idx) => {
        navigationItems[idx].classList.remove('active');

        points[idx].classList.toggle(pointActiveClass);
        tabs[idx].classList.add('section-fade-out');
        
        const timeout = setTimeout(() => {
            tabs[idx].classList.remove('section-fade-out');
            tabs[idx].classList.toggle(tabActiveClass);  
            showCurrentTab();  
            clearTimeout(timeout);
        }, 280);    
        
    };

    const showCurrentTab = () => toggleTab(currentTab);

    showCurrentTab();

    // add jumps to tabs
    points.forEach((el, i) => {
        el.addEventListener('click', () => {
            switchTab(currentTab);
            currentTab = i;
        });
    });

    // navigation menu
    navigationItems.forEach((el, i) => {
        el.addEventListener('click', () => {
            hideNavMenu(navigationContainer,  main);
            switchTab(currentTab);
            currentTab = i;
        });
    });

    const prevTab = (currentTab) => --currentTab < 0 ? tabs.length-1 : currentTab;
    const nextTab = (currentTab) => ++currentTab >= tabs.length ? 0 : currentTab;

    const wheel = (e) => {
        const { wheelDelta = 0 } = e;
        if (wheelDelta > 0) {
            currentTab = prevTab(currentTab);
         } else if(wheelDelta < 0) { // down 
            currentTab = nextTab(currentTab);
        }
    };

    let lastY = -1; 
    document.addEventListener('touchstart', (e) => {
        lastY = e.touches[0].clientY
    });


    const touchmove = (e) => {
        let currentY = e.touches ? e.touches[0].clientY : null;
        if(currentY > lastY) { // up
            currentTab = prevTab(currentTab);
        } else if(currentY < lastY) {
            currentTab = nextTab(currentTab);
        }

        lastY = currentY;
    };

    return (e) => {
        if(navigationContainer.classList.contains('active')) {
            return;
        }
        switchTab(currentTab);
        if(e.type === 'wheel') {
            return wheel(e);
        } else if(e.type === 'touchmove') {
            return touchmove(e);
        }
    };
};

export default tabs;