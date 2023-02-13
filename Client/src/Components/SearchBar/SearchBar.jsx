import styles from './SearchBar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass, faXmark} from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
// import { filterDogs } from '../../redux/actions'
import { useEffect } from 'react'
import { useRef } from 'react'


const SearchBar = ({searchOpen}) => {

    // const filterBySearch = useSelector(state => state.filterBySearch)
    // const dogs = useSelector(state => state.dogs)
    const [input, setInput] = useState('')
    // const [showSearchClear, setShowSearchClear] = useState(filterBySearch === '' ? false : true)
    const [showSearchClear, setShowSearchClear] = useState(true)
    const inputRef = useRef()
    const dispatch = useDispatch()

    const handleSearch = (e) => {
        e.preventDefault()
        // dogs.length > 0 && dispatch(filterDogs(undefined, undefined, input.toLowerCase()))
        inputRef.current.blur()
        setShowSearchClear(true)
    }

    const handleClear = () => {
        // dispatch(filterDogs(undefined, undefined, ''))
        setShowSearchClear(false)
        setInput('')
    }

    useEffect(() => {
        searchOpen && !showSearchClear && inputRef.current.focus()
    })

    return (
        <form className={styles.searchBar} onSubmit={handleSearch}>
            {   !showSearchClear
                    &&  <>
                        <button hidden type='submit'></button>
                        <button className={styles.searchButton} type="submit">
                            <FontAwesomeIcon className={styles.searchIcon} icon={faMagnifyingGlass} fixedWidth />
                        </button></>
            }
            <input
                className={styles.searchInput}
                ref={inputRef}
                type="text"
                name="search" 
                placeholder='Search...'
                autoComplete='none'
                value={input}
                // disabled={dogs.length === 0}
                onChange={e => setInput(e.target.value)}
                onFocus={() => setShowSearchClear(false)}
            />
            {   showSearchClear
                    &&  <>
                            <button id="clearButton" className={styles.searchButton} type="reset" onClick={handleClear}>
                                <FontAwesomeIcon className={styles.searchIcon} icon={faXmark} fixedWidth />
                            </button>
                            <button hidden type='submit'></button>
                        </>

            }
        </form>
    )
}

export default SearchBar