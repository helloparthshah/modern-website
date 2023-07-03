'use client'

import { Container, Navbar, Nav, Offcanvas } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Topbar() {
    const [show, setShow] = useState(false);
    const [visible, setVisible] = useState(false);
    const pageYOffsetTrigger = 150;

    useEffect(() => {
        function toggleVisibility() {
            window.pageYOffset > pageYOffsetTrigger ? setVisible(true) : setVisible(false)
        }

        window.addEventListener("scroll", toggleVisibility);
        return () => { window.removeEventListener("scroll", toggleVisibility) }
    }, []);

    return (
        <>
            <Navbar
                className={"topbar" + (visible ? " shadow-sm bg-dark" : " bg-white")}
                variant={visible ? "dark" : "light"}
                expand="lg"
                sticky="top"
                style={{ transition: "all 0.5s ease" }}
            >
                <Container fluid>
                    <Navbar.Brand href="/" as={Link}>
                        <svg width="70" height="70" viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M477.105 466.946C477.105 483.455 475.063 498.202 470.978 511.186C466.893 524.171 461.323 535.672 454.267 545.688C447.397 555.52 439.413 563.96 430.315 571.008C421.217 578.057 411.655 583.808 401.629 588.259C391.788 592.711 381.762 595.957 371.55 597.998C361.523 600.038 352.054 601.059 343.142 601.059H179.378V528.715H343.142C352.425 527.973 360.781 526.119 368.208 523.151C375.82 519.997 382.319 515.824 387.703 510.63C393.088 505.436 397.266 499.222 400.236 491.987C403.207 484.568 404.692 476.22 404.692 466.946V434.113C403.764 425.024 401.815 416.676 398.844 409.071C395.873 401.466 391.788 394.973 386.589 389.594C381.576 384.215 375.449 380.041 368.208 377.073C360.966 373.92 352.611 372.343 343.142 372.343H179.935C170.28 372.343 162.946 374.847 157.932 379.856C152.919 384.864 150.413 392.098 150.413 401.559V699H78V401.559C78 383.009 81.3421 367.242 88.0264 354.257C94.8963 341.273 103.344 330.792 113.371 322.816C123.583 314.84 134.63 309.089 146.514 305.565C158.397 301.855 169.351 300 179.378 300H343.142C359.481 300 374.149 302.133 387.146 306.4C400.143 310.48 411.562 316.045 421.403 323.094C431.429 329.957 439.878 337.934 446.748 347.023C453.803 356.112 459.559 365.665 464.015 375.682C468.657 385.513 471.999 395.53 474.042 405.732C476.084 415.749 477.105 425.209 477.105 434.113V466.946Z" fill={visible ? "#FFFFFF" : "#000000"} />
                            <path d="M923 581.582C923 595.865 921.143 608.757 917.43 620.257C913.902 631.573 909.167 641.589 903.226 650.308C897.284 659.026 890.321 666.446 882.338 672.567C874.354 678.688 866.091 683.697 857.55 687.592C849.009 691.487 840.282 694.363 831.37 696.218C822.644 698.073 814.381 699 806.583 699H527.237V626.657H806.583C820.508 626.657 831.277 622.576 838.89 614.414C846.688 606.252 850.587 595.308 850.587 581.582C850.587 574.904 849.566 568.782 847.524 563.218C845.481 557.653 842.511 552.83 838.611 548.749C834.898 544.668 830.256 541.515 824.686 539.289C819.301 537.063 813.267 535.95 806.583 535.95H640.034C628.336 535.95 615.71 533.909 602.156 529.828C588.602 525.562 575.976 518.791 564.279 509.517C552.767 500.242 543.112 488.092 535.314 473.067C527.701 458.042 523.895 439.678 523.895 417.975C523.895 396.272 527.701 378.001 535.314 363.161C543.112 348.136 552.767 335.986 564.279 326.711C575.976 317.251 588.602 310.48 602.156 306.4C615.71 302.133 628.336 300 640.034 300H886.515V372.343H640.034C626.294 372.343 615.525 376.517 607.726 384.864C600.114 393.211 596.308 404.248 596.308 417.975C596.308 431.887 600.114 442.924 607.726 451.086C615.525 459.062 626.294 463.05 640.034 463.05H807.14C814.938 463.236 823.201 464.349 831.927 466.389C840.654 468.244 849.288 471.212 857.829 475.293C866.555 479.374 874.818 484.568 882.616 490.874C890.414 496.996 897.284 504.416 903.226 513.134C909.353 521.852 914.181 531.869 917.708 543.184C921.236 554.499 923 567.298 923 581.582Z" fill={visible ? "#FFFFFF" : "#000000"} />
                        </svg>
                    </Navbar.Brand>
                    <Navbar.Toggle
                        aria-controls={`offcanvasNavbar-expand-sm`}
                        onClick={() => setShow(true)}
                    />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-sm`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-sm`}
                        show={show}
                        onHide={() => setShow(false)}
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
                                Parth Shah
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link href="/" as={Link} className="main-text-regular" onClick={() => setShow(false)}>
                                    Home
                                </Nav.Link>
                                <Nav.Link href="/about" as={Link} className="main-text-regular" onClick={() => setShow(false)}>
                                    About
                                </Nav.Link>
                                <Nav.Link href="/blogs" as={Link} className="main-text-regular" onClick={() => setShow(false)}>
                                    Blogs
                                </Nav.Link>
                                <Nav.Link href="/help" as={Link} className="main-text-regular" onClick={() => setShow(false)}>
                                    Help
                                </Nav.Link>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </>
    )
}