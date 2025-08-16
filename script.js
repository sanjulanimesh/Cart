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
            "description": "Sony Alpha a7 III is a full-frame mirrorless camera featuring a 24.2MP sensor, 4K video recording, and fast autofocus. Perfect for professional photographers and videographers seeking exceptional image quality and performance.",
            "brand": "sony"
        },
        "Cam_02": {
            "title": "Canon EOS 80D DSLR Camera",
            "price": "Rs 3000 per day",
            "description": "Canon EOS 80D is a versatile DSLR featuring a 24.2MP sensor, 45-point autofocus, Full HD 60 fps video, vari-angle touchscreen, and built-in Wi-Fi for everyday shooting.",
            "brand": "canon"
        },
        "Cam_03": {
            "title": "Canon EOS R6 Mark II Mirrorless Camera",
            "price": "Rs 6000 per day",
            "description": "Canon EOS R6 Mark II mirrorless camera offers 24.2MP image quality, fast autofocus, and Full HD 60 fps video. Designed for high-performance photography and smooth video capture.",
            "brand": "canon"
        },
        "Cam_04": {
            "title": "Canon EOS 6D Mark II Mirrorless Camera",
            "price": "Rs 4000 per day",
            "description": "Canon EOS 6D Mark II is a reliable DSLR with 24.2MP sensor, vari-angle touchscreen, Dual Pixel autofocus, and Full HD 60 fps video, great for portraits and landscapes.",
            "brand": "canon"
        },
        "Cam_09": {
            "title": "Sony Alpha a7 IV Mirrorless Digital Camera",
            "price": "Rs 6000 per day",
            "description": "Sony Alpha a7 IV mirrorless camera features a 24.2MP sensor, advanced autofocus, and 4K video capability, perfect for capturing high-quality photos and cinematic videos.",
            "brand": "sony"
        },
        "Cam_05": {
            "title": "Canon EOS 6D DSLR Camera",
            "price": "Rs 3000 per day",
            "description": "Canon EOS 6D DSLR camera offers a 24.2MP sensor, Dual Pixel autofocus, and Full HD video recording, perfect for photography enthusiasts looking for sharp images and creative flexibility.",
            "brand": "canon"
        },
        "Cam_06": {
            "title": "Nikon EOS D750 DSLR Camera",
            "price": "Rs 3000 per day",
            "description": "Nikon D750 DSLR combines a 24.2MP sensor with fast autofocus and Full HD video at 60 fps. Its vari-angle touchscreen and wireless features make it great for creators.",
            "brand": "nikon"
        },
        "Cam_07": {
            "title": "Nikon Z7 II Camera",
            "price": "Rs 6500 per day",
            "description": "Nikon Z7 II is a powerful mirrorless camera featuring a 24.2MP sensor, fast autofocus, and stunning Full HD video capabilities, ideal for professional photography and filmmaking.",
            "brand": "nikon"
        },
        "Cam_08": {
            "title": "Nikon Z6 II Camera",
            "price": "Rs 5000 per day",
            "description": "Nikon Z6 II mirrorless camera boasts a 24.2MP sensor, fast autofocus, and Full HD 60 fps video, offering smooth performance and high-quality image output for versatile shooters.",
            "brand": "nikon"
        },
        "Cam_10": {
            "title": "Nikon D5300 Camera",
            "price": "Rs 2500 per day",
            "description": "Nikon D5300 DSLR offers 24.2MP image resolution, vari-angle touchscreen, and Full HD 60 fps video, designed for entry-level photographers seeking creativity and clarity.",
            "brand": "nikon"
        },
        "Cam_11": {
            "title": "EOS 200D Mark II DSLR Camera",
            "price": "Rs 3500 per day",
            "description": "Canon EOS 200D Mark II is a compact DSLR with a 24.2MP sensor, fast Dual Pixel autofocus, and Full HD 60 fps video, perfect for vloggers and beginners.",
            "brand": "canon"
        },



        "Len_01": {
            "title": "Sigma 16-28mm f/2.8 DG DN Lens Sony E",
            "price": "Rs 2000 per day",
            "description": "Sigma 16-28mm f/2.8 lens for Sony E mount offers a wide-angle view, sharp optics, and a bright aperture ideal for landscapes, architecture, and creative low-light shots.",
            "brand": "sony"
        },
        "Len_02": {
            "title": "Sony FE 16-35mm f/2.8 GM II Lens Sony E",
            "price": "Rs 1500 per day",
            "description": "Sony FE 16-35mm f/2.8 GM II delivers wide-angle versatility with sharp clarity, great for landscapes and interiors. Its bright aperture and optical stabilization enhance image quality.",
            "brand": "sony"
        },
        "Len_03": {
            "title": "Sigma 35mm f/1.4 DG DN Art Lens for Sony E",
            "price": "Rs 2500 per day",
            "description": "Sigma 35mm f/1.4 DG DN Art lens offers sharp focus and a wide aperture for beautiful portraits and low-light photography, compatible with Sony E-mount cameras.",
            "brand": "sony"
        },
         "Len_04": {
            "title": "Sigma 50mm f/1.4 DG DN Art Lens for Sony E",
            "price": "Rs 2500 per day",
            "description": "Sigma 50mm f/1.4 DG DN Art lens is ideal for portraits, offering stunning bokeh, sharp image quality, and a bright aperture for professional Sony E-mount photography.",
            "brand": "sony"
        },
         "Len_05": {
            "title": "Sigma 85mm f/1.4 DG DN Art Lens for Sony E",
            "price": "Rs 2500 per day",
            "description": "Sigma 85mm f/1.4 DG DN Art lens provides beautiful background blur, ideal for portraits and close-ups. It delivers sharp results even in low-light conditions on Sony cameras.",
            "brand": "sony"
        },
         "Len_06": {
            "title": "Sony FE 50mm f/1.8 Lens",
            "price": "Rs 1500 per day",
            "description": "Sony FE 50mm f/1.8 lens offers a lightweight design, smooth autofocus, and a bright aperture for beautiful portraits and everyday photography on Sony E-mount cameras.",
            "brand": "sony"
        },
         "Len_07": {
            "title": "Sony FE 28-70mm f/3.5-5.6 OSS Lens",
            "price": "Rs 1500 per day",
            "description": "Sony FE 28-70mm f/3.5-5.6 OSS lens provides versatile zoom, steady images with OSS stabilization, and sharp results for both everyday shooting and travel photography.",
            "brand": "sony"
        },

         "Len_08": {
            "title": "Sigma 24-70mm f/2.8 DG DN Art Lens for Sony E",
            "price": "Rs 2500 per day",
            "description": "Sigma 24-70mm f/2.8 DG DN Art lens delivers professional zoom performance, fast aperture, and sharp image quality, making it a perfect all-purpose lens for Sony E-mount.",
            "brand": "sony"
        },
         "Len_09": {
            "title": "Sony FE 24-70mm f/2.8 GM II Lens",
            "price": "Rs 5000 per day",
            "description": "Sony FE 24-70mm f/2.8 GM II lens is a premium zoom for Sony E-mount with stunning sharpness, fast autofocus, and wide aperture for versatile photography and video.",
            "brand": "sony"
        },

         "Len_10": {
            "title": "Sigma 70-200mm f/2.8 DG DN OS Sports Lens Sony E",
            "price": "Rs 4000 per day",
            "description": "Sigma 70-200mm f/2.8 DG DN OS Sports lens offers sharp telephoto reach, fast autofocus, and stabilization, ideal for sports, wildlife, and event photography with Sony E-mount.",
            "brand": "sony"
        },
         "Len_11": {
            "title": "Sony FE 24-105mm f/4 G OSS Lens",
            "price": "Rs 2500 per day",
            "description": "Sony FE 24-105mm f/4 G OSS lens delivers versatile zoom, sharp images, and built-in stabilization, making it ideal for travel, portraits, and video shooting on Sony cameras.",
            "brand": "sony"
        },

        "Len_12": {
            "title": "Canon EF 50mm f/1.8 STM Lens",
            "price": "Rs 1000 per day",
            "description": "Canon EF 50mm f/1.8 STM lens is compact and lightweight, offering beautiful background blur and sharp image quality, perfect for portraits and street photography on Canon cameras.",
            "brand": "canon"
        },
        "Len_13": {
            "title": "Canon EF-S 18-55mm f/3.5 APS-C Format Lens",
            "price": "Rs 1000 per day",
            "description": "Canon EF-S 18-55mm f/3.5 lens is a versatile kit zoom lens with a wide-to-standard focal range, great for everyday photography, landscapes, and casual video shooting.",
            "brand": "canon"
        },
        "Len_14": {
            "title": "Canon EF 24-105mm f/4L IS II USM Lens",
            "price": "Rs 1500 per day",
            "description": "Canon EF 24-105mm f/4L IS II USM lens is a high-quality zoom with sharp optics and image stabilization, perfect for versatile shooting from wide-angle to mid-telephoto.",
            "brand": "canon"
        },
        "Len_15": {
            "title": "Canon EF 75-300mm f/4-5.6 III Lens",
            "price": "Rs 1500 per day",
            "description": "Canon EF 75-300mm f/4-5.6 III lens provides a telephoto zoom range suitable for wildlife and sports photography, delivering crisp images at a budget-friendly price.",
            "brand": "canon"
        },
        "Len_16": {
            "title": "Canon EF-S 24mm f/2.8 STM Lens",
            "price": "Rs 1500 per day",
            "description": "Canon EF-S 24mm f/2.8 STM lens is an ultra-slim wide-angle prime, great for travel and street photography, offering sharp images and a bright aperture for low-light use.",
            "brand": "canon"
        },
        "Len_17": {
            "title": "Sigma 35mm f/1.4 DG HSM Art Lens for Canon EF",
            "price": "Rs 2500 per day",
            "description": "Sigma 35mm f/1.4 DG HSM Art lens for Canon EF mount provides sharp wide-angle results, ideal for portraits and creative shots in low light with beautiful bokeh.",
            "brand": "canon"
        },
        "Len_18": {
            "title": "Sigma 50mm f/1.4 DG HSM Art Lens for Canon EF",
            "price": "Rs 2500 per day",
            "description": "Sigma 50mm f/1.4 DG HSM Art lens for Canon EF offers sharp detail and beautiful background blur, perfect for portrait photography and low-light shooting situations.",
            "brand": "canon"
        },
        "Len_19": {
            "title": "Sigma 85mm f/1.4 DG HSM Art Lens for Canon EF",
            "price": "Rs 2500 per day",
            "description": "Sigma 85mm f/1.4 DG HSM Art lens for Canon EF delivers creamy bokeh and sharp portrait results, making it a top choice for professional portraiture.",
            "brand": "canon"
        },
        "Len_20": {
            "title": "Sigma 24-70mm f/2.8 DG OS HSM Art Lens for Canon EF",
            "price": "Rs 3500 per day",
            "description": "Sigma 24-70mm f/2.8 DG OS HSM Art lens for Canon EF is a professional zoom offering sharp optics, a fast aperture, and versatile shooting from wide to medium telephoto.",
            "brand": "canon"
        },
        "Len_21": {
            "title": "Sigma 150-600mm f/5-6.3 DG OS HSM Lens for Canon EF",
            "price": "Rs 5000 per day",
            "description": "Sigma 150-600mm f/5-6.3 DG OS HSM lens for Canon EF offers extreme telephoto reach with stabilization, ideal for wildlife and sports, delivering sharp and steady images.",
            "brand": "canon"
        },
        "Len_22": {
            "title": "Sony FE 200-600mm f/5.6-6.3 G OSS Lens",
            "price": "Rs 5000 per day",
            "description": "Sony FE 200-600mm f/5.6-6.3 G OSS lens provides powerful zoom reach for wildlife and sports, with sharp image quality and optical stabilization for steady handheld shooting.",
            "brand": "sony"
        },
        "Len_23": {
            "title": "Canon RF 800mm f/11 IS STM Lens",
            "price": "Rs 4000 per day",
            "description": "Canon RF 800mm f/11 IS STM lens is a lightweight super-telephoto option perfect for wildlife photography, featuring image stabilization and quiet autofocus for distant subjects.",
            "brand": "canon"
        },
        "Len_24": {
            "title": "Tamron SP 150-600mm f/5-6.3 Di VC USD G2 for Nikon F",
            "price": "Rs 4500 per day",
            "description": "Tamron SP 150-600mm f/5-6.3 G2 for Nikon F mount offers long telephoto reach with sharp optics and stabilization, making it ideal for wildlife and sports photographers.",
            "brand": "nikon"
        },
        "Len_25": {
            "title": "Nikon AF-P NIKKOR 70-300mm ED VR Lens",
            "price": "Rs 4500 per day",
            "description": "Nikon AF-P NIKKOR 70-300mm ED VR lens is a compact telephoto zoom with vibration reduction, perfect for capturing distant subjects like wildlife and sports.",
            "brand": "canon"
        },
        "Len_26": {
            "title": "Sigma 24-70mm f/2.8 DG OS HSM Art Lens for Nikon F",
            "price": "Rs 4500 per day",
            "description": "Sigma 24-70mm f/2.8 DG OS HSM Art lens for Nikon F offers pro-grade zoom, sharp detail, and a fast aperture for versatility in portraits, events, and landscapes.",
            "brand": "nikon"
        },
        "Len_27": {
            "title": "Sigma 35mm f/1.4 DG HSM Art Lens for Nikon F",
            "price": "Rs 2500 per day",
            "description": "Sigma 35mm f/1.4 DG HSM Art lens for Nikon F delivers sharp wide-angle performance and beautiful bokeh, ideal for portraits and low-light photography.",
            "brand": "nikon"
        },
        "Len_28": {
            "title": "Sigma 50mm f/1.4 DG HSM Art Lens for Nikon F",
            "price": "Rs 2500 per day",
            "description": "Sigma 50mm f/1.4 DG HSM Art lens for Nikon F offers a bright aperture and crisp optics, ideal for portraits, weddings, and low-light shooting.",
            "brand": "nikon"
        },
        "Len_29": {
            "title": "Sigma 85mm f/1.4 DG HSM Art Lens for Nikon F",
            "price": "Rs 2500 per day",
            "description": "Sigma 85mm f/1.4 DG HSM Art lens for Nikon F mount creates stunning portrait shots with sharp detail and beautiful, creamy background blur.",
            "brand": "nikon"
        },
        "Len_30": {
            "title": "Nikon AF-P DX NIKKOR 18-55mm f/3.5-5.6G VR Lens",
            "price": "Rs 1000 per day",
            "description": "Nikon AF-P DX NIKKOR 18-55mm f/3.5-5.6G VR is a versatile zoom lens, ideal for beginners, offering image stabilization and crisp results for everyday photography.",
            "brand": "nikon"
        },
        "Len_31": {
            "title": "Sigma 70-200mm f/2.8 DG OS HSM Sports Lens for Nikon F",
            "price": "Rs 3000 per day",
            "description": "Sigma 70-200mm f/2.8 DG OS HSM Sports lens for Nikon F is a fast telephoto zoom with optical stabilization, ideal for action, wildlife, and event photography.",
            "brand": "nikon"
        },
        "Len_32": {
            "title": "Sigma 70-200mm f/2.8 DG OS HSM Sports Lens for Canon EF",
            "price": "Rs 3000 per day",
            "description": "Sigma 70-200mm f/2.8 DG OS HSM Sports lens for Canon EF mount offers sharp telephoto performance, image stabilization, and fast autofocus for professional sports and wildlife shots.",
            "brand": "canon"
        },

        

        "Fla_01": {
            "title": "Godox V1 Flash for Sony",
            "price": "Rs 1500 per day",
            "description": "Professional round-head flash providing soft, even lighting. Supports TTL, HSS, and wireless triggering, making it ideal for portrait, wedding, and event photography with Sony cameras.",
            "brand": "sony"
        },
        "Fla_02": {
            "title": "Godox V1 Flash for Canon",
            "price": "Rs 1500 per day",
            "description": "Advanced round-head flash offering TTL, HSS, and wireless compatibility. Produces natural light spread, perfect for professional Canon photographers capturing portraits, weddings, and creative lighting setups.",
            "brand": "canon"
        },
        "Fla_03": {
            "title": "Godox V860 III Flash for Sony",
            "price": "Rs 1500 per day",
            "description": "Powerful on-camera flash with a rechargeable battery, fast recycling, and TTL/HSS support. Ideal for professional Sony shooters capturing weddings, portraits, and events with reliable lighting performance.",
            "brand": "sony"
        },
        "Fla_04": {
            "title": "Godox V860 III Flash for Canon",
            "price": "Rs 1500 per day",
            "description": "TTL-enabled flash with lithium-ion battery, quick recycle times, and high-speed sync. Perfect for Canon users needing reliable lighting for portraits, weddings, and fast-paced photography environments.",
            "brand": "canon"
        },
        "Fla_05": {
            "title": "Godox TT685 Flash for Sony",
            "price": "Rs 1000 per day",
            "description": "Affordable TTL flash for Sony cameras, featuring HSS, wireless triggering, and fast recycling. Ideal for beginners and enthusiasts enhancing portrait and event photography with external lighting.",
            "brand": "sony"
        },
        "Fla_06": {
            "title": "Godox TT685 Flash for Canon",
            "price": "Rs 1000 per day",
            "description": "Budget-friendly TTL flash for Canon cameras with wireless support and HSS. Suitable for photographers who need versatile lighting options for portrait, event, and creative shoots.",
            "brand": "canon"
        },
        "Fla_07": {
            "title": "Godox AD200 TTL Pocket Flash Kit",
            "price": "Rs 3000 per day",
            "description": "Compact yet powerful off-camera flash with interchangeable heads and TTL/HSS support. Perfect for location shooting, providing studio-quality light in a portable package for professional photographers.",
            "brand": "sony and canon"
        },


        "Gim_01": {
            "title": "DJI RS 4 Gimbal Stabilizer",
            "price": "Rs 4000 per day",
            "description": "Professional 3-axis gimbal offering powerful stabilization, smooth tracking, and intuitive controls. Supports various cameras and lenses, perfect for filmmakers and content creators seeking dynamic, cinematic footage.",
            "type": "video"
        },
        "Gim_02": {
            "title": "DJI RS 3 Gimbal Stabilizer",
            "price": "Rs 3500 per day",
            "description": "Advanced handheld gimbal providing smooth stabilization for mirrorless and DSLR cameras. Lightweight and compact, ideal for run-and-gun videographers and content creators needing reliable, professional results.",
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
            "description": "Smartphone gimbal with 3-axis stabilization, gesture controls, and tracking features. Perfect for vloggers, travelers, and casual users looking to create smooth, cinematic mobile videos.",
            "type": "video"
        },
        "Gim_05": {
            "title": "AOCHUAN Smart X2 Smartphone Mobile Gimbal",
            "price": "Rs 1500 per day",
            "description": "Portable smartphone gimbal with smart tracking, gesture control, and multiple shooting modes. Great for vloggers and mobile content creators looking for stabilized video and creative shooting options.",
            "type": "video"
        },



        "Act_01": {
            "title": "DJI Osmo Pocket 3 Creator Combo",
            "price": "Rs 4500 per day",
            "description": "All-in-one handheld gimbal camera featuring a large sensor, 4K video, and intelligent shooting modes. Compact and powerful, perfect for vloggers and solo creators capturing smooth, cinematic footage.",
            "type": "action camera"
        },
        "Act_02": {
            "title": "Gopro HERO 13",
            "price": "Rs 3000 per day",
            "description": "Rugged action camera offering 5.3K video, advanced stabilization, and waterproof design. Ideal for extreme sports, travel, and vlogging, capturing high-resolution footage in the toughest environments.",
            "type": "action camera"
        },
        "Act_04": {
            "title": "Gopro HERO 9",
            "price": "Rs 2000 per day",
            "description": "Versatile action camera with 5K video, HyperSmooth stabilization, and front display. Perfect for adventure enthusiasts, vloggers, and travelers capturing high-quality footage in all conditions.",
            "type": "action camera"
        },
        "Act_05": {
            "title": "Insta 360 ",
            "price": "Rs 3000 per day",
            "description": "Compact 360-degree action camera capturing immersive videos and photos. Features FlowState stabilization and waterproof design, making it perfect for creative travel content, sports, and VR storytelling.",
            "type": "action camera"
        },




        "Dro_01": {
            "title": "DJI Air 3s Fly More Combo",
            "price": "Rs 15000 per day",
            "description": "Advanced drone with dual cameras, 4K video(D.log), and up to 46-minute flight time. Includes extra batteries and accessories, ideal for aerial photography, videography, and professional drone pilots."
        },
        "Dro_02": {
            "title": "DJI Mini 4 Pro Drone with RC 2 Fly More Plus Combo",
            "price": "Rs 14000 per day",
            "description": "Compact and lightweight drone with 4K video(D.Log), obstacle avoidance, and extended flight time. Fly More Plus combo includes extra batteries and accessories for extended shooting sessions."
        },
        "Dro_03": {
            "title": "DJI Air 2s Fly More Combo",
            "price": "Rs 12000 per day",
            "description": "Powerful drone featuring 1-inch sensor, 5.4K video, and intelligent flight modes. Fly More combo offers additional batteries and accessories for professional aerial photography and videography."
        },
        "Dro_04": {
            "title": "DJI Mini 3 Drone with RC Fly More Combo",
            "price": "Rs 12000 per day",
            "description": "Small, portable drone with 4K video, GPS, and quick setup. The Fly More combo includes spare batteries and accessories, great for beginners and hobbyists capturing aerial shots."
        },
        "Dro_05": {
            "title": "DJI Mini 2 Drone with Fly More Combo",
            "price": "Rs 8000 per day",
            "description": "Ultra-lightweight drone with 4K video, strong wind resistance, and 31-minute flight time. Fly More combo adds extra batteries and carrying case for extended outdoor shooting."
        },

        "Vid_01": {
            "title": "Tolifo SK-200D RGB LED Video/Photography Light",
            "price": "Rs 3000 per day",
            "description": "Professional RGB LED light offering adjustable color temperature and high brightness. Ideal for video shoots, portraits, and creative lighting setups with full control over ambiance."
        },
        "Vid_02": {
            "title": "LED 800 Pro Video/Photography Light",
            "price": "Rs 3000 per day",
            "description": "Bright LED panel with adjustable brightness and color temperature. Suitable for studio and location shoots, delivering consistent, flicker-free light for photography and videography."
        },
        "Vid_03": {
            "title": "Godox LED RGB Light Stick LC500R",
            "price": "Rs 2000 per day",
            "description": "Portable RGB LED light stick with multiple color options and effects. Perfect for creative lighting in photography and video, including portraits, events, and artistic projects."
        },
        "Vid_04": {
            "title": "NiceFoto TC-C2 Handheld Round RGB Stick",
            "price": "Rs 1500 per day",
            "description": "Compact RGB light stick featuring adjustable colors and effects. Handy for mobile lighting, adding creative flair to portraits, events, and video shoots."
        },
        "Camcorder_01": {
            "title": "SONY HXR-NX200 4K CAMCORDER",
            "price": "Rs 4000 per day",
            "description": "Professional 4K camcorder with high-quality sensor and optics. Designed for event, documentary, and broadcast production, offering excellent image quality and versatile recording options."
        },
        "Tri_01": {
            "title": "Yunteng Fluid Head Video Tripod",
            "price": "Rs 1000 per day",
            "description": "Stable video tripod with fluid head for smooth panning and tilting. Ideal for professional videographers needing steady shots and precise camera movements in various shooting conditions."
        },
        "Tri_02": {
            "title": "Yunteng Fluid Head Video Monopod",
            "price": "Rs 1000 per day",
            "description": "A lightweight aluminum monopod with fluid pan head, quick release plate, and 360° rotation support. Extends to 148 cm, supports up to ~4 kg. Ideal for smooth video and hybrid camera use."
        },
        "Mic_01": {
            "title": "DJI Mic 2 Digital Wireless Microphone",
            "price": "Rs 3000 per day",
            "description": "Compact dual-channel wireless mic with crystal-clear audio, touchscreen interface, up to 250m range, and 14-hour onboard recording. Ideal for pro content creators and interviews in any setting."
        },
        "Mic_02": {
            "title": "Rode Wireless GO II Dual Channel Wireless Microphone",
            "price": "Rs 2500 per day",
            "description": "Dual transmitter system with internal recording, up to 200m range, USB-C and 3.5mm output. Perfect for vlogging, podcasting, or two-person interviews with professional-grade sound."
        },
        "Mic_03": {
            "title": "BOYA Dual-Channel Wireless",
            "price": "Rs 2000 per day",
            "description": "Affordable dual wireless mic system with omnidirectional lavaliers, up to 100m range, real-time monitoring, and clear audio quality—great for beginner creators, events, and mobile video shoots."
        },
        "Fla_08": {
            "title": "Godox AD600B Witstro TTL All-In-One Outdoor Flash",
            "price": "Rs 3500 per day",
            "description": "Powerful 600Ws battery-powered flash with TTL, HSS, and built-in 2.4GHz wireless system. Ideal for outdoor and studio shoots, delivering consistent lighting and portability for professional photographers."
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