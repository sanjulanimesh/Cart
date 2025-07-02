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
            "price": "Rs 4500 per day",
            "description": "24.2MP Full-Frame Exmor R CMOS Sensor. BIONZ X Image Processor. 693-Point Hybrid AF System. UHD 4K30p Video with HLG & S-Log3 Gammas. 5-Axis SteadyShot INSIDE Stabilization. 10 fps Shooting, ISO 204800. 2.36m-Dot Tru-Finder OLED EVF. 3.0\" 922k-Dot Tilting Touchscreen LCD. Wi-Fi, NFC, Bluetooth, PC Remote. Weather-Sealed Magnesium Alloy Body.",
            "brand": "sony"
        },
        "Cam_02": {
            "title": "Canon EOS 80D DSLR Camera",
            "price": "Rs 3000 per day",
            "description": "24.2MP APS-C CMOS Sensor. DIGIC 6 Image Processor. 3.0\" 1.04m-Dot Vari-Angle Touchscreen. Full HD 1080p Video Recording at 60 fps. 45-Point All Cross-Type AF System. Dual Pixel CMOS AF. ISO 100-16000, Up to 7 fps Shooting. Built-In Wi-Fi with NFC. Scene Intelligent Auto Mode. EF-S 18-135mm f/3.5-5.6 IS USM Lens.",
            "brand": "canon"
        },
        "Cam_03": {
            "title": "Canon EOS R6 Mark II Mirrorless Camera",
            "price": "Rs 6000 per day",
            "description": "24.2MP APS-C CMOS Sensor. DIGIC 6 Image Processor. 3.0\" 1.04m-Dot Vari-Angle Touchscreen. Full HD 1080p Video Recording at 60 fps. 45-Point All Cross-Type AF System. Dual Pixel CMOS AF. ISO 100-16000, Up to 7 fps Shooting. Built-In Wi-Fi with NFC. Scene Intelligent Auto Mode. EF-S 18-135mm f/3.5-5.6 IS USM Lens.",
            "brand": "canon"
        },
        "Cam_04": {
            "title": "Canon EOS 6D Mark II Mirrorless Camera",
            "price": "Rs 4000 per day",
            "description": "24.2MP APS-C CMOS Sensor. DIGIC 6 Image Processor. 3.0\" 1.04m-Dot Vari-Angle Touchscreen. Full HD 1080p Video Recording at 60 fps. 45-Point All Cross-Type AF System. Dual Pixel CMOS AF. ISO 100-16000, Up to 7 fps Shooting. Built-In Wi-Fi with NFC. Scene Intelligent Auto Mode. EF-S 18-135mm f/3.5-5.6 IS USM Lens.",
            "brand": "canon"
        },
        "Cam_09": {
            "title": "Sony Alpha a7 IV Mirrorless Digital Camera",
            "price": "Rs 6000 per day",
            "description": "24.2MP APS-C CMOS Sensor. DIGIC 6 Image Processor. 3.0\" 1.04m-Dot Vari-Angle Touchscreen. Full HD 1080p Video Recording at 60 fps. 45-Point All Cross-Type AF System. Dual Pixel CMOS AF. ISO 100-16000, Up to 7 fps Shooting. Built-In Wi-Fi with NFC. Scene Intelligent Auto Mode. EF-S 18-135mm f/3.5-5.6 IS USM Lens.",
            "brand": "sony"
        },
        "Cam_05": {
            "title": "Canon EOS 6D DSLR Camera",
            "price": "Rs 3000 per day",
            "description": "24.2MP APS-C CMOS Sensor. DIGIC 6 Image Processor. 3.0\" 1.04m-Dot Vari-Angle Touchscreen. Full HD 1080p Video Recording at 60 fps. 45-Point All Cross-Type AF System. Dual Pixel CMOS AF. ISO 100-16000, Up to 7 fps Shooting. Built-In Wi-Fi with NFC. Scene Intelligent Auto Mode. EF-S 18-135mm f/3.5-5.6 IS USM Lens.",
            "brand": "canon"
        },
        "Cam_06": {
            "title": "Nikon EOS D750 DSLR Camera",
            "price": "Rs 3000 per day",
            "description": "24.2MP APS-C CMOS Sensor. DIGIC 6 Image Processor. 3.0\" 1.04m-Dot Vari-Angle Touchscreen. Full HD 1080p Video Recording at 60 fps. 45-Point All Cross-Type AF System. Dual Pixel CMOS AF. ISO 100-16000, Up to 7 fps Shooting. Built-In Wi-Fi with NFC. Scene Intelligent Auto Mode. EF-S 18-135mm f/3.5-5.6 IS USM Lens.",
            "brand": "nikon"
        },
        "Cam_07": {
            "title": "Nikon Z7 II Camera",
            "price": "Rs 6500 per day",
            "description": "24.2MP APS-C CMOS Sensor. DIGIC 6 Image Processor. 3.0\" 1.04m-Dot Vari-Angle Touchscreen. Full HD 1080p Video Recording at 60 fps. 45-Point All Cross-Type AF System. Dual Pixel CMOS AF. ISO 100-16000, Up to 7 fps Shooting. Built-In Wi-Fi with NFC. Scene Intelligent Auto Mode. EF-S 18-135mm f/3.5-5.6 IS USM Lens.",
            "brand": "nikon"
        },
        "Cam_08": {
            "title": "Nikon Z6 II Camera",
            "price": "Rs 5000 per day",
            "description": "24.2MP APS-C CMOS Sensor. DIGIC 6 Image Processor. 3.0\" 1.04m-Dot Vari-Angle Touchscreen. Full HD 1080p Video Recording at 60 fps. 45-Point All Cross-Type AF System. Dual Pixel CMOS AF. ISO 100-16000, Up to 7 fps Shooting. Built-In Wi-Fi with NFC. Scene Intelligent Auto Mode. EF-S 18-135mm f/3.5-5.6 IS USM Lens.",
            "brand": "nikon"
        },
        "Cam_10": {
            "title": "Nikon D5300 Camera",
            "price": "Rs 2500 per day",
            "description": "24.2MP APS-C CMOS Sensor. DIGIC 6 Image Processor. 3.0\" 1.04m-Dot Vari-Angle Touchscreen. Full HD 1080p Video Recording at 60 fps. 45-Point All Cross-Type AF System. Dual Pixel CMOS AF. ISO 100-16000, Up to 7 fps Shooting. Built-In Wi-Fi with NFC. Scene Intelligent Auto Mode. EF-S 18-135mm f/3.5-5.6 IS USM Lens.",
            "brand": "nikon"
        },
        "Len_01": {
            "title": "Sigma 16-28mm f/2.8 DG DN Lens Sony E",
            "price": "Rs 2000 per day",
            "description": "EF-Mount Lens/Full-Frame Format. Aperture Range: f/1.8 to f/22. Super Spectra Coating. STM Stepping AF Motor. Rounded 7-Blade Diaphragm. Minimum Focus Distance: 1.15'. 40° Angle of View. 49mm Filter Thread. Weighs 5.6 oz.",
            "brand": "sony"
        },
        "Len_02": {
            "title": "Sony FE 16-35mm f/2.8 GM II Lens Sony E",
            "price": "Rs 1500 per day",
            "description": "EF-S-Mount Lens/APS-C Format. 88-400mm (35mm Equivalent). Aperture Range: f/4 to f/32. Ultra-Low Dispersion Element. Super Spectra Coating. STM Stepping AF Motor. Optical Image Stabilizer. Rounded 7-Blade Diaphragm. Minimum Focus Distance: 2.8'. 58mm Filter Thread.",
            "brand": "sony"
        },
        "Len_03": {
            "title": "Sigma 35mm f/1.4 DG DN Art Lens for Sony E",
            "price": "Rs 2500 per day",
            "description": "EF-S-Mount Lens/APS-C Format. 88-400mm (35mm Equivalent). Aperture Range: f/4 to f/32. Ultra-Low Dispersion Element. Super Spectra Coating. STM Stepping AF Motor. Optical Image Stabilizer. Rounded 7-Blade Diaphragm. Minimum Focus Distance: 2.8'. 58mm Filter Thread.",
            "brand": "sony"
        },
         "Len_04": {
            "title": "Sigma 50mm f/1.4 DG DN Art Lens for Sony E",
            "price": "Rs 2500 per day",
            "description": "EF-S-Mount Lens/APS-C Format. 88-400mm (35mm Equivalent). Aperture Range: f/4 to f/32. Ultra-Low Dispersion Element. Super Spectra Coating. STM Stepping AF Motor. Optical Image Stabilizer. Rounded 7-Blade Diaphragm. Minimum Focus Distance: 2.8'. 58mm Filter Thread.",
            "brand": "sony"
        },
         "Len_05": {
            "title": "Sigma 85mm f/1.4 DG DN Art Lens for Sony E",
            "price": "Rs 2500 per day",
            "description": "EF-S-Mount Lens/APS-C Format. 88-400mm (35mm Equivalent). Aperture Range: f/4 to f/32. Ultra-Low Dispersion Element. Super Spectra Coating. STM Stepping AF Motor. Optical Image Stabilizer. Rounded 7-Blade Diaphragm. Minimum Focus Distance: 2.8'. 58mm Filter Thread.",
            "brand": "sony"
        },
         "Len_06": {
            "title": "Sony FE 50mm f/1.8 Lens",
            "price": "Rs 1500 per day",
            "description": "EF-S-Mount Lens/APS-C Format. 88-400mm (35mm Equivalent). Aperture Range: f/4 to f/32. Ultra-Low Dispersion Element. Super Spectra Coating. STM Stepping AF Motor. Optical Image Stabilizer. Rounded 7-Blade Diaphragm. Minimum Focus Distance: 2.8'. 58mm Filter Thread.",
            "brand": "sony"
        },
         "Len_07": {
            "title": "Sony FE 28-70mm f/3.5-5.6 OSS Lens",
            "price": "Rs 1500 per day",
            "description": "EF-S-Mount Lens/APS-C Format. 88-400mm (35mm Equivalent). Aperture Range: f/4 to f/32. Ultra-Low Dispersion Element. Super Spectra Coating. STM Stepping AF Motor. Optical Image Stabilizer. Rounded 7-Blade Diaphragm. Minimum Focus Distance: 2.8'. 58mm Filter Thread.",
            "brand": "sony"
        },

         "Len_08": {
            "title": "Sigma 24-70mm f/2.8 DG DN Art Lens for Sony E",
            "price": "Rs 2500 per day",
            "description": "EF-S-Mount Lens/APS-C Format. 88-400mm (35mm Equivalent). Aperture Range: f/4 to f/32. Ultra-Low Dispersion Element. Super Spectra Coating. STM Stepping AF Motor. Optical Image Stabilizer. Rounded 7-Blade Diaphragm. Minimum Focus Distance: 2.8'. 58mm Filter Thread.",
            "brand": "sony"
        },
         "Len_09": {
            "title": "Sony FE 24-70mm f/2.8 GM II Lens",
            "price": "Rs 5000 per day",
            "description": "EF-S-Mount Lens/APS-C Format. 88-400mm (35mm Equivalent). Aperture Range: f/4 to f/32. Ultra-Low Dispersion Element. Super Spectra Coating. STM Stepping AF Motor. Optical Image Stabilizer. Rounded 7-Blade Diaphragm. Minimum Focus Distance: 2.8'. 58mm Filter Thread.",
            "brand": "sony"
        },

         "Len_10": {
            "title": "Sigma 70-200mm f/2.8 DG DN OS Sports Lens Sony E",
            "price": "Rs 4000 per day",
            "description": "EF-S-Mount Lens/APS-C Format. 88-400mm (35mm Equivalent). Aperture Range: f/4 to f/32. Ultra-Low Dispersion Element. Super Spectra Coating. STM Stepping AF Motor. Optical Image Stabilizer. Rounded 7-Blade Diaphragm. Minimum Focus Distance: 2.8'. 58mm Filter Thread.",
            "brand": "sony"
        },
         "Len_11": {
            "title": "Sony FE 24-105mm f/4 G OSS Lens",
            "price": "Rs 2500 per day",
            "description": "EF-S-Mount Lens/APS-C Format. 88-400mm (35mm Equivalent). Aperture Range: f/4 to f/32. Ultra-Low Dispersion Element. Super Spectra Coating. STM Stepping AF Motor. Optical Image Stabilizer. Rounded 7-Blade Diaphragm. Minimum Focus Distance: 2.8'. 58mm Filter Thread.",
            "brand": "sony"
        },

        "Len_12": {
            "title": "Canon EF 50mm f/1.8 STM Lens",
            "price": "Rs 1000 per day",
            "description": "EF-S-Mount Lens/APS-C Format. 88-400mm (35mm Equivalent). Aperture Range: f/4 to f/32. Ultra-Low Dispersion Element. Super Spectra Coating. STM Stepping AF Motor. Optical Image Stabilizer. Rounded 7-Blade Diaphragm. Minimum Focus Distance: 2.8'. 58mm Filter Thread.",
            "brand": "canon"
        },
        "Len_13": {
            "title": "Canon EF-S 18-55mm f/3.5 APS-C Format Lens",
            "price": "Rs 1000 per day",
            "description": "EF-S-Mount Lens/APS-C Format. 88-400mm (35mm Equivalent). Aperture Range: f/4 to f/32. Ultra-Low Dispersion Element. Super Spectra Coating. STM Stepping AF Motor. Optical Image Stabilizer. Rounded 7-Blade Diaphragm. Minimum Focus Distance: 2.8'. 58mm Filter Thread.",
            "brand": "canon"
        },
        "Len_14": {
            "title": "Canon EF 24-105mm f/4L IS II USM Lens",
            "price": "Rs 1500 per day",
            "description": "EF-S-Mount Lens/APS-C Format. 88-400mm (35mm Equivalent). Aperture Range: f/4 to f/32. Ultra-Low Dispersion Element. Super Spectra Coating. STM Stepping AF Motor. Optical Image Stabilizer. Rounded 7-Blade Diaphragm. Minimum Focus Distance: 2.8'. 58mm Filter Thread.",
            "brand": "canon"
        },
        "Len_15": {
            "title": "Canon EF 75-300mm f/4-5.6 III Lens",
            "price": "Rs 1500 per day",
            "description": "EF-S-Mount Lens/APS-C Format. 88-400mm (35mm Equivalent). Aperture Range: f/4 to f/32. Ultra-Low Dispersion Element. Super Spectra Coating. STM Stepping AF Motor. Optical Image Stabilizer. Rounded 7-Blade Diaphragm. Minimum Focus Distance: 2.8'. 58mm Filter Thread.",
            "brand": "canon"
        },
        "Len_16": {
            "title": "Canon EF-S 24mm f/2.8 STM Lens",
            "price": "Rs 1500 per day",
            "description": "EF-S-Mount Lens/APS-C Format. 88-400mm (35mm Equivalent). Aperture Range: f/4 to f/32. Ultra-Low Dispersion Element. Super Spectra Coating. STM Stepping AF Motor. Optical Image Stabilizer. Rounded 7-Blade Diaphragm. Minimum Focus Distance: 2.8'. 58mm Filter Thread.",
            "brand": "canon"
        },
        "Len_17": {
            "title": "Sigma 35mm f/1.4 DG HSM Art Lens for Canon EF",
            "price": "Rs 2500 per day",
            "description": "EF-S-Mount Lens/APS-C Format. 88-400mm (35mm Equivalent). Aperture Range: f/4 to f/32. Ultra-Low Dispersion Element. Super Spectra Coating. STM Stepping AF Motor. Optical Image Stabilizer. Rounded 7-Blade Diaphragm. Minimum Focus Distance: 2.8'. 58mm Filter Thread.",
            "brand": "canon"
        },
        "Len_18": {
            "title": "Sigma 50mm f/1.4 DG HSM Art Lens for Canon EF",
            "price": "Rs 2500 per day",
            "description": "EF-S-Mount Lens/APS-C Format. 88-400mm (35mm Equivalent). Aperture Range: f/4 to f/32. Ultra-Low Dispersion Element. Super Spectra Coating. STM Stepping AF Motor. Optical Image Stabilizer. Rounded 7-Blade Diaphragm. Minimum Focus Distance: 2.8'. 58mm Filter Thread.",
            "brand": "canon"
        },
        "Len_19": {
            "title": "Sigma 85mm f/1.4 DG HSM Art Lens for Canon EF",
            "price": "Rs 2500 per day",
            "description": "EF-S-Mount Lens/APS-C Format. 88-400mm (35mm Equivalent). Aperture Range: f/4 to f/32. Ultra-Low Dispersion Element. Super Spectra Coating. STM Stepping AF Motor. Optical Image Stabilizer. Rounded 7-Blade Diaphragm. Minimum Focus Distance: 2.8'. 58mm Filter Thread.",
            "brand": "canon"
        },
        "Len_20": {
            "title": "",
            "price": "Rs 1500 per day",
            "description": "EF-S-Mount Lens/APS-C Format. 88-400mm (35mm Equivalent). Aperture Range: f/4 to f/32. Ultra-Low Dispersion Element. Super Spectra Coating. STM Stepping AF Motor. Optical Image Stabilizer. Rounded 7-Blade Diaphragm. Minimum Focus Distance: 2.8'. 58mm Filter Thread.",
            "brand": "canon"
        },





        "Fla_01": {
            "title": "Godox V1 Flash for Sony",
            "price": "Rs 1500 per day",
            "description": "Guide Number: 197' at ISO 100, 200mm. Compatible with Canon's E-TTL II System. Zoom Coverage: 20-200mm. Recycle Time: 0.1-5.5 Seconds. Flash Duration: 1/800-1/20000 Second. Wireless Master/Slave Operation. Weather-Sealed Construction. LCD Panel with Backlight. Powered by 4x AA Batteries.",
            "brand": "sony"
        },
        "Fla_02": {
            "title": "Godox V1 Flash for Canon",
            "price": "Rs 1500 per day",
            "description": "Guide Number: 197' at ISO 100, 200mm. Compatible with Canon's E-TTL II System. Zoom Coverage: 20-200mm. Recycle Time: 0.1-5.5 Seconds. Flash Duration: 1/800-1/20000 Second. Wireless Master/Slave Operation. Weather-Sealed Construction. LCD Panel with Backlight. Powered by 4x AA Batteries.",
            "brand": "canon"
        },
        "Fla_03": {
            "title": "Godox V860 III Flash for Sony",
            "price": "Rs 1500 per day",
            "description": "Guide Number: 197' at ISO 100, 200mm. Compatible with Canon's E-TTL II System. Zoom Coverage: 20-200mm. Recycle Time: 0.1-5.5 Seconds. Flash Duration: 1/800-1/20000 Second. Wireless Master/Slave Operation. Weather-Sealed Construction. LCD Panel with Backlight. Powered by 4x AA Batteries.",
            "brand": "sony"
        },
        "Fla_04": {
            "title": "Godox V860 III Flash for Canon",
            "price": "Rs 1500 per day",
            "description": "Guide Number: 197' at ISO 100, 200mm. Compatible with Canon's E-TTL II System. Zoom Coverage: 20-200mm. Recycle Time: 0.1-5.5 Seconds. Flash Duration: 1/800-1/20000 Second. Wireless Master/Slave Operation. Weather-Sealed Construction. LCD Panel with Backlight. Powered by 4x AA Batteries.",
            "brand": "canon"
        },
        "Fla_05": {
            "title": "Godox TT685 Flash for Sony",
            "price": "Rs 1000 per day",
            "description": "Guide Number: 197' at ISO 100, 200mm. Compatible with Canon's E-TTL II System. Zoom Coverage: 20-200mm. Recycle Time: 0.1-5.5 Seconds. Flash Duration: 1/800-1/20000 Second. Wireless Master/Slave Operation. Weather-Sealed Construction. LCD Panel with Backlight. Powered by 4x AA Batteries.",
            "brand": "sony"
        },
        "Fla_06": {
            "title": "Godox TT685 Flash for Canon",
            "price": "Rs 1000 per day",
            "description": "Guide Number: 197' at ISO 100, 200mm. Compatible with Canon's E-TTL II System. Zoom Coverage: 20-200mm. Recycle Time: 0.1-5.5 Seconds. Flash Duration: 1/800-1/20000 Second. Wireless Master/Slave Operation. Weather-Sealed Construction. LCD Panel with Backlight. Powered by 4x AA Batteries.",
            "brand": "canon"
        },
        "Fla_07": {
            "title": "Godox AD200 TTL Pocket Flash Kit",
            "price": "Rs 3000 per day",
            "description": "Guide Number: 197' at ISO 100, 200mm. Compatible with Canon's E-TTL II System. Zoom Coverage: 20-200mm. Recycle Time: 0.1-5.5 Seconds. Flash Duration: 1/800-1/20000 Second. Wireless Master/Slave Operation. Weather-Sealed Construction. LCD Panel with Backlight. Powered by 4x AA Batteries.",
            "brand": "sony and canon"
        },


        "Gim_01": {
            "title": "DJI RS 4 Gimbal Stabilizer",
            "price": "Rs 4000 per day",
            "description": "The DJI RS 4 Gimbal Stabilizer is designed for professional filmmakers and content creators, offering advanced stabilization features and a robust build. It supports a wide range of cameras and lenses, making it a versatile choice for any shooting scenario.",
            "type": "video"
        },
        "Gim_02": {
            "title": "DJI RS 3 Gimbal Stabilizer",
            "price": "Rs 3500 per day",
            "description": "Add a miniature, handheld gimbal camera to create family videos, add footage to your photo shoots, or vlog your latest streaming creations with the DJI Pocket 2 Creator Combo. The Pocket 2 is a lightweight, ultra-compact gimbal stabilizer and 4K camera combination, just as small as its predecessor but adds a 1/17 64MP CMOS sensor, up to 8x zoom, 93°",
            "type": "video"
        },
        "Gim_03": {
            "title": "DJI RSC 2 Gimbal Stabilizer",
            "price": "Rs 3500 per day",
            "description": "The DJI RSC 2 Gimbal Stabilizer is designed for professional filmmakers and content creators, offering advanced stabilization features and a robust build. It supports a wide range of cameras and lenses, making it a versatile choice for any shooting scenario.",
            "type": "video"
        },
        "Gim_04": {
            "title": "DJI OSMO 6 Mobile Gimbal Stabilizer",
            "price": "Rs 2000 per day",
            "description": "Add a miniature, handheld gimbal camera to create family videos, add footage to your photo shoots, or vlog your latest streaming creations with the DJI Pocket 2 Creator Combo. The Pocket 2 is a lightweight, ultra-compact gimbal stabilizer and 4K camera combination, just as small as its predecessor but adds a 1/17 64MP CMOS sensor, up to 8x zoom, 93°",
            "type": "video"
        },
        "Gim_05": {
            "title": "AOCHUAN Smart X2 Smartphone Mobile Gimbal",
            "price": "Rs 1500 per day",
            "description": "Add a miniature, handheld gimbal camera to create family videos, add footage to your photo shoots, or vlog your latest streaming creations with the DJI Pocket 2 Creator Combo. The Pocket 2 is a lightweight, ultra-compact gimbal stabilizer and 4K camera combination, just as small as its predecessor but adds a 1/17 64MP CMOS sensor, up to 8x zoom, 93°",
            "type": "video"
        },



        "Act_01": {
            "title": "DJI Osmo Pocket 3 Creator Combo",
            "price": "Rs 4500 per day",
            "description": "1/2\" CMOS Sensor, 48MP Photos. 4K/60fps Video, HDR Support. 34-Min Max Flight Time. 10km Max Transmission Range. OcuSync 2.0 Transmission. 3-Axis Gimbal, 4K/60fps HDR Video. Advanced Pilot Assistance Systems. Includes 3 Batteries, Charging Hub, and More.",
            "type": "action camera"
        },
        "Act_02": {
            "title": "Gopro HERO 13",
            "price": "Rs 3000 per day",
            "description": "1/2\" CMOS Sensor, 48MP Photos. 4K/60fps Video, HDR Support. 34-Min Max Flight Time. 10km Max Transmission Range. OcuSync 2.0 Transmission. 3-Axis Gimbal, 4K/60fps HDR Video. Advanced Pilot Assistance Systems. Includes 3 Batteries, Charging Hub, and More.",
            "type": "action camera"
        },
        "Act_03": {
            "title": "Gopro HERO 12",
            "price": "Rs 2500 per day",
            "description": "1/2\" CMOS Sensor, 48MP Photos. 4K/60fps Video, HDR Support. 34-Min Max Flight Time. 10km Max Transmission Range. OcuSync 2.0 Transmission. 3-Axis Gimbal, 4K/60fps HDR Video. Advanced Pilot Assistance Systems. Includes 3 Batteries, Charging Hub, and More.",
            "type": "action camera"
        },
        "Act_04": {
            "title": "Gopro HERO 9",
            "price": "Rs 2000 per day",
            "description": "1/2\" CMOS Sensor, 48MP Photos. 4K/60fps Video, HDR Support. 34-Min Max Flight Time. 10km Max Transmission Range. OcuSync 2.0 Transmission. 3-Axis Gimbal, 4K/60fps HDR Video. Advanced Pilot Assistance Systems. Includes 3 Batteries, Charging Hub, and More.",
            "type": "action camera"
        },
        "Act_05": {
            "title": "Insta 360 ",
            "price": "Rs 3000 per day",
            "description": "1/2\" CMOS Sensor, 48MP Photos. 4K/60fps Video, HDR Support. 34-Min Max Flight Time. 10km Max Transmission Range. OcuSync 2.0 Transmission. 3-Axis Gimbal, 4K/60fps HDR Video. Advanced Pilot Assistance Systems. Includes 3 Batteries, Charging Hub, and More.",
            "type": "action camera"
        },




        "Dro_01": {
            "title": "DJI Air 3s Fly More Combo",
            "price": "Rs 15000 per day",
            "description": "1/2\" CMOS Sensor, 48MP Photos. 4K/60fps Video, HDR Support. 34-Min Max Flight Time. 10km Max Transmission Range. OcuSync 2.0 Transmission. 3-Axis Gimbal, 4K/60fps HDR Video. Advanced Pilot Assistance Systems. Includes 3 Batteries, Charging Hub, and More."
        },
        "Dro_02": {
            "title": "DJI Mini 4 Pro Drone with RC 2 Fly More Plus Combo",
            "price": "Rs 15000 per day",
            "description": "1/2\" CMOS Sensor, 48MP Photos. 4K/60fps Video, HDR Support. 34-Min Max Flight Time. 10km Max Transmission Range. OcuSync 2.0 Transmission. 3-Axis Gimbal, 4K/60fps HDR Video. Advanced Pilot Assistance Systems. Includes 3 Batteries, Charging Hub, and More."
        },
        "Dro_03": {
            "title": "DJI Air 2s Fly More Combo",
            "price": "Rs 12000 per day",
            "description": "1/2\" CMOS Sensor, 48MP Photos. 4K/60fps Video, HDR Support. 34-Min Max Flight Time. 10km Max Transmission Range. OcuSync 2.0 Transmission. 3-Axis Gimbal, 4K/60fps HDR Video. Advanced Pilot Assistance Systems. Includes 3 Batteries, Charging Hub, and More."
        },
        "Dro_04": {
            "title": "DJI Mini 3 Drone with RC Fly More Combo",
            "price": "Rs 12000 per day",
            "description": "1/2\" CMOS Sensor, 48MP Photos. 4K/60fps Video, HDR Support. 34-Min Max Flight Time. 10km Max Transmission Range. OcuSync 2.0 Transmission. 3-Axis Gimbal, 4K/60fps HDR Video. Advanced Pilot Assistance Systems. Includes 3 Batteries, Charging Hub, and More."
        },
        "Dro_05": {
            "title": "DJI Mini 2 Drone with Fly More Combo",
            "price": "Rs 8000 per day",
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

    document.querySelectorAll('.call-button,.call-buttonn').forEach(button => {
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