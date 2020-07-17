const inputCheckboxesClick = (e) => {
    let target = e.target.tagName === 'SPAN' 
                    ? e.target.parentNode
                    : e.target;
    target.classList.toggle('active');
};

export default inputCheckboxesClick;