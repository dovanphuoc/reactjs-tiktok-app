import React, { useState, useEffect } from 'react';
import HeaderComponent from '../../components/HeaderComponent'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import config from '../../config'
import { useDebounce } from '../../hooks'

const Header = () => {
    const [valueInput, setValueInput] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const history = useHistory()
    const changeValueInput = (e) => {
        setValueInput(e.target.value)
    }
    const handleClearResult = () => {
        setValueInput('')
    }
    const handleViewAllSearchResult = () => {
        history.push(`${config.routes.search}?q=${searchResult}`)
        setSearchResult([])
    }
    useDebounce(() => {
        if (!valueInput)
            return setSearchResult([])
        axios.get(`/api/users/search?q=${valueInput}&type=less&page=1`)
            .then(res => {
                setSearchResult(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, 800, [valueInput])

    return (
        <>
            <HeaderComponent    
                searchValue={valueInput}
                handleChangeValue={changeValueInput}
                onViewAllSearchResult={handleViewAllSearchResult}
                searchResult={searchResult}
                onSearchClear={handleClearResult}
            />
        </>
    );
};

export default Header;