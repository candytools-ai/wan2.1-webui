import { useEffect, useState } from "react";

export function useScrollHeight(height: number) {
    let lastKnownScrollPosition = 0;
    let ticking = true;
    let scrollHeaher = false
    const [scroll, setScroll] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;
        // setMounted(true)
        function applyHeaderStylesOnScroll() {
            // const header = document.querySelector(
            //     "#header[data-aw-sticky-header]"
            // );
            // if (!header) return;
            if (
                lastKnownScrollPosition > height &&
                // !header.classList.contains("scroll")
                !scrollHeaher
            ) {
                // header.classList.add("scroll");
                scrollHeaher = true
                setScroll(true);
            } else if (
                lastKnownScrollPosition <= height &&
                // header.classList.contains("scroll")
                scrollHeaher
            ) {
                // header.classList.remove("scroll");
                scrollHeaher = false
                setScroll(false);
            }
            ticking = false;
        }
        applyHeaderStylesOnScroll();

        function handleScroll() {
            lastKnownScrollPosition = window.scrollY;
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    applyHeaderStylesOnScroll();
                });
                ticking = true;
            }
        }

        // Listener for windows resize
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener('resize', handleScroll);
    }, []);

    return { scroll };
}
