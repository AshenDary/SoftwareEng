import '../../styles/Modal.css'

function ConfirmPopUp({ title = 'Please confirm', message, confirmText = 'Confirm', cancelText = 'Cancel', onConfirm, onCancel }) {
  return (
    <div className="modal-backdrop" role="presentation">
      <section className="modal-panel" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
        <h2 id="confirm-title">{title}</h2>
        <p>{message}</p>
        <div className="modal-actions">
          <button type="button" className="button-secondary" onClick={onCancel}>{cancelText}</button>
          <button type="button" className="button-primary" onClick={onConfirm}>{confirmText}</button>
        </div>
      </section>
    </div>
  )
}

export default ConfirmPopUp
