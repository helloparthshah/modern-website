import React, { useRef, useState } from 'react';
import { Form, Container } from 'react-bootstrap';
import PageHeader from '@/components/pageHeader';
import NotePad from '@/components/notePad';

export default function ContactForm() {
    const [formData, setFormData] = useState({ name: '', message: '' });
    const [status, setStatus] = useState('');
    const note = useRef(null);
    const email = process.env.CONFIG.email;
    const page = process.env.CONFIG.pages?.contact ?? {};

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Email links can't carry attachments, so a handwritten note is copied to the
    // clipboard (or downloaded) for the visitor to paste into the email.
    async function attachNote() {
        if (!note.current || note.current.isEmpty()) return '';
        const blob = await note.current.toBlob();
        try {
            await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
            return 'Your handwritten note is copied. Paste it into the email before sending.';
        } catch (e) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'handwritten-note.png';
            a.click();
            setTimeout(() => URL.revokeObjectURL(url), 1000);
            return 'Your handwritten note was downloaded as handwritten-note.png. Attach it to the email before sending.';
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const noteMessage = await attachNote();
        const subject = encodeURIComponent(`Message from ${formData.name}`);
        const body = encodeURIComponent(formData.message + (noteMessage ? '\n\n[Handwritten note attached]' : ''));
        window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
        setStatus(noteMessage || 'Your email app should open with the message filled in.');
    }

    return (
        <Container className='contact page'>
            <PageHeader eyebrow={page.eyebrow} title={page.title} subtitle={page.subtitle} center />
            <div className='ps-card contact-card'>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formName" className='mb-3'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control className='ps-input' type="text" name="name" placeholder="Your name"
                            value={formData.name} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="formMessage" className='mb-3'>
                        <Form.Label>Message</Form.Label>
                        <Form.Control className='ps-input' as="textarea" rows={5} name="message" placeholder="What's on your mind?"
                            value={formData.message} onChange={handleChange} required />
                    </Form.Group>
                    <div className='mb-3'>
                        <NotePad ref={note} label={page.noteLabel ?? 'Add a handwritten note (optional)'} />
                    </div>
                    <div className='d-flex flex-wrap align-items-center justify-content-between gap-2'>
                        <span className='ps-muted small'>Or email me at <a href={`mailto:${email}`}>{email}</a></span>
                        <button type="submit" className='ps-btn ps-btn-primary'>Send message</button>
                    </div>
                    {status && <p className='ps-muted small mt-3 mb-0' role="status">{status}</p>}
                </Form>
            </div>
        </Container>
    );
}
