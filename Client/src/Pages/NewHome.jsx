import React from "react";
import Navbar from "../Components/NavBar/NavBar";
import styles from "./NewHome.module.css";

const NewHome = () => {
  return (
    <>
      <Navbar />
      <div className={styles.body}>
        <div className={styles.infoBanner}></div>
        <section className={styles.categoryBar}>Categories</section>
        <section className={styles.filterBar}>Filters</section>
        <main className={styles.main}>
          <section className={styles.favoritesBar}>Favorites</section>
          <section className={styles.cardsWrapper}>cardsWrapper</section>
        </main>
      </div>
    </>
  );
};

export default NewHome;
