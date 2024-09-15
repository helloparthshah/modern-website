import Topbar from "./topbar";
import { Fade } from "react-bootstrap";
import Footer from "./footer";
import ScrollToTop from "./scrollToTop";
import StyledJsxRegistry from "./registry";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default function Layout({ children }) {
  return (
    <StyledJsxRegistry>
      <Topbar />
      <Fade in={true} appear={true} timeout={10}>
        <main style={{ minHeight: "calc(100vh - 100px)" }} aria-label="main">
          {children}
        </main>
      </Fade>
      <ScrollToTop />
      <Footer />
    </StyledJsxRegistry>
  );
}
