import style from './Faq.module.css';

const Faq = () => {
  return (
    <div className={style.background}>
        <div className={style.body}>
      <h2 className={style.title}>Frequently Asked Questions (FAQ)</h2>
      <ul>
        <li className={style.list}>
          <h3>
            Can I get a refund if I am unable to attend an event after
            purchasing a ticket?
          </h3>
          <p>
            Yes, as per policies and conditions, you have the right to receive a
            refund. You have up to 24 hours before the event to notify your
            absence from the event to our staff email:
            notifications@eventoo.site
          </p>
        </li>
        <li className={style.list}>
          <h3>
            Can I transfer my ticket to someone else if I am unable to attend
            the event?
          </h3>
          <p>
            Only for public events. Entry to public events is allowed only by
            registering the QR code of the ticket, so it doesn't matter if the
            attendee's name doesn't match the name on the ticket. On the other
            hand, for private events, this wouldn't be possible as it is an
            invitation. In that case, please contact the private event organizer
            24 hours before the event.
          </p>
        </li>
        <li className={style.list}>
          <h3>How can I change my Eventoo account information?</h3>
          <p>
            By accessing settings, which is located in the upper right corner of
            your page.
          </p>
        </li>
        <li className={style.list}>
          <h3>How can I purchase tickets for an event on Eventoo?</h3>
          <p>
            By accessing the event details, you will find a section to select
            the number of tickets to purchase, fill in the required information,
            and then you will be provided with the payment details to pay the
            event creator. Once done, you can access your purchases and
            reservations and upload your proof of payment. Now you just need to
            wait for the organizer's approval and your tickets will be sent via
            email.
          </p>
        </li>
        <li className={style.list}>
          <h3>How can I create an event?</h3>
          <p>
            In the create events section, fill in the required information and
            choose the most convenient pack for you and your event! We have
            Mercado Pago in case you choose a Classic or Premium pack.
          </p>
        </li>
      </ul>
      </div>
    </div>
  );
};

export default Faq;
