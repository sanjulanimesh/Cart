document.addEventListener('DOMContentLoaded', function () {
    const filterRadios = document.querySelectorAll('.filter-options input[type="radio"]');
    const brandCheckboxes = document.querySelectorAll('.sub-categories input[type="checkbox"]');
    const productCards = document.querySelectorAll('.product-card');

    function filterProducts() {
        const selectedCategory = document.querySelector('.filter-options input[type="radio"]:checked').id;
        const selectedBrands = Array.from(document.querySelectorAll('.sub-categories input[type="checkbox"]:checked')).map(cb => cb.value);

        productCards.forEach(card => {
            const cardCategory = card.dataset.category;
            const cardBrand = card.dataset.brand;
            const cardType = card.dataset.type;

            if (selectedCategory === 'all-products' && selectedBrands.length === 0) {
                card.style.display = 'block';
                return;
            }

            let shouldShow = selectedCategory === 'all-products' || cardCategory === selectedCategory;

            if (shouldShow && selectedBrands.length > 0) {
                shouldShow = selectedBrands.includes(cardBrand);
            }

            if (shouldShow && selectedCategory === 'gimbals') {
                const selectedGimbalTypes = Array.from(document.querySelectorAll('.sub-categories input[name="gimbal-type"]:checked')).map(cb => cb.value);
                if (selectedGimbalTypes.length > 0) {
                    shouldShow = selectedGimbalTypes.includes(cardType);
                }
            }

            card.style.display = shouldShow ? 'block' : 'none';
        });
    }

    filterRadios.forEach(radio => {
        radio.addEventListener('change', filterProducts);
    });

    brandCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filterProducts);
    });
    filterProducts();


    const modalTitle = document.getElementById('modalProductTitle');
    const modalPrice = document.getElementById('modalProductPrice');
    const modalDescription = document.getElementById('modalProductDescription');
    const whatsappButton = document.getElementById('whatsappButton');
    const closeModal = document.querySelector('.close-modal');
    const modal = document.getElementById('productModal');
    const slideshowInner = document.querySelector('.slideshow-inner');
    const dotsContainer = document.querySelector('.dots-container');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    let currentSlide = 0;
    let slides = [];
    let dots = [];

    const productData = {
        "Cam_01": {
            "title": "Sony Alpha a7 III Mirrorless Digital Camera",
            "price": "Rs 4500 per Night",
            "description": "24.2MP Full-Frame Exmor R CMOS Sensor. BIONZ X Image Processor. 693-Point Hybrid AF System. UHD 4K30p Video with HLG & S-Log3 Gammas. 5-Axis SteadyShot INSIDE Stabilization. 10 fps Shooting, ISO 204800. 2.36m-Dot Tru-Finder OLED EVF. 3.0\" 922k-Dot Tilting Touchscreen LCD. Wi-Fi, NFC, Bluetooth, PC Remote. Weather-Sealed Magnesium Alloy Body.",
            "brand": "sony"
        },
        "Cam_02": {
            "title": "Canon EOS 80D DSLR Camera",
            "price": "Rs 2500 per Night",
            "description": "24.2MP APS-C CMOS Sensor. DIGIC 6 Image Processor. 3.0\" 1.04m-Dot Vari-Angle Touchscreen. Full HD 1080p Video Recording at 60 fps. 45-Point All Cross-Type AF System. Dual Pixel CMOS AF. ISO 100-16000, Up to 7 fps Shooting. Built-In Wi-Fi with NFC. Scene Intelligent Auto Mode. EF-S 18-135mm f/3.5-5.6 IS USM Lens.",
            "brand": "canon"
        },
        "Cam_03": {
            "title": "Canon EOS 80D DSLR Camera",
            "price": "Rs 2500 per Night",
            "description": "24.2MP APS-C CMOS Sensor. DIGIC 6 Image Processor. 3.0\" 1.04m-Dot Vari-Angle Touchscreen. Full HD 1080p Video Recording at 60 fps. 45-Point All Cross-Type AF System. Dual Pixel CMOS AF. ISO 100-16000, Up to 7 fps Shooting. Built-In Wi-Fi with NFC. Scene Intelligent Auto Mode. EF-S 18-135mm f/3.5-5.6 IS USM Lens.",
            "brand": "canon"
        },
        "Len_01": {
            "title": "Canon EF 50mm f/1.8 STM Lens",
            "price": "Rs 2000 per Night",
            "description": "EF-Mount Lens/Full-Frame Format. Aperture Range: f/1.8 to f/22. Super Spectra Coating. STM Stepping AF Motor. Rounded 7-Blade Diaphragm. Minimum Focus Distance: 1.15'. 40° Angle of View. 49mm Filter Thread. Weighs 5.6 oz.",
            "brand": "canon"
        },
        "Len_02": {
            "title": "Canon EF-S 55-250mm f/4-5.6 IS STM Lens",
            "price": "Rs 1500 per Night",
            "description": "EF-S-Mount Lens/APS-C Format. 88-400mm (35mm Equivalent). Aperture Range: f/4 to f/32. Ultra-Low Dispersion Element. Super Spectra Coating. STM Stepping AF Motor. Optical Image Stabilizer. Rounded 7-Blade Diaphragm. Minimum Focus Distance: 2.8'. 58mm Filter Thread.",
            "brand": "canon"
        },
        "Len_03": {
            "title": "Sigma 150-600mm f/5-6.3 DG OS HSM Sports Lens for Nikon F",
            "price": "Rs 1500 per Night",
            "description": "EF-S-Mount Lens/APS-C Format. 88-400mm (35mm Equivalent). Aperture Range: f/4 to f/32. Ultra-Low Dispersion Element. Super Spectra Coating. STM Stepping AF Motor. Optical Image Stabilizer. Rounded 7-Blade Diaphragm. Minimum Focus Distance: 2.8'. 58mm Filter Thread.",
            "brand": "canon"
        },
         "Len_04": {
            "title": "Sirui Aurora 85mm f/1.4 Lens (Sony E) with Free Sirui 67mm UV Filter & Black Mist Filter",
            "price": "Rs 1500 per Night",
            "description": "EF-S-Mount Lens/APS-C Format. 88-400mm (35mm Equivalent). Aperture Range: f/4 to f/32. Ultra-Low Dispersion Element. Super Spectra Coating. STM Stepping AF Motor. Optical Image Stabilizer. Rounded 7-Blade Diaphragm. Minimum Focus Distance: 2.8'. 58mm Filter Thread.",
            "brand": "canon"
        },
         "Len_05": {
            "title": "Sony E 55-210mm f/4.5-6.3 OSS Lens (Black)",
            "price": "Rs 1500 per Night",
            "description": "EF-S-Mount Lens/APS-C Format. 88-400mm (35mm Equivalent). Aperture Range: f/4 to f/32. Ultra-Low Dispersion Element. Super Spectra Coating. STM Stepping AF Motor. Optical Image Stabilizer. Rounded 7-Blade Diaphragm. Minimum Focus Distance: 2.8'. 58mm Filter Thread.",
            "brand": "canon"
        },
         "Len_06": {
            "title": "Canon RF-S 55-210mm f/5-7.1 IS STM Lens (Canon RF)",
            "price": "Rs 1500 per Night",
            "description": "EF-S-Mount Lens/APS-C Format. 88-400mm (35mm Equivalent). Aperture Range: f/4 to f/32. Ultra-Low Dispersion Element. Super Spectra Coating. STM Stepping AF Motor. Optical Image Stabilizer. Rounded 7-Blade Diaphragm. Minimum Focus Distance: 2.8'. 58mm Filter Thread.",
            "brand": "canon"
        },
        "Fla_01": {
            "title": "Canon Speedlite 600EX II-RT",
            "price": "Rs 1500 per Night",
            "description": "Guide Number: 197' at ISO 100, 200mm. Compatible with Canon's E-TTL II System. Zoom Coverage: 20-200mm. Recycle Time: 0.1-5.5 Seconds. Flash Duration: 1/800-1/20000 Second. Wireless Master/Slave Operation. Weather-Sealed Construction. LCD Panel with Backlight. Powered by 4x AA Batteries.",
            "brand": "canon"
        },
        "Fla_02": {
            "title": "Godox V1 Flash for Canon",
            "price": "Rs 1500 per Night",
            "description": "Guide Number: 197' at ISO 100, 200mm. Compatible with Canon's E-TTL II System. Zoom Coverage: 20-200mm. Recycle Time: 0.1-5.5 Seconds. Flash Duration: 1/800-1/20000 Second. Wireless Master/Slave Operation. Weather-Sealed Construction. LCD Panel with Backlight. Powered by 4x AA Batteries.",
            "brand": "canon"
        },
        "Gim_01": {
            "title": "DJI RSC 2 Gimbal Stabilizer",
            "price": "Rs 5000 per Night",
            "description": "The Osmo Pocket 3 Creator Combo from DJI is a comprehensive mobile and studio production kit that includes everything you need to capture stable and smooth motion video and sound. The versatile system includes the DJI Osmo Pocket 3 with accessories, including a wide-angle lens, a battery handle with an integrated rechargeable 950mAh",
            "type": "video"
        },
        "Gim_02": {
            "title": "DJI OM 5 Smartphone Gimbal (Athens Gray)",
            "price": "Rs 1500 per Night",
            "description": "Add a miniature, handheld gimbal camera to create family videos, add footage to your photo shoots, or vlog your latest streaming creations with the DJI Pocket 2 Creator Combo. The Pocket 2 is a lightweight, ultra-compact gimbal stabilizer and 4K camera combination, just as small as its predecessor but adds a 1/17 64MP CMOS sensor, up to 8x zoom, 93°",
            "type": "mobile"
        },
        "Dro_01": {
            "title": "DJI Mavic Air 2 Fly More Combo",
            "price": "Rs 15000 per Night",
            "description": "1/2\" CMOS Sensor, 48MP Photos. 4K/60fps Video, HDR Support. 34-Min Max Flight Time. 10km Max Transmission Range. OcuSync 2.0 Transmission. 3-Axis Gimbal, 4K/60fps HDR Video. Advanced Pilot Assistance Systems. Includes 3 Batteries, Charging Hub, and More."
        },
        "Dro_02": {
            "title": "DJI Air 3S Drone with RC 2 Fly More Combo",
            "price": "Rs 15000 per Night",
            "description": "1/2\" CMOS Sensor, 48MP Photos. 4K/60fps Video, HDR Support. 34-Min Max Flight Time. 10km Max Transmission Range. OcuSync 2.0 Transmission. 3-Axis Gimbal, 4K/60fps HDR Video. Advanced Pilot Assistance Systems. Includes 3 Batteries, Charging Hub, and More."
        },
    };

    function initSlideshow(images) {
        slideshowInner.innerHTML = '';
        dotsContainer.innerHTML = '';
        slides = [];
        dots = [];
        currentSlide = 0;

        images.forEach((image, index) => {
            const slide = document.createElement('div');
            slide.className = 'slide fade';
            const img = document.createElement('img');
            img.src = image;
            img.alt = 'Product Image';
            slide.appendChild(img);
            slideshowInner.appendChild(slide);
            slides.push(slide);

            const dot = document.createElement('span');
            dot.className = 'dot';
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
            dotsContainer.appendChild(dot);
            dots.push(dot);
        });

        if (slides.length > 0) {
            slides[0].style.display = 'block';
            dots[0].classList.add('active');
        }

        setInterval(() => {
            nextSlide();
        }, 10000);
    }

    function showSlide(n) {
        if (slides.length === 0) return;

        if (n >= slides.length) {
            currentSlide = 0;
        } else if (n < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = n;
        }

        slides.forEach(slide => {
            slide.style.display = 'none';
        });
        dots.forEach(dot => {
            dot.classList.remove('active');
        });

        slides[currentSlide].style.display = 'block';
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function goToSlide(n) {
        showSlide(n);
    }

    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);

    document.querySelectorAll('.call-button').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const productCard = this.closest('.product-card');
            const productId = productCard.dataset.productId;
            const category = productCard.dataset.category;
            const productTitle = productCard.querySelector('.product-title').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;
            const imagePaths = [];
            for (let i = 1; i <= 5; i++) {
                const imgNum = i === 1 ? '' : `_0${i - 1}`;
                imagePaths.push(`camera/${category}/${productId}/${productId}${imgNum}.jpg`);
            }

            initSlideshow(imagePaths);

            const product = productData[productId];

            modalTitle.textContent = productTitle;
            modalPrice.textContent = productPrice;

            if (product) {
                modalDescription.textContent = product.description;

                const whatsappMessage = `Hello Pixels Camera Rent,\n\nI'm interested in renting:\n\n*Product:* ${productTitle}\n*Price:* ${productPrice}\nPlease let me know about availability.`;
                const encodedMessage = encodeURIComponent(whatsappMessage);
                whatsappButton.href = `https://api.whatsapp.com/send?phone=94767782699&text=${encodedMessage}`;
            }

            modal.style.display = 'block';
        });
    });

    closeModal.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });

    document.addEventListener('DOMContentLoaded', () => {
        const pageNumbers = document.querySelectorAll('.page-number');
        const prevBtn = document.getElementById('prevPage');
        const nextBtn = document.getElementById('nextPage');
        let currentPage = 1;

        function updateActivePage(page) {
            pageNumbers.forEach(btn => btn.classList.remove('active'));
            pageNumbers[page - 1].classList.add('active');
            currentPage = page;

            prevBtn.disabled = currentPage === 1;
            nextBtn.disabled = currentPage === pageNumbers.length;
        }

        pageNumbers.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                updateActivePage(index + 1);
            });
        });

        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) updateActivePage(currentPage - 1);
        });

        nextBtn.addEventListener('click', () => {
            if (currentPage < pageNumbers.length) updateActivePage(currentPage + 1);
        });
    });

        // Responsive nav toggle
        document.getElementById('mobileMenuToggle').onclick = function() {
            const navContent = document.getElementById('navContent');
            navContent.classList.toggle('active');
            if (navContent.classList.contains('active')) {
            setTimeout(() => {
                navContent.classList.remove('active');
                window.scrollTo({ behavior: 'smooth' });
            }, 2000);
            }
        };
});