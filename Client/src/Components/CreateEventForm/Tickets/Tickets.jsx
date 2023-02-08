import ButtonGroup from "../Category/ButtonGroup";
import style from "./Tickets.module.css";

export default function Tickets({ input, setInput, errors, setShowMsg, showMsg }) {
  const handleChanges = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }
    const handleGroupPrice = (e) => {
      setInput({
        ...input,
        isPaid: e.target.name === 'Paid',
      });
    };

    const handleGroupPublic = (e) => {
      setInput({
        ...input,
        isPublic: e.target.name === 'Public',
      });
    };

    return (
      <div className={style.container}>
        <h1 className={style.title}>Tickets</h1>
        <p className={style.text}>
          Please choose if the event will be public or private.
        </p>
        <ButtonGroup
          buttons={["Public", "Private"]}
          handleGroup={handleGroupPublic}
        />
        <p className={style.text}>
          Please choose if the event will be paid or free.
        </p>
        <ButtonGroup buttons={["Paid", "Free"]} handleGroup={handleGroupPrice} />
        
        <h4 className={style.parr}>Capacity:</h4>
        <input
          name="guests_capacity"
          placeholder="Capacity"
          className={style.inputs}
          onChange={handleChanges}
          value={input.guests_capacity}
        />
        <h4 className={style.parr}>Price:</h4>
        <input
          name="price"
          placeholder="Price"
          className={style.inputs}
          onChange={handleChanges}
          value={input.price}
        />
      </div>
    )
  };


