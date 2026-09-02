import { useState } from 'react'
import '../../styles/Contact.css'

const initialForm = { name: '', email: '', subject: '', message: '' }
function Contact() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('')
  const handleChange = (event) => setForm({ ...form, [event.target.name]: event.target.value })
  const handleSubmit = (event) => { event.preventDefault(); setForm(initialForm); setStatus('Thanks for reaching out! We will get back to you soon.') }
  return <section className="page-card contact-card"><p className="eyebrow">Get in touch</p><h1>Contact</h1><form className="contact-form" onSubmit={handleSubmit}><label>Name<input name="name" value={form.name} onChange={handleChange} required /></label><label>Email<input type="email" name="email" value={form.email} onChange={handleChange} required /></label><label>Subject<input name="subject" value={form.subject} onChange={handleChange} required /></label><label>Message<textarea name="message" value={form.message} onChange={handleChange} rows="6" required /></label><button type="submit">Send message</button>{status && <p className="success-message" role="status">{status}</p>}</form></section>
}
export default Contact
