import React, { useState, useEffect, useRef } from 'react';
import $ from 'jquery';
import goToPage from '../utils/goToPage';

import '../css/header.css';

const Header = () => {
    let [showMenu, toggleMenu] = useState(false);

    const header = useRef();
    const cvDownloadElem = useRef();

    // on scroll, toggle sticky class
    useEffect(() => {
        const headerComponent = header.current;

        if (headerComponent) {
            const initialHeaderOffset = headerComponent.offsetTop;
            if (window.pageYOffset > initialHeaderOffset) {
                headerComponent.classList.add('sticky');
            }

            window.onscroll = () => {
                if (window.pageYOffset <= initialHeaderOffset) {
                    headerComponent.classList.remove('sticky');
                }
                if (window.pageYOffset > headerComponent.offsetTop) {
                    headerComponent.classList.add('sticky');
                }
            }
        }
    }, []);

    const handleMenuToggle = (e, forceToggle = false) => {
        let expander;
        if (forceToggle) {
            expander = document.getElementsByClassName('menu-click')[0];
        } else {
            expander = e.target.closest('.menu-click');
        }
        if (expander) {
            if (expander.classList.contains('open')) {
                toggleMenu(false);
            } else {
                toggleMenu(true);
            }
            $('#main-menu').slideToggle(200);
        }
    }

    const downloadCV = () => {
        if (cvDownloadElem.current) {
            cvDownloadElem.current.click();
        }
    }

    return (
        <section className='header-wrapper' ref={header}>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-2 col-md-12 text-left'>
                        <a className='logo' onClick={() => goToPage('/')}>
                            <img src='../static/png/logo.png' alt='logo' />
                        </a>
                        <a className={'menu-click' + (showMenu ? ' open' : '')} onClick={handleMenuToggle}><span></span><span></span><span></span></a>
                    </div>
                    <div className='col-lg-8 col-md-12'>
                        <nav id='main-menu' className='text-center'>
                            <ul>
                                <li onClick={() => goToPage('/', { cbAfterAnimate: () => handleMenuToggle(null, true) })}>
                                    <a>Home</a>
                                </li>
                                <li>
                                    <a>Contact</a>
                                </li>
                                <li onClick={downloadCV}>
                                    <a ref={cvDownloadElem} href='../static/pdf/Abhishek.pdf' download='AbhishekCV'>Download My CV</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    {/* <div className='col-lg-2 col-md-4 text-right'>
                        <a className='search-icon' onClick={() => console.log('click')}><img className='search-area' src='../static/icons8-search-50.png' /></a>
                    </div> */}
                </div>
            </div>
        </section>
    );
}

export default Header;
