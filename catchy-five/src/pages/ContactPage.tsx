import React, { useState } from 'react';

const ContactPage: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thanks for contacting us!');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="container py-4" style={{ maxWidth: '900px' }}>
      {/* Heading */}
      <div className="text-center mb-5">
        <h2 style={{ color: '#4CAF50', fontWeight: 700 }}>Contact Us</h2>
        <p className="text-muted fs-5">
          We’d love to hear from you. Fill out the form or reach out through our contact info.
        </p>
      </div>

      {/* Contact Form */}
      <div className="row justify-content-center mb-4">
        <div className="col-12">
          <div className="card shadow-sm border-0 p-4 p-md-4">
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-12">
                  <textarea
                    name="message"
                    rows={5}
                    className="form-control"
                    placeholder="Your Message"
                    value={form.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <div className="col-12 text-end">
                  <button
                    type="submit"
                    className="btn px-4 py-2 fw-semibold"
                    style={{
                      backgroundColor: '#4CAF50',
                      color: '#fff',
                      borderRadius: '6px',
                      textTransform: 'none',
                      transition: 'background-color 0.3s ease',
                    }}
                    onMouseOver={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#388e3c';
                    }}
                    onMouseOut={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#4CAF50';
                    }}
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Contact Info Row */}
      <div className="row text-center">
        <div className="col-md-4 mb-4 mb-md-0">
          <i className="bi bi-geo-alt-fill fs-3 mb-2" style={{ color: '#4CAF50' }}></i>
          <h6 className="fw-bold">Address</h6>
          <p className="text-muted mb-0">
            123 Green Street,<br />
            Organic Town,<br />
            Nature City, 560001
          </p>
        </div>
        <div className="col-md-4 mb-4 mb-md-0">
          <i className="bi bi-telephone-fill fs-3 mb-2" style={{ color: '#4CAF50' }}></i>
          <h6 className="fw-bold">Phone</h6>
          <p className="text-muted mb-0">+91 98765 43210</p>
        </div>
        <div className="col-md-4">
          <i className="bi bi-envelope-fill fs-3 mb-2" style={{ color: '#4CAF50' }}></i>
          <h6 className="fw-bold">Email</h6>
          <p className="text-muted mb-0">support@organicmart.com</p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
