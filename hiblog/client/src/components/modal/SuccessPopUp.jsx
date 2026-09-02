import '../../styles/Modal.css'

function SuccessPopUp({ Title, Message, onClose }) {
  return (
    <section className="popup" role="status" aria-live="polite">
      <h2>{Title}</h2>
      <p>{Message}</p>
      <button type="button" onClick={onClose} style={{ marginTop: '1rem', padding: '.5rem .8rem', border: '2px solid #000', background: '#fff', color: '#000', fontWeight: 700 }}>
        Continue
      </button>
    </section>
  )
}

export default SuccessPopUp
