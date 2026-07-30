'use client';

import React, { useState } from 'react';
import { useShop } from '@/context/ShopContext';
import { mockDb } from '@/lib/db/mock-db';
import { MapPin, Phone, Mail, MessageSquare, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const { showToast } = useShop();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      mockDb.addMessage({
        name,
        email,
        phone,
        subject: subject || 'General Inquiry',
        message,
      });
      showToast('Thank you! Your message has been sent to our Accra team.', 'success');
      setSubmitted(true);
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="glass-panel rounded-3xl p-8 text-center space-y-3 border border-white/90 shadow-md">
        <span className="text-xs uppercase tracking-widest text-amber-700 font-bold">Get In Touch</span>
        <h1 className="font-serif-luxury text-4xl sm:text-5xl font-bold text-stone-900">
          Contact Cosmetics Haven
        </h1>
        <p className="text-stone-600 text-sm max-w-lg mx-auto">
          Have questions about our products, store locations, or wholesale bulk orders in Ghana? We are here to assist!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Form */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 space-y-6 border border-white/90 shadow-xl">
          <h3 className="font-serif-luxury text-2xl font-bold text-stone-900 border-b border-stone-200/60 pb-3">
            Send Us A Message
          </h3>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-amber-700 mx-auto" />
              <h4 className="font-serif-luxury text-xl font-bold text-stone-900">Message Received!</h4>
              <p className="text-xs text-stone-600">
                Our beauty advisors in Accra will get back to you within 2 business hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="gold-gradient-btn px-4 py-2 rounded-xl text-xs font-bold"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/80 border border-stone-200 rounded-xl px-3.5 py-2 text-xs font-medium text-stone-800 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/80 border border-stone-200 rounded-xl px-3.5 py-2 text-xs font-medium text-stone-800 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">Phone / WhatsApp</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white/80 border border-stone-200 rounded-xl px-3.5 py-2 text-xs font-medium text-stone-800 focus:outline-none"
                    placeholder="+233 24 XXX XXXX"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">Subject</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-white/80 border border-stone-200 rounded-xl px-3.5 py-2 text-xs font-medium text-stone-800 focus:outline-none"
                    placeholder="Inquiry subject..."
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700">Message *</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-white/80 border border-stone-200 rounded-xl px-3.5 py-2 text-xs font-medium text-stone-800 focus:outline-none"
                  placeholder="How can we help you today?"
                />
              </div>

              <button
                type="submit"
                className="gold-gradient-btn px-8 py-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md hover:scale-102 transition"
              >
                <Send className="w-4 h-4 text-stone-950" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Info & Google Maps Embed */}
        <div className="lg:col-span-5 space-y-6">
          {/* Store Info Cards */}
          <div className="glass-panel rounded-3xl p-6 space-y-4 border border-white/90 shadow-lg">
            <h3 className="font-serif-luxury text-xl font-bold text-stone-900 border-b border-stone-200/60 pb-3">
              Accra Boutique Details
            </h3>

            <div className="space-y-3 text-xs text-stone-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-stone-900">Oxford Street Flagship</h4>
                  <p className="text-stone-500">Osu Commercial Centre, Accra, Ghana</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-stone-900">East Legon Branch</h4>
                  <p className="text-stone-500">Lagos Avenue, near Mensvic Hotel, Accra</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-700 shrink-0" />
                <div>
                  <span className="font-bold text-stone-900">Direct Line / WhatsApp:</span>
                  <p className="text-amber-900 font-bold">+233 24 456 7890 / +233 30 200 1122</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-amber-700 shrink-0" />
                <div>
                  <span className="font-bold text-stone-900">Opening Hours:</span>
                  <p className="text-stone-500">Mon - Sat: 8:30 AM - 7:30 PM | Sun: 12:00 PM - 5:00 PM</p>
                </div>
              </div>
            </div>

            {/* WhatsApp Quick Trigger */}
            <a
              href="https://wa.me/233244567890"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-700 text-white font-bold py-3 rounded-2xl text-xs flex items-center justify-center gap-2 shadow hover:bg-emerald-800 transition"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat with Beauty Advisor on WhatsApp</span>
            </a>
          </div>

          {/* Interactive Google Map Embed */}
          <div className="glass-panel rounded-3xl p-2 overflow-hidden border border-white/90 shadow-lg aspect-video">
            <iframe
              title="Cosmetics Haven Accra Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.999824641617!2d-0.1804!3d5.556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMzMnMjEuNiJOIDDCsDEwJzE5LjQiVw!5e0!3m2!1sen!2sgh!4v1650000000000!5m2!1sen!2sgh"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '1.25rem' }}
              allowFullScreen={false}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
