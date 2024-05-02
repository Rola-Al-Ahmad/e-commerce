import React, { useState, useEffect } from "react";

import { Outlet, Link, useLocation } from "react-router-dom";

import { HomeIcon, CartIcon } from "./icons";
import Search from "./search";

const Layout = ({ categories }) => {
    const [activeNav, setActiveNav] = useState('');
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/') {
            setActiveNav('');
        }
    }, [location]);

    const handleNavClick = (link) => {
        setActiveNav(link);
    };

    const renderCategories = () => {
        console.log(activeNav);
        /*
        const categories = [];
        categories.forEach((category) => {
          categories.push(<Category key={category.id} id={category.id} title={category.title} onCategoryClick={handleCategoryClick}/>)
        })
        return categories;
        */
        return categories.data.map((c) => (
            <li key={c.id} className={activeNav === c.id ? 'active' : ''}>
                <Link to={`/categories/${c.id}`} key={c.id} onClick={() => handleNavClick(c.id)}>
                    <span className="text">{c.title}</span>
                </Link>
            </li>
        ));
    };

    return (
        <>
            <nav id="sidebar">
                {categories.errorMessage && (
                    <div>Error: {categories.errorMessage}</div>
                )}

                <ul className="side-menu top">{categories.data && renderCategories()}</ul>
            </nav>
            <section id="content">
                <main>
                    <div className="head-title">
                        <div className="left">
                            <h1>Our Store</h1>
                            <ul className="breadcrumb">
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                            </ul>
                        </div>
                        <Search />
                        <Link to="/basket"><CartIcon width={30} /></Link>
                    </div>
                    <Outlet />
                </main>
            </section>
        </>
    );
};

export default Layout;
