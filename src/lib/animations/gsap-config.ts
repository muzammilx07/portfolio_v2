import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let isRegistered = false;

if (typeof window !== "undefined" && !isRegistered) {
  gsap.registerPlugin(ScrollTrigger);
  isRegistered = true;
}

export { gsap, ScrollTrigger };
