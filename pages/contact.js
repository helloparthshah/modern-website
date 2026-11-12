import React, { useState } from 'react';
import { Form, Container } from 'react-bootstrap';
import PageHeader from '@/components/pageHeader';

export default function ContactForm() {
    const [formData, setFormData] = useState({ name: '', message: '' });
    const email = process.env.CONFIG.email;

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        // Opens the visitor's email app with the message filled in.
        const subject = encodeURIComponent(`Message from ${formData.name}`);
        const body = encodeURIComponent(formData.message);
        window.open(`mailto:${email}?subject=${subject}&body=${body}`);
        setFormData({ name: '', message: '' });
    }

    return (
        <Container className='contact page'>
            <PageHeader
                eyebrow="Contact"
                title="Get in Touch"
                subtitle="Have a question, an idea, or just want to say hi? Send me a message and I'll get back to you."
                center
            />
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
                    <div className='d-flex flex-wrap align-items-center justify-content-between gap-2'>
                        <span className='ps-muted small'>Or email me at <a href={`mailto:${email}`}>{email}</a></span>
                        <button type="submit" className='ps-btn ps-btn-primary'>Send message</button>
                    </div>
                </Form>
            </div>
        </Container>
    );
}
