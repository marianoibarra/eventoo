import React, { useEffect, useState } from 'react'
import Modal from '../Modal'
import style from './ModalReviews.module.css'
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { Avatar, Divider, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import moment from 'moment';

const ModalReviews = ({ stgData, setConfirm, setShowModal }) => {
    const [value, setValue] = React.useState(4);
    const [randomReviews, setRandomReviews] = useState([]);
    const { eventDetail } = useSelector(state => state.eventDetail);

    const labels = {
        1: 'Useless',
        2: 'Poor',
        3: 'Ok',
        4: 'Good',
        5: 'Excellent',
    };

    const handleClick = (e) => {
        e.preventDefault();
        setShowModal(false);
    };

    return (
        <Modal setShowModal={setShowModal}>
            <div className={style.close}>
                <IconButton
                    onClick={handleClick}
                    aria-label="delete"
                    size="small">
                    <CloseIcon />
                </IconButton>
            </div>
            <div className={style.container}>
                {eventDetail.organizer.reviews && eventDetail.organizer.reviews.length > 0 ? (
                    <div className={style.modalReview}>
                        <div className={style.user}>
                            <h1>{eventDetail.organizer.name}'s reputation</h1>
                            <Typography component="legend"></Typography>
                            <Rating name="half-rating-read" value={eventDetail.organizer.score} precision={0.1} readOnly />
                        </div>
                        {/* <h4>Some reviews from {eventDetail.organizer.name}'s event</h4> */}
                        <div className={style.reviews}>
                            {eventDetail.organizer.reviews.map((review) => (
                                <div key={review.createdAt}>
                                    <div className={style.containerReview}>
                                        <Avatar sx={{
                                            width: '50px',
                                            height: '50px',
                                            maxWidth: 50,
                                            margin: 2,
                                            objectFit: 'cover'
                                        }}>
                                            <img src={review.reviewedBy.profile_pic} />
                                        </Avatar>
                                        <div className={style.reviewInfo}>
                                            <div className={style.nameDate}>
                                                <Typography variant="h6">
                                                    {review.reviewedBy.name} {review.reviewedBy.last_name}
                                                </Typography>
                                                <Typography variant="subtitle2">
                                                    {moment(review.createdAt).calendar() }
                                                </Typography>
                                            </div>
                                            <Rating name="read-only" value={review.stars} readOnly />
                                            <Typography variant="body1">{review.comment}</Typography>
                                        </div>
                                    </div>
                                    <Divider />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className={style.card}>
                        <div className={style.cardTitle}>
                        <h4>There still no reviews for this user</h4>
                        <p>Let's give it a chance!</p>
                        </div>
                    </div>
                )
                }
            </div>
        </Modal>
    )
}

export default ModalReviews;