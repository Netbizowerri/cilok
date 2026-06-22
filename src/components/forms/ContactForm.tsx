import { useState, type ChangeEvent, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, Loader2, Send } from 'lucide-react';
import { Button } from '../ui';
import { getFormEndpoint } from '../../utils/env';
import { sendToPrivyr } from '../../utils/privyr';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorCode, setErrorCode] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorCode(false);

    const endpoint = getFormEndpoint('CONTACT', 'https://formspree.io/f/xvonzgjo');

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setSuccess(true);
        sendToPrivyr({
          client_name: formData.name,
          phone_number: formData.phone,
          email_address: formData.email,
          additional_client_details: `Subject: ${formData.subject}\nMessage: ${formData.message}`,
          lead_source: 'Cilok Paint - Contact Form'
        });
      } else {
        setErrorCode(true);
      }
    } catch {
      setErrorCode(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="bg-brand-secondary/30 border border-brand-muted rounded-2.5xl p-8 text-center max-w-lg mx-auto">
        <Mail className="w-12 h-12 text-brand-primary mx-auto mb-4 animate-bounce" />
        <h4 className="font-display font-bold text-xl text-white mb-2">Message Dispatched!</h4>
        <p className="text-sm text-text-soft leading-relaxed mb-6">
          Thank you for messaging Cilok Paint. We have securely delivered your inquiry to our administration team. We usually respond within 2-3 hours on business days to all inquiries.
        </p>
        <Button variant="primary" size="sm" onClick={() => setSuccess(false)}>
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-950 p-6 md:p-8 rounded-2xl border border-zinc-800/80 shadow-xl space-y-5">
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-white mb-1.5">Your Name *</label>
        <input 
          type="text" 
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. Architect Frank Olise" 
          className="w-full px-4 py-3 rounded-xl border border-brand-muted focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-sm"
        />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-white mb-1.5">Phone Number *</label>
          <input 
            type="tel" 
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g. 08037046594" 
            className="w-full px-4 py-3 rounded-xl border border-brand-muted focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-white mb-1.5">Email *</label>
          <input 
            type="email" 
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. frank@yahoo.com" 
            className="w-full px-4 py-3 rounded-xl border border-brand-muted focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-white mb-1.5">Inquiry Subject *</label>
        <select
          name="subject"
          required
          value={formData.subject}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-brand-muted focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-sm bg-transparent"
        >
          <option value="General Inquiry">General Product Inquiry</option>
          <option value="Distributorship">Joining the Distributor Network</option>
          <option value="Complaint">Support / Customer Complaint</option>
          <option value="Partnership">B2B Architectural Partnership</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-white mb-1.5">Your Message *</label>
        <textarea 
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="How can Cilok help bring your structural vision to life?" 
          className="w-full px-4 py-3 rounded-xl border border-brand-muted focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-sm"
        />
      </div>

      {errorCode && (
        <p className="text-xs font-semibold text-brand-red">
          Submission failed. Please call us directly via <a href="tel:08037046594" className="underline">08037046594</a>.
        </p>
      )}

      <div>
        <Button 
          id="btn-contact-submit"
          type="submit" 
          variant="primary" 
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Transmitting...
            </>
          ) : (
            <>
              Send Message
              <Send className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
