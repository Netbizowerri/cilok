import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Info, ArrowRight, Loader2, PartyPopper } from 'lucide-react';
import { Button } from '../ui';
import { products } from '../../data/paintData';
import { getFormEndpoint } from '../../utils/env';
import { sendToPrivyr } from '../../utils/privyr';

export function ProductOrderForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    whatsapp: '',
    sameAsPhone: false,
    email: '',
    stateLocation: '',
    deliveryAddress: '',
    nearestDistributor: 'Factory Direct',
    selectedProducts: [] as string[],
    quantities: {} as Record<string, string>,
    surfaceArea: '',
    preferredFinish: 'Matt',
    surfaceType: 'Interior Wall',
    deliveryDate: '',
    needApplication: 'No',
    specialNotes: '',
    referral: 'Google'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const statesOfNigeria = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT - Abuja', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
  ];

  const handleTextChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      if (name === 'phone' && prev.sameAsPhone) {
        updated.whatsapp = value;
      }
      return updated;
    });
  };

  const handleSameAsPhoneToggle = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setFormData(prev => ({
      ...prev,
      sameAsPhone: checked,
      whatsapp: checked ? prev.phone : prev.whatsapp
    }));
  };

  const handleProductToggle = (slug: string) => {
    setFormData(prev => {
      const alreadySelected = prev.selectedProducts.includes(slug);
      const selected = alreadySelected 
        ? prev.selectedProducts.filter(s => s !== slug)
        : [...prev.selectedProducts, slug];
      
      const newQuantities = { ...prev.quantities };
      if (alreadySelected) {
        delete newQuantities[slug];
      } else {
        newQuantities[slug] = '1 bucket';
      }

      return {
        ...prev,
        selectedProducts: selected,
        quantities: newQuantities
      };
    });
  };

  const handleQuantityChange = (slug: string, val: string) => {
    setFormData(prev => ({
      ...prev,
      quantities: {
        ...prev.quantities,
        [slug]: val
      }
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (formData.selectedProducts.length === 0) {
      alert('Please select at least one paint product.');
      return;
    }

    setIsSubmitting(true);
    
    // Extract Formspree endpoint from env or fallback to a demo endpoint so the user never sees broken actions
    const endpoint = getFormEndpoint('PRODUCT_ORDER', 'https://formspree.io/f/xvonzgjo');

    try {
      const submissionData = {
        ...formData,
        calculatedProductsSummary: formData.selectedProducts.map(slug => `${slug}: ${formData.quantities[slug]}`).join(', ')
      };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(submissionData)
      });

      if (response.ok) {
        setSubmitStatus('success');
        const productsSummary = formData.selectedProducts.map(slug => `${slug}: ${formData.quantities[slug]}`).join(', ');
        sendToPrivyr({
          client_name: formData.fullName,
          phone_number: formData.phone,
          email_address: formData.email,
          additional_client_details: `WhatsApp: ${formData.whatsapp}\nState: ${formData.stateLocation}\nDelivery: ${formData.deliveryAddress}\nProducts: ${productsSummary}\nSurface: ${formData.surfaceArea} sqm\nFinish: ${formData.preferredFinish}\nDelivery Date: ${formData.deliveryDate}\nNotes: ${formData.specialNotes}`,
          lead_source: 'Cilok Paint - Product Order Form'
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-zinc-950 rounded-2xl p-8 md:p-12 border border-zinc-800/80 shadow-2xl text-center max-w-2xl mx-auto my-12"
      >
        <div className="w-20 h-20 bg-brand-secondary rounded-full flex items-center justify-center mx-auto mb-6 text-brand-primary">
          <PartyPopper className="w-10 h-10 text-brand-accent animate-bounce" />
        </div>
        <h3 className="font-display font-bold text-3xl text-white mb-4">Order Received!</h3>
        <p className="text-text-soft text-base md:text-lg leading-relaxed mb-8">
          Thank you for choosing Cilok Paint. We have successfully recorded your details. A dedicated product specialist from our factory or your nearest distributor zone will contact you within 24 hours to confirm shipping details and payment terms.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="primary" size="md" onClick={() => navigate('/')}>
            Back to Homepage
          </Button>
          <Button variant="secondary" size="md" onClick={() => navigate('/services')}>
            Explore Application Services
          </Button>
        </div>
      </motion.div>
    );
  }

  // Get minimum delivery date (3 days from today)
  const getMinDeliveryDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 3);
    return today.toISOString().split('T')[0];
  };

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-950 rounded-2xl p-6 md:p-10 border border-zinc-800/80 shadow-2xl space-y-8 max-w-4xl mx-auto">
      
      {/* SECTION 1: Personal Coordinates */}
      <div>
        <h3 className="text-xl font-display font-medium text-white mb-4 pb-2 border-b border-brand-muted/40">
          1. Contact Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white mb-1.5">Full Name *</label>
            <input 
              type="text" 
              name="fullName"
              required 
              value={formData.fullName}
              onChange={handleTextChange}
              placeholder="e.g. Chief Emeka Nwajagu" 
              className="w-full px-4 py-3 rounded-xl border border-brand-muted focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white mb-1.5">Email Address *</label>
            <input 
              type="email" 
              name="email"
              required 
              value={formData.email}
              onChange={handleTextChange}
              placeholder="e.g. emeka@gmail.com" 
              className="w-full px-4 py-3 rounded-xl border border-brand-muted focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white mb-1.5">Phone Number *</label>
            <input 
              type="tel" 
              name="phone"
              required 
              value={formData.phone}
              onChange={handleTextChange}
              placeholder="e.g. 08037046594" 
              className="w-full px-4 py-3 rounded-xl border border-brand-muted focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-sm"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-white">WhatsApp Number</label>
              <label className="flex items-center gap-1.5 text-xs text-brand-primary font-semibold select-none cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={formData.sameAsPhone}
                  onChange={handleSameAsPhoneToggle}
                  className="rounded border-brand-muted text-brand-primary focus:ring-brand-primary"
                />
                Same as Phone
              </label>
            </div>
            <input 
              type="tel" 
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleTextChange}
              disabled={formData.sameAsPhone}
              placeholder="e.g. 08037046594" 
              className="w-full px-4 py-3 rounded-xl border border-brand-muted bg-brand-surface disabled:opacity-75 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-sm"
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: Destination Coordinate */}
      <div>
        <h3 className="text-xl font-display font-medium text-white mb-4 pb-2 border-b border-brand-muted/40">
          2. Shipping & Delivery
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white mb-1.5">State of Delivery *</label>
            <select
              name="stateLocation"
              required
              value={formData.stateLocation}
              onChange={handleTextChange}
              className="w-full px-4 py-3 rounded-xl border border-brand-muted focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-sm bg-transparent"
            >
              <option value="">Select State</option>
              {statesOfNigeria.map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white mb-1.5">Nearest Distributor Zone</label>
            <select
              name="nearestDistributor"
              value={formData.nearestDistributor}
              onChange={handleTextChange}
              className="w-full px-4 py-3 rounded-xl border border-brand-muted focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-sm bg-transparent"
            >
              <option value="Factory Direct">Factory Direct (Nkpor-Onitsha)</option>
              <option value="Awka">Awka Distributor Outlet</option>
              <option value="Enugu">Enugu Distributor Outlet</option>
              <option value="Port Harcourt">Port Harcourt Outlet</option>
              <option value="Abuja">Abuja Distributor Outlet</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-white mb-1.5">Detailed Delivery Address *</label>
            <textarea 
              name="deliveryAddress"
              required
              rows={3}
              value={formData.deliveryAddress}
              onChange={handleTextChange}
              placeholder="e.g. Plot 15, Udoka Housing Estate, Awka, Anambra State" 
              className="w-full px-4 py-3 rounded-xl border border-brand-muted focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-sm"
            />
          </div>
        </div>
      </div>

      {/* SECTION 3: Product Checkboxes and quantities */}
      <div>
        <h3 className="text-xl font-display font-medium text-white mb-1 pb-2">
          3. Paint & Material Selection
        </h3>
        <p className="text-xs text-text-soft mb-4">Please tick all paint options you require. Quantities can be adjusted below as they are checked.</p>
        
        {/* Product selection grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {products.map((prod) => {
            const isSelected = formData.selectedProducts.includes(prod.slug);
            return (
              <div 
                key={prod.slug}
                onClick={() => handleProductToggle(prod.slug)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer select-none flex items-start gap-3 ${
                  isSelected 
                    ? 'border-brand-primary bg-brand-secondary/20 shadow-md' 
                    : 'border-brand-muted hover:border-brand-primary/55'
                }`}
              >
                <div className={`w-5 h-5 rounded flex items-center justify-center mt-0.5 border ${
                  isSelected ? 'bg-brand-primary border-brand-primary text-white' : 'border-brand-muted text-transparent'
                }`}>
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-sm text-white">{prod.name}</h4>
                    <span className="text-[10px] bg-brand-muted/40 font-bold px-1.5 py-0.5 rounded text-brand-primary shrink-0">{prod.badge}</span>
                  </div>
                  <p className="text-xs text-text-soft mt-1 leading-normal line-clamp-2">{prod.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quantities for selected products */}
        <AnimatePresence>
          {formData.selectedProducts.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-brand-secondary/25 border border-brand-muted rounded-2.5xl p-5 md:p-6 mt-6 space-y-4 overflow-hidden"
            >
              <h4 className="font-display font-semibold text-xs uppercase tracking-wider text-brand-primary flex items-center gap-2">
                <Info className="w-4 h-4 text-brand-accent" /> Specify Quantities Needed
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {formData.selectedProducts.map((slug) => {
                  const prod = products.find(p => p.slug === slug);
                  if (!prod) return null;
                  return (
                    <motion.div 
                      key={slug}
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="bg-zinc-900 p-3 rounded-xl border border-zinc-800 flex items-center justify-between gap-3"
                    >
                      <span className="font-semibold text-xs text-white">{prod.name}</span>
                      <input 
                        type="text"
                        required
                        value={formData.quantities[slug] || ''}
                        onChange={(e) => handleQuantityChange(slug, e.target.value)}
                        placeholder="e.g. 10 Buckets"
                        className="px-3 py-1.5 border border-brand-muted rounded-lg focus:outline-none focus:border-brand-primary text-xs font-bold w-32 text-right"
                      />
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* SECTION 4: Application Parameters */}
      <div>
        <h3 className="text-xl font-display font-medium text-white mb-4 pb-2 border-b border-brand-muted/40">
          4. Surface Details & Timing
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white mb-1.5">Surface Area Size (sqm Estimate)</label>
            <input 
              type="number" 
              name="surfaceArea"
              value={formData.surfaceArea}
              onChange={handleTextChange}
              placeholder="e.g. 250" 
              className="w-full px-4 py-3 rounded-xl border border-brand-muted focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white mb-1.5">Preferred Delivery Date *</label>
            <input 
              type="date" 
              name="deliveryDate"
              required
              min={getMinDeliveryDate()}
              value={formData.deliveryDate}
              onChange={handleTextChange}
              className="w-full px-4 py-3 rounded-xl border border-brand-muted focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white mb-1.5">Preferred Paint Finish</label>
            <select
              name="preferredFinish"
              value={formData.preferredFinish}
              onChange={handleTextChange}
              className="w-full px-4 py-3 rounded-xl border border-brand-muted focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-sm bg-transparent"
            >
              <option value="Matt">Matt Finish (Flat)</option>
              <option value="Silk">Silk Finish (Lustrous Sheen)</option>
              <option value="Gloss">Gloss Finish (Oil-based Mirror)</option>
              <option value="Textured">Textured Rough (Texcoat)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white mb-1.5">Wall Substrate Type</label>
            <select
              name="surfaceType"
              value={formData.surfaceType}
              onChange={handleTextChange}
              className="w-full px-4 py-3 rounded-xl border border-brand-muted focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-sm bg-transparent"
            >
              <option value="Interior Wall">Interior Rooms and Salons</option>
              <option value="Exterior Wall">Exterior Facades & Columns</option>
              <option value="Ceiling">Ceiling / POP Boardings</option>
              <option value="Floor">Floor Skirtings</option>
            </select>
          </div>
          
          <div className="md:col-span-2 bg-brand-surface p-4 rounded-2xl border border-brand-muted/70 flex items-center justify-between gap-4">
            <div>
              <h4 className="font-semibold text-sm text-white">Do you require our professional crews for application?</h4>
              <p className="text-xs text-text-soft">Choosing yes guarantees our expert screeding and paint coatings on site.</p>
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 font-bold text-xs text-white select-none cursor-pointer">
                <input 
                  type="radio" 
                  name="needApplication" 
                  value="Yes"
                  checked={formData.needApplication === 'Yes'}
                  onChange={handleTextChange}
                  className="text-brand-primary focus:ring-brand-primary" 
                />
                Yes
              </label>
              <label className="flex items-center gap-2 font-bold text-xs text-white select-none cursor-pointer">
                <input 
                  type="radio" 
                  name="needApplication" 
                  value="No"
                  checked={formData.needApplication === 'No'}
                  onChange={handleTextChange}
                  className="text-brand-primary focus:ring-brand-primary" 
                />
                No
              </label>
            </div>
          </div>
          
          {formData.needApplication === 'Yes' && (
            <div className="md:col-span-2 text-xs bg-brand-secondary/30 p-3 rounded-xl text-brand-primary font-medium flex items-center gap-2">
              <Info className="w-4 h-4 shrink-0 text-brand-accent" />
              <span>Great choice! A service booking will be generated for you, and we will cross-reference this inside our database.</span>
            </div>
          )}
        </div>
      </div>

      {/* SECTION 5: Special details */}
      <div>
        <h3 className="text-xl font-display font-medium text-white mb-4 pb-2 border-b border-brand-muted/40">
          5. Final Details
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white mb-1.5">Special Requirements / Custom Color Requests</label>
            <textarea 
              name="specialNotes"
              rows={3}
              value={formData.specialNotes}
              onChange={handleTextChange}
              placeholder="e.g. We require custom pastel blue colors for our Holy Trinity Cathedral chapel hall." 
              className="w-full px-4 py-3 rounded-xl border border-brand-muted focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white mb-1.5">How did you hear about Cilok Paint?</label>
            <select
              name="referral"
              value={formData.referral}
              onChange={handleTextChange}
              className="w-full px-4 py-3 rounded-xl border border-brand-muted focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-sm bg-transparent"
            >
              <option value="Google">Google / Web Search</option>
              <option value="Referral">Contractor / Painter Recommendation</option>
              <option value="Social Media">Social Media</option>
              <option value="Distributor">At a physical Distributor Store</option>
              <option value="Signage">Limca Road Factory Signage</option>
            </select>
          </div>
        </div>
      </div>

      {/* Form Error Notification */}
      {submitStatus === 'error' && (
        <div className="bg-brand-red/10 border border-brand-red/20 text-brand-red text-sm p-4 rounded-xl font-medium">
          Something went wrong with the submission. Please check your internet connection, or call us directly at <a href="tel:08037046594" className="underline font-bold">08037046594</a> to complete your order manually.
        </div>
      )}

      {/* SUBMIT ROW */}
      <div className="flex items-center justify-end gap-4 pt-4 border-t border-brand-muted/30">
        <Button 
          id="btn-product-order-submit"
          type="submit" 
          variant="primary" 
          size="lg"
          disabled={isSubmitting}
          className="w-full sm:w-auto"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin animate-infinite" />
              Processing Order...
            </>
          ) : (
            <>
              Submit Paint Purchase Order
              <ArrowRight className="w-5 h-5 ml-2" />
            </>
          )}
        </Button>
      </div>

    </form>
  );
}
