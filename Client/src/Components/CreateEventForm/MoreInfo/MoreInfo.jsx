import { TextField } from '@mui/material';
import style from './MoreInfo.module.css'

function MoreInfo({ input, setInput, loading}) {

    const handleChange = (e) => {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    };

    return (
        <div className={style.info}>
            <h2 className={style.title}>More information</h2>
            <p className={style.text}>Next, you'll have the chance to add detailed content about your event. Use this section to highlight the unique features of your event and provide valuable information to potential attendees.</p>
            <TextField
                label="Description"
                name='large_description'
                multiline
                value={input.large_description}
                rows={8}
                sx={{ m: 1, width: '100%',WebkitTextFillColor: 'var(--dark-text)',borde: 'var(--border-color)',backgroundColor: 'var(--bg-elevation)'}}
                placeholder='Write here...'
                onChange={handleChange}
                margin="dense"
                disabled={loading}
            />
        </div>
    )
};

export default MoreInfo;