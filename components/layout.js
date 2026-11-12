import Topbar from "./topbar";
import { Fade } from "react-bootstrap";
import Footer from "./footer";
import ScrollToTop from "./scrollToTop";
import StyledJsxRegistry from "./registry";
import { DesignProvider, DesignSwitcher, useDesign } from "./design";
import ChalkLayer from "./chalkLayer";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default function Layout({ children, initialDesign }) {
  return (
    <StyledJsxRegistry>
      <DesignProvider initialDesign={initialDesign}>
      <Topbar />
      <Fade in={true} appear={true} timeout={10}>
        <main style={{ minHeight: "calc(100vh - 100px)" }} aria-label="main">
          {children}
        </main>
      </Fade>
      <ScrollToTop />
      <Footer />
      <DesignSwitcher />
      <ChalkOnly />
      </DesignProvider>
    </StyledJsxRegistry>
  );
}

// The drawing layer only exists in the chalkboard design.
function ChalkOnly() {
  const { design } = useDesign();
  return design === "sketch" ? <ChalkLayer /> : null;
}
