document.addEventListener("DOMContentLoaded", function() {
    const heroContent = document.querySelector(".hero-content");
    heroContent.style.opacity = 0;
    heroContent.style.transform = "translateX(100px)";
    
    setTimeout(() => {
        heroContent.style.transition = "all 3s ease";
        heroContent.style.opacity = 1;
        heroContent.style.transform = "translateX(0)";
    }, 500);

    // النص في القسم الثاني
    const stepsSection = document.querySelector(".steps-section h2");
    stepsSection.style.opacity = 0;
    stepsSection.style.transform = "translateY(-50px)";
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                stepsSection.style.transition = "all 1.7s ease-in-out";
                stepsSection.style.opacity = 1;
                stepsSection.style.transform = "translateY(0)";
                observer.unobserve(stepsSection); // إيقاف مراقبة العنصر بعد تحريكه

                // إضافة حركة النصوص والصور
                const descriptionImage = document.querySelector("img[alt='اختر التصميم']");
                const descriptionText = descriptionImage.nextElementSibling;
                const newImage = document.querySelector("img[alt='إرسال التصميم']");
                const newText = newImage.nextElementSibling;
                const clothImage = document.querySelector("img[alt='أضف التفاصيل']");
                const clothText = clothImage.nextElementSibling;
                const manImage = document.querySelector("img[alt='ثوب سعودي']");
                const manTextDiv = document.querySelector(".description-text");

                if (descriptionImage && descriptionText && newImage && newText && clothImage && clothText && manImage && manTextDiv) {
                    descriptionImage.style.opacity = 0;
                    descriptionImage.style.transform = "translateX(100px)";
                    descriptionText.style.opacity = 0;
                    descriptionText.style.transform = "translateX(100px)";
                    newImage.style.opacity = 0;
                    newImage.style.transform = "translateX(-100px)";
                    newText.style.opacity = 0;
                    newText.style.transform = "translateX(-100px)";
                    clothImage.style.opacity = 0;
                    clothImage.style.transform = "translateY(100px)";
                    clothText.style.opacity = 0;
                    clothText.style.transform = "translateY(100px)";
                    manImage.style.opacity = 0;
                    manImage.style.transform = "translateX(100px)";
                    manTextDiv.style.opacity = 0;
                    manTextDiv.style.transform = "translateX(100px)";

                    setTimeout(() => {
                        descriptionImage.style.transition = "opacity 2s ease-out, transform 2s ease-in-out";
                        descriptionImage.style.opacity = 1;
                        descriptionImage.style.transform = "translateX(0)";
                        
                        setTimeout(() => {
                            descriptionText.style.transition = "opacity 2s ease-out, transform 2s ease-in-out";
                            descriptionText.style.opacity = 1;
                            descriptionText.style.transform = "translateX(0)";
                        }, 1000); // بدء حركة النص في منتصف حركة الصورة
                        
                        newImage.style.transition = "opacity 2s ease-out, transform 2s ease-in-out";
                        newImage.style.opacity = 1;
                        newImage.style.transform = "translateX(0)";
                        
                        setTimeout(() => {
                            newText.style.transition = "opacity 2s ease-out, transform 2s ease-in-out";
                            newText.style.opacity = 1;
                            newText.style.transform = "translateX(0)";
                        }, 1000); // بدء حركة النص في منتصف حركة الصورة
                        
                        clothImage.style.transition = "opacity 2s ease-out, transform 2s ease-in-out";
                        clothImage.style.opacity = 1;
                        clothImage.style.transform = "translateY(0)";
                        
                        setTimeout(() => {
                            clothText.style.transition = "opacity 2s ease-out, transform 2s ease-in-out";
                            clothText.style.opacity = 1;
                            clothText.style.transform = "translateY(0)";
                        }, 1000); // بدء حركة النص في منتصف حركة الصورة

                        // حركة الصورة الأخيرة من اليمين إلى اليسار عند التمرير
                        const manObserver = new IntersectionObserver((entries) => {
                            entries.forEach((entry) => {
                                if (entry.isIntersecting) {
                                    manImage.style.transition = "opacity 2s ease-in, transform 2s ease-out";
                                    manImage.style.opacity = 1;
                                    manImage.style.transform = "translateX(0)";
                                    
                                    setTimeout(() => {
                                        manTextDiv.style.transition = "opacity 2s ease-out, transform 2s ease-in-out";
                                        manTextDiv.style.opacity = 1;
                                        manTextDiv.style.transform = "translateX(0)";
                                    }, 1000); // بدء حركة النص في منتصف حركة الصورة
                                    
                                    manObserver.unobserve(manImage); // إيقاف مراقبة العنصر بعد تحريكه
                                }
                            });
                        }, { threshold: 0.5 });

                        manObserver.observe(manImage);
                    }, 1700); // نفس زمن التأخير لحركة النص الأول
                }
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(stepsSection);
});
