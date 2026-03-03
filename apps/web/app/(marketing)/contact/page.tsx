'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', org: '', type: 'Platform Demo', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ paddingTop: '160px', paddingBottom: '80px' }}>
      {/* Hero */}
      <div className="reveal-up" style={{ maxWidth: '600px', margin: '0 auto 80px', textAlign: 'center', padding: '0 48px' }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '20px' }}>
          Contact
        </div>
        <h1 style={{ fontFamily: "'EB Garamond', serif", fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 400, color: 'rgba(255,255,255,0.95)', lineHeight: 1.15, marginBottom: '20px' }}>
          Get in Touch
        </h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
          Whether you&apos;re exploring the platform or have a specific question, we&apos;d like to hear from you.
        </p>
      </div>

      {/* Two-column layout */}
      <div className="reveal-up stagger-1" style={{ maxWidth: '960px', margin: '0 auto', padding: '0 48px', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '32px', alignItems: 'start' }}>
        {/* Left — Form */}
        <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.04)', padding: '48px' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '22px', fontWeight: 400, color: 'rgba(255,255,255,0.9)', marginBottom: '12px' }}>
                Thank you.
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>
                We&apos;ll be in touch shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Full Name */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', padding: '14px 16px', fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.9)', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              {/* Email */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', padding: '14px 16px', fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.9)', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              {/* Organization */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>
                  Organization
                </label>
                <input
                  type="text"
                  value={form.org}
                  onChange={(e) => setForm({ ...form, org: e.target.value })}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', padding: '14px 16px', fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.9)', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              {/* Inquiry Type */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>
                  Inquiry Type
                </label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', padding: '14px 16px', fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.9)', outline: 'none', boxSizing: 'border-box', appearance: 'none' }}
                >
                  <option value="Platform Demo">Platform Demo</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Press">Press</option>
                  <option value="Careers">Careers</option>
                  <option value="General Inquiry">General Inquiry</option>
                </select>
              </div>

              {/* Message */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>
                  Message
                </label>
                <textarea
                  rows={4}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', padding: '14px 16px', fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.9)', outline: 'none', boxSizing: 'border-box', resize: 'vertical' }}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                style={{ width: '100%', fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '3px', textTransform: 'uppercase', background: '#c8b88a', color: '#0a0a0a', padding: '16px', border: 'none', cursor: 'pointer' }}
              >
                Send Message
              </button>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '12px', textAlign: 'center' }}>
                We respond within 48 hours.
              </p>
            </form>
          )}
        </div>

        {/* Right — Contact Info */}
        <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.04)', padding: '40px' }}>
          {[
            { label: 'General', value: 'hello@phantomtreasury.com' },
            { label: 'Press', value: 'press@phantomtreasury.com' },
            { label: 'Careers', value: 'careers@phantomtreasury.com' },
          ].map((item) => (
            <div key={item.label} style={{ marginBottom: '24px' }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '8px' }}>
                {item.label}
              </div>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#c8b88a' }}>
                {item.value}
              </span>
            </div>
          ))}
          <div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '8px' }}>
              Location
            </div>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
              Phantom Treasury operates as a remote-first company.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
