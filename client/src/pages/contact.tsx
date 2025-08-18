
import React, { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '89898e63-5279-4f4f-a15a-da1e2e1b2d63',
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `New contact from ${formData.name} via coreywu.com`
        })
      });

      const result = await response.json();
      
      if (result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        
        // Track form submission
        if (window.gtag) {
          window.gtag('event', 'contact_form_submission', {
            contact_method: 'web3forms',
            form_name: 'contact_page',
            event_category: 'contact',
            event_label: 'Contact form completed'
          });
        }
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <header className="text-center mb-8 pt-4">
        <h1 className="text-3xl font-light text-warm-brown mb-4">
          Get in Touch
        </h1>
        <p className="text-muted-grey leading-relaxed">
          I'd love to hear from you. Whether you have a question, want to collaborate, 
          or just want to say hello, feel free to reach out.
        </p>
      </header>

      <div className="bg-white rounded-xl shadow-sm border border-warm-brown/10 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-warm-brown mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-cream/50 border border-warm-brown/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-brown/50 focus:border-transparent text-soft-black"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-warm-brown mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-cream/50 border border-warm-brown/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-brown/50 focus:border-transparent text-soft-black"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-warm-brown mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-3 bg-cream/50 border border-warm-brown/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-brown/50 focus:border-transparent text-soft-black resize-none"
              placeholder="Tell me about your project, idea, or just say hello..."
            />
          </div>

          {submitStatus === 'success' && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 text-sm">
                Thank you! Your message has been sent successfully. I'll get back to you soon.
              </p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm">
                Sorry, there was an error sending your message. Please try again or email me directly at{' '}
                <a href="mailto:coreydavidwu@gmail.com" className="underline">
                  coreydavidwu@gmail.com
                </a>
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-warm-brown text-cream px-6 py-3 rounded-lg hover:bg-hover-brown transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-warm-brown/10">
          <p className="text-sm text-muted-grey text-center">
            Or reach out directly at{' '}
            <a
              href="mailto:coreydavidwu@gmail.com"
              className="text-warm-brown hover:text-hover-brown transition-colors duration-200 underline"
              onClick={() => window.trackEmailClick && window.trackEmailClick('contact')}
            >
              coreydavidwu@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
