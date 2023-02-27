import React from "react";
import styles from "./Pending.module.css";
import Voucher from "./Voucher/Voucher";

const Pending = ({
  transaction
}) => {
  const totalPrice = transaction.event.price * transaction.tickets.length

  return (
  <>
    <div className={styles.container}>
      <h2> Total {totalPrice}</h2>
      <h2> Total Ticket {transaction.tickets.length}</h2>
      </div>
      <div>
      <Voucher
        transaction={transaction.id}
        eventId={transaction.event.div}
      />
      </div>
    </>
  );
};

export default Pending;


// {
//     "id": "4c7ad8e8-93d2-4f4b-901b-e539bc84c109",
//     "status": "PENDING",
//     "expiration_date": "2023-02-24T15:29:03.004Z",
//     "payment_proof": null,
//     "createdAt": "2023-02-24T15:14:03.084Z",
//     "updatedAt": "2023-02-24T15:14:03.568Z",
//     "buyerId": 97,
//     "eventId": "3dc48b70-2c06-4096-860a-162a51d02cf8",
//     "tickets": [
//         {
//             "id": 339,
//             "name": "lu",
//             "email": "lucia@gmail.com",
//             "last_name": "pou",
//             "createdAt": "2023-02-24T15:14:03.405Z",
//             "updatedAt": "2023-02-24T15:14:03.405Z",
//             "transactionId": "4c7ad8e8-93d2-4f4b-901b-e539bc84c109"
//         }
//     ],
//     "event": {
//         "id": "3dc48b70-2c06-4096-860a-162a51d02cf8",
//         "name": "fiesta",
//         "description": "Fiesta en el barrio",
//         "large_description": null,
//         "start_date": "2023-02-10",
//         "end_date": "2023-02-12",
//         "start_time": "12:48:00",
//         "end_time": "21:50:00",
//         "isPublic": true,
//         "privateEvent_password": null,
//         "virtualURL": "",
//         "isPremium": null,
//         "isPaid": true,
//         "age_range": "ALL PUBLIC",
//         "price": 500,
//         "guests_capacity": "2500",
//         "stock_ticket": "2501",
//         "placeName": null,
//         "advertisingTime_start": null,
//         "adversiting_end": null,
//         "cover_pic": "https://drive.google.com/uc?export=view&id=1iL1QUjyKu_XOyf2-YQ5uig8F6XosZW7s",
//         "disability_access": null,
//         "parking": null,
//         "smoking_zone": null,
//         "pet_friendly": null,
//         "isToday": false,
//         "isNextWeekend": false,
//         "isActive": true,
//         "createdAt": "2023-02-07T22:52:05.429Z",
//         "updatedAt": "2023-02-24T15:14:03.648Z",
//         "organizerId": null,
//         "categoryId": 10,
//         "bankAccountId": null,
//         "addressId": 122,
//         "paymentId": null,
//         "bankAccount": null,
//         "address": {
//             "address_line": "Av. del Libertador 5496",
//             "city": "Buenos Aires",
//             "state": "Buenos Aires",
//             "country": "Argentina",
//             "zip_code": "C1425"
//         },
//         "organizer": null,
//         "category": {
//             "name": "Birthday celebration",
//             "modality": "Presential"
//         }
//     }
// }