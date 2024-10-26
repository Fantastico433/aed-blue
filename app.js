document.addEventListener('DOMContentLoaded', () => {
    // Array of image paths
    const imagePaths = [
        "galerii/IMG_20200123_150205.jpg",
        "galerii/IMG_20220420_173352.jpg",
        "galerii/IMG_20220504_160356.jpg",
        "galerii/IMG_20220523_142843.jpg",
        "galerii/IMG_20220721_171224.jpg",
        "galerii/74967746_111014193683796_1173667699885080576_n.jpg",
        "galerii/75398131_111013953683820_4700289222353879040_n.jpg",
        "galerii/75439303_111014163683799_7213036259508224000_n.jpg",
        "galerii/331538563_1660583681025488_3846164463612154615_n.jpg",
        "galerii/363355009_760098972783375_4649593209159172349_n.jpg",
        "galerii/FB_IMG_1682881006133.jpg",
        "galerii/IMG_20180908_161454.jpg",
        "galerii/IMG_20180914_162343.jpg",
        "galerii/IMG_20190508_121215.jpg",
        "galerii/IMG_20190527_134324.jpg",
        "galerii/IMG_20190628_174748.jpg",
        "galerii/IMG_20190806_122349.jpg",
        "galerii/IMG_20190813_133524.jpg",
        "galerii/IMG_20190813_134401.jpg",
        "galerii/IMG_20190912_194014.jpg"
    ];

    // Select Swiper wrapper and dynamically add images
    const swiperWrapper = document.querySelector(".swiper-wrapper");
    imagePaths.forEach(path => {
        const slide = document.createElement("div");
        slide.classList.add("swiper-slide");

        const img = document.createElement("img");
        img.src = path;
        img.alt = "Gallery Image"; // Customize alt text as needed

        slide.appendChild(img);
        swiperWrapper.appendChild(slide);
    });

    // Initialize Swiper after slides have been added
    const swiper = new Swiper('.swiper-container', {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
            delay: 3000, // Auto-slide every 3 seconds
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            640: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
            }
        }
    });
});


    // Scroll to contact section on button click
    const contactButton = document.getElementById('scrollToContact');
    contactButton.addEventListener('click', () => {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });

    // Handle service item click to enlarge image
    document.querySelectorAll('.service-item').forEach(item => {
        item.addEventListener('click', () => {
            const modal = createModal(item.dataset.img, item.dataset.description, item.dataset.alt);
            document.body.appendChild(modal);
        });
    });

    // Function to create a modal for services
    const createModal = (imgSrc, description, altText) => {
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = `
            <div class="modal-content">
                <img src="${imgSrc}" alt="${altText}" />
                <p>${description}</p>
                <button class="close-modal">Sulge</button>
            </div>
        `;

        // Close the modal on clicking the close button or outside the modal content
        modal.addEventListener('click', (event) => {
            if (event.target === modal || event.target.classList.contains('close-modal')) {
                document.body.removeChild(modal);
            }
        });

        return modal;
    };

    // Formspree submission handling
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
            });
            if (response.ok) {
                document.querySelector('.form-success').style.display = 'block';
                contactForm.reset();
            } else {
                document.querySelector('.form-error').style.display = 'block';
            }
        } catch (error) {
            document.querySelector('.form-error').style.display = 'block';
        }
    });

