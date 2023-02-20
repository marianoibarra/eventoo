import React, { useState } from 'react';
import Styles from './SearchBarAdmin.module.css'
import { AiOutlineSearch, AiFillDelete } from "react-icons/ai";

function SearchBar({ onSearch }) {
  const [input, setInput] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSearch(input);
    setInput('')
  };
  const deleteFormSubmit = (e) => {
    e.preventDefault();
    onSearch('');
    setInput('')
  };

  return (
    <form onSubmit={handleFormSubmit}className={Styles.searchBar}>
      <input type="text" placeholder="Buscar" value={input} onChange={handleInputChange} className={Styles.searchInput}/>
      <button type="submit" className={Styles.searchButton}><AiOutlineSearch size={18}/></button>
      <button onClick={deleteFormSubmit}className={Styles.searchButton}><AiFillDelete size={18}/></button>
    </form>
  );
}

export default SearchBar;