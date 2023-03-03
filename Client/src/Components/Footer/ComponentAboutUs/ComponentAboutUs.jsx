import styles from './ComponentAboutUs.module.css';

const AboutUs = () => {
  return (
    <div className={styles.background}>
      <div className={styles.body}>
        <div className={styles.containerTitle}>
          <h2>Welcome to Eventoo</h2>
        </div>
        <div className={styles.containerText1}>
          <p>Eventoo is the online platform that connects you with the most exciting and fun events in your city. We believe that every event is unique and deserves the opportunity to shine, which is why we're proud to provide a platform for organizers to showcase their events and for ticket buyers to find the perfect event.</p>
        </div>
        <div className={styles.containerText2}>
          <p>Whether you're looking for a private or public event, a concert or a conference, a festival or a play, Eventoo has everything you need! We work hard to bring you a wide variety of events so you can find the one that best suits your tastes and interests.</p>
        </div>
        <div className={styles.containerText1}>
          <p>Our platform is also a solution for event organizers who want to increase the visibility and reach of their events. We provide them with an easy-to-use platform to promote their events, sell tickets, and manage everything related to event organization.</p>
        </div>
        <div className={styles.containerText2}>
          <p>At Eventoo, our goal is to make the experience of finding and attending an event as easy, safe, and enjoyable as possible. So why not browse through our selection of events and find your next event to attend? We're sure you'll find something you'll love!</p>
        </div>
      </div>
    </div>
  )
}
  
export default AboutUs