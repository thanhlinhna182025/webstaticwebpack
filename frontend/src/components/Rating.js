const Rating = {
    render: (props) => {
        if (!props.value) {
            return `<div></div>`;
        }
        return `<div class="rating" id="rating">
            <span >
                <i  class="${
                    props.value >= 1
                        ? 'fa-solid fa-star active-star'
                        : props.value >= 0.5
                        ? 'fa-regular fa-star-half-stroke active-star'
                        : 'fa-regular fa-star'
                }"></i>
            </span>
            <span  >
                <i class="${
                    props.value >= 2
                        ? 'fa-solid fa-star active-star'
                        : props.value >= 1.5
                        ? 'fa-regular fa-star-half-stroke active-star'
                        : 'fa-regular fa-star'
                }"></i>
            </span>
            <span >
                <i  class="${
                    props.value >= 3
                        ? 'fa-solid fa-star active-star'
                        : props.value >= 2.5
                        ? 'fa-regular fa-star-half-stroke active-star'
                        : 'fa-regular fa-star'
                }"></i>
            </span>
            <span >
                <i  class="${
                    props.value >= 4
                        ? 'fa-solid fa-star active-star'
                        : props.value >= 3.5
                        ? 'fa-regular fa-star-half-stroke active-star'
                        : 'fa-regular fa-star'
                }"></i>
            </span>
            <span >
                <i class="${
                    props.value >= 5
                        ? 'fa-solid fa-star active-star'
                        : props.value >= 4.5
                        ? 'fa-regular fa-star-half-stroke active-star'
                        : 'fa-regular fa-star'
                }"></i>
            </span>
            <span>${props.text || ''}</span>
        </div>`;
    },
};

export default Rating;
