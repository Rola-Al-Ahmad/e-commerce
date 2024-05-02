import React from "react";

import { useNavigate } from "react-router-dom";

import { SearchIcon } from "./icons";

const Search = () => {
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = React.useState("");

    React.useEffect(() => {
        const delay = setTimeout(() => {
            if (searchTerm) {
                navigate("/search?s=" + searchTerm);
            }
        }, 500);

        return () => clearTimeout(delay);
    }, [searchTerm, navigate]);

    const handleChange = (ev) => {
        if(!ev.target.value) {
            navigate("/");
        }
        setSearchTerm(ev.target.value);
    };

    return (
        <>
            <div id="searchBar">
                <div id="search">
                    <input type="text" name="search" onChange={handleChange} placeholder="Search"/>
                </div>
                <button onClick={() => navigate("/search?s=" + searchTerm)}>
                    <SearchIcon />
                </button>
            </div>
        </>

    );
};

export default Search;
