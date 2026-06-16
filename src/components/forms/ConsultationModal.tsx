import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Loader2, Calendar } from 'lucide-react';
import { Button, Modal } from '../ui';
import { services, products } from '../../data/paintData';
import { getFormEndpoint } from '../../utils/env';

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
        <div className="text-center py-6">
          <Calendar className="w-12 h-12 text-brand-primary mx-auto mb-4 animate-bounce" />
          <h4 className="font-display font-bold text-xl text-brand-dark mb-2">Request Lodged!</h4>
          <p className="text-sm text-text-soft leading-relaxed mb-6">
            Thank you! Your consultation request has been logged successfully. A Cilok Site Estimator will call you on the provided number within 2 business hours.
          </p>
          <Button variant="primary" size="sm" onClick={handleCloseReset}>
            Close Window
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 max-h-[80vh] overflow-y-auto px-1">
          <p className="text-xs text-text-soft">
            Leave your contact details. We will reach out to discuss your structural plan, recommend paint formulas, and estimate costs free of charge.
          </p>
          
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-dark mb-1">Full Name *</label>
            <input 
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Chief Jude Nwoke"
              className="w-full px-3.5 py-2.5 rounded-lg border border-brand-muted focus:border-brand-primary text-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-dark mb-1">Phone Number *</label>
              <input 
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. 08037046594"
                className="w-full px-3.5 py-2.5 rounded-lg border border-brand-muted focus:border-brand-primary text-xs"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-dark mb-1">WhatsApp Number</label>
              <input 
                type="tel"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                placeholder="e.g. 08037046594"
                className="w-full px-3.5 py-2.5 rounded-lg border border-brand-muted focus:border-brand-primary text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-dark mb-1">Property Location (City/State) *</label>
            <input 
              type="text"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Awka, Anambra State"
              className="w-full px-3.5 py-2.5 rounded-lg border border-brand-muted focus:border-brand-primary text-xs"
            />
          </div>

          {/* New Section: Services List Selection */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-dark mb-2">Services Needed</label>
            <div className="grid grid-cols-2 gap-2 max-h-36 overflow-y-auto p-1 border border-brand-muted/40 rounded-lg bg-black/[0.01]">
              {services.map(service => {
                const isSelected = formData.selectedServices.includes(service.name);
                return (
                  <button
                    key={service.slug}
                    type="button"
                    onClick={() => handleServiceToggle(service.name)}
                    className={`flex items-center gap-2 p-2 rounded-lg border text-left transition-all ${
                      isSelected
                        ? 'border-brand-primary bg-brand-primary/5 text-brand-dark'
                        : 'border-brand-muted/70 hover:border-brand-primary/50 text-text-soft bg-white'
                    }`}
                  >
                    <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border text-[9px] font-bold transition-all ${
                      isSelected ? 'bg-brand-primary border-brand-primary text-white' : 'border-brand-muted bg-white'
                    }`}>
                      {isSelected && '✓'}
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-medium leading-none truncate">{service.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* New Section: Products List Selection */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-dark mb-2">Products of Interest</label>
            <div className="grid grid-cols-2 gap-2 max-h-36 overflow-y-auto p-1 border border-brand-muted/40 rounded-lg bg-black/[0.01]">
              {products.map(product => {
                const isSelected = formData.selectedProducts.includes(product.name);
                return (
                  <button
                    key={product.slug}
                    type="button"
                    onClick={() => handleProductToggle(product.name)}
                    className={`flex items-center gap-2 p-2 rounded-lg border text-left transition-all ${
                      isSelected
                        ? 'border-brand-primary bg-brand-primary/5 text-brand-dark'
                        : 'border-brand-muted/70 hover:border-brand-primary/50 text-text-soft bg-white'
                    }`}
                  >
                    <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border text-[9px] font-bold transition-all ${
                      isSelected ? 'bg-brand-primary border-brand-primary text-white' : 'border-brand-muted bg-white'
                    }`}>
                      {isSelected && '✓'}
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-medium leading-none truncate">{product.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-dark mb-1">Additional Project Details *</label>
            <textarea 
              name="description"
              required
              rows={2}
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your wall finishing plans, rooms, or other specific requirements..."
              className="w-full px-3.5 py-2.5 rounded-lg border border-brand-muted focus:border-brand-primary text-xs"
            />
          </div>

          {errorSubmit && (
            <p className="text-[10px] font-bold text-brand-red">
              Transmission error. Call us directly on 08037046594 instead!
            </p>
          )}

          <div className="pt-3 flex gap-3 justify-end border-t border-brand-muted/20">
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
