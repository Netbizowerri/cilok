import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Loader2, Calendar, Check } from 'lucide-react';
import { Button, Modal } from '../ui';
import { services, products } from '../../data/paintData';
import { getFormEndpoint } from '../../utils/env';
import { sendToPrivyr } from '../../utils/privyr';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    whatsapp: '',
    location: '',
    description: '',
    selectedServices: [] as string[],
    selectedProducts: [] as string[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleServiceToggle = (name: string) => {
    setFormData(prev => {
      const selected = prev.selectedServices.includes(name)
        ? prev.selectedServices.filter(s => s !== name)
        : [...prev.selectedServices, name];
      return { ...prev, selectedServices: selected };
    });
  };

  const handleProductToggle = (name: string) => {
    setFormData(prev => {
      const selected = prev.selectedProducts.includes(name)
        ? prev.selectedProducts.filter(p => p !== name)
        : [...prev.selectedProducts, name];
      return { ...prev, selectedProducts: selected };
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorSubmit(false);

    const endpoint = getFormEndpoint('CONSULTATION', 'https://formspree.io/f/xvonzgjo');

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
          email_address: formData.whatsapp,
          additional_client_details: `Location: ${formData.location}\nServices: ${formData.selectedServices.join(', ')}\nProducts: ${formData.selectedProducts.join(', ')}\nDescription: ${formData.description}`,
          lead_source: 'Cilok Paint - Consultation Form'
        });
      } else {
        setErrorSubmit(true);
      }
    } catch {
      setErrorSubmit(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseReset = () => {
    setFormData({
      name: '',
      phone: '',
      whatsapp: '',
      location: '',
      description: '',
      selectedServices: [],
      selectedProducts: []
    });
    setSuccess(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCloseReset} title="Request a Free Consultation">
      {success ? (
        <div className="text-center py-8 px-4 bg-zinc-950 rounded-2xl border border-zinc-800/80">
          <div className="w-14 h-14 rounded-full bg-brand-primary/10 flex items-center justify-center mx-auto mb-5">
            <Calendar className="w-7 h-7 text-brand-primary" />
          </div>
          <h4 className="font-display font-bold text-xl text-white mb-2">Request Lodged!</h4>
          <p className="text-sm text-text-soft leading-relaxed mb-6 max-w-xs mx-auto">
            Thank you! Your consultation request has been logged successfully. A Cilok Site Estimator will call you on the provided number within 2 business hours.
          </p>
          <Button variant="primary" size="sm" onClick={handleCloseReset}>
            Close Window
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5 max-h-[80vh] overflow-y-auto px-1">
          <p className="text-xs text-text-soft leading-relaxed">
            Leave your contact details. We will reach out to discuss your structural plan, recommend paint formulas, and estimate costs free of charge.
          </p>

          <div className="space-y-4">
            <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800/60">
              <h5 className="text-[10px] font-bold uppercase tracking-wider text-brand-primary mb-3">Contact Information</h5>
              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Chief Jude Nwoke"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-700/80 bg-brand-dark text-white text-xs placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:border-brand-primary transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. 08037046594"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-700/80 bg-brand-dark text-white text-xs placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:border-brand-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">WhatsApp Number</label>
                    <input
                      type="tel"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      placeholder="e.g. 08037046594"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-700/80 bg-brand-dark text-white text-xs placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:border-brand-primary transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Property Location (City/State) *</label>
                  <input
                    type="text"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Awka, Anambra State"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-700/80 bg-brand-dark text-white text-xs placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:border-brand-primary transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800/60">
              <h5 className="text-[10px] font-bold uppercase tracking-wider text-brand-primary mb-3">Services Needed</h5>
              <div className="flex flex-wrap gap-2">
                {services.map(service => {
                  const isSelected = formData.selectedServices.includes(service.name);
                  return (
                    <button
                      key={service.slug}
                      type="button"
                      onClick={() => handleServiceToggle(service.name)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] sm:text-[11px] font-medium border transition-all ${
                        isSelected
                          ? 'bg-brand-primary/10 border-brand-primary/50 text-white'
                          : 'bg-zinc-900 border-zinc-700/60 text-zinc-400 hover:border-zinc-600 hover:text-zinc-300'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 text-brand-primary" />}
                      {service.name}
                    </button>
                  );
                })}
              </div>
              {formData.selectedServices.length > 0 && (
                <p className="text-[10px] text-brand-primary/70 mt-2">
                  {formData.selectedServices.length} service{formData.selectedServices.length > 1 ? 's' : ''} selected
                </p>
              )}
            </div>

            <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800/60">
              <h5 className="text-[10px] font-bold uppercase tracking-wider text-brand-primary mb-3">Products of Interest</h5>
              <div className="flex flex-wrap gap-2">
                {products.map(product => {
                  const isSelected = formData.selectedProducts.includes(product.name);
                  return (
                    <button
                      key={product.slug}
                      type="button"
                      onClick={() => handleProductToggle(product.name)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] sm:text-[11px] font-medium border transition-all ${
                        isSelected
                          ? 'bg-brand-primary/10 border-brand-primary/50 text-white'
                          : 'bg-zinc-900 border-zinc-700/60 text-zinc-400 hover:border-zinc-600 hover:text-zinc-300'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 text-brand-primary" />}
                      {product.name}
                    </button>
                  );
                })}
              </div>
              {formData.selectedProducts.length > 0 && (
                <p className="text-[10px] text-brand-primary/70 mt-2">
                  {formData.selectedProducts.length} product{formData.selectedProducts.length > 1 ? 's' : ''} selected
                </p>
              )}
            </div>

            <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800/60">
              <h5 className="text-[10px] font-bold uppercase tracking-wider text-brand-primary mb-3">Project Details</h5>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Additional Details *</label>
                <textarea
                  name="description"
                  required
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your wall finishing plans, rooms, or other specific requirements..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-700/80 bg-brand-dark text-white text-xs placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:border-brand-primary transition-all resize-none"
                />
              </div>
            </div>
          </div>

          {errorSubmit && (
            <p className="text-[10px] font-bold text-brand-red flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
              Transmission error. Call us directly on 08037046594 instead!
            </p>
          )}

          <div className="pt-3 flex gap-3 justify-end border-t border-zinc-800/60">
            <Button type="button" variant="ghost" size="sm" onClick={handleCloseReset}>
              Cancel
            </Button>
            <Button type="submit" variant="accent" size="sm" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                  Booking...
                </>
              ) : (
                'Request Free Quote'
              )}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
