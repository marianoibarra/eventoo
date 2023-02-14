import React from 'react'
import styles from './CategoriesFilter.module.css'
import {useSelector, useDispatch} from 'react-redux'
import { axiosModeCategories } from '../../../Slice/Filter/categorieSlice'
import { useEffect, useState} from 'react'
import { BsCheckLg } from 'react-icons/bs'
import { useRef } from 'react'
import { setFilter } from '../../../Slice/newFilter/newFilterSlice'
import { getEvents } from '../../../Slice/Events/EventsSlice'

const CategoriesFilter = () => {

  const { categories } = useSelector(state => state.categories.categories)
  const filter = useSelector(state => state.newFilter)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(axiosModeCategories())
  }, [])

  useEffect(() => {
    dispatch(getEvents(filter))
  }, [filter])


  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const distance = x - startX;
    containerRef.current.scrollLeft = scrollLeft - distance;
  };

  function handleClick(id) {
    if(id === filter.category) {
      dispatch(setFilter({category: null}))
    } else {
      dispatch(setFilter({category: id}))
    }
  }

  return (
    <section 
      ref={containerRef} 
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove} 
      className={styles.categoriesWrapper}
    >
      {categories && filter && categories.map((cat, i) => 
        <div key={i} className={styles.categoryCard} onClick={() => handleClick(cat.id)} >
          <div className={styles.imgWrapper}>
            <div className={filter.category === cat.id ? styles.selected : styles.hidden}>
              <BsCheckLg color='#007F80' />
            </div>
            <img src={cat.image} alt={cat.name} />
          </div>
          <p className={`${styles.categoryName} ${filter.category === cat.id ? styles.textSel : null}`}>{cat.name}</p>
        </div>
      )
        
      }

    </section>
  )
}

export default CategoriesFilter