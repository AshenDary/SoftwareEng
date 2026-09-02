import '../../styles/Modal.css'

function FailedPopUp({ Title, Message }) {
  return <section className="popup" role="alert"><h2>{Title}</h2><p>{Message}</p></section>
}

export default FailedPopUp
