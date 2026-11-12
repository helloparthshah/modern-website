import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// Fades an element up into view the first time it scrolls on screen.
export default function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const tween = gsap.from(ref.current, {
      y: 24,
      opacity: 0,
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: { trigger: ref.current, start: "top 85%" },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);
  return ref;
}
