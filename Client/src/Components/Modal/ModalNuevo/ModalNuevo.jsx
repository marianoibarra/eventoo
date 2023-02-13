import React from 'react'
import Modal from '../Modal'


const ModalNuevo = ({setShowModal}) => {
  return (
    <Modal width={'1000px'} height={'200px'} backgroundColor={'red'} setShowModal={setShowModal}>

      <div onClick={() => setShowModal(false)}>x</div>
      <h2>Este es un nuevo modal de ejemplo</h2>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores non repellat officia accusantium soluta, praesentium nisi nostrum, sapiente ratione aliquam facere deleniti alias reiciendis ex. Iusto illum vitae aut commodi?</p>



    </Modal>
  )
}

export default ModalNuevo