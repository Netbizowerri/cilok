import { useState, useRef, type ChangeEvent, type DragEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Info, Loader2, Upload, PartyPopper, Trash2 } from 'lucide-react';
import { Button } from '../ui';
import { services, products } from '../../data/paintData';
import { getFormEndpoint } from '../../utils/env';
import { sendToPrivyr } from '../../utils/privyr';

export function ServiceBookingForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    whatsapp: '',
    email: '',
    propertyAddress: '',
    propertyType: 'Residential',
    selectedServices: [] as string[],
    surfaceArea: '',
    roomsFloors: '',
    wallCondition: 'New Build',
    startDate: '',
    durationEstimate: 'Unsure',
    supplyPaint: 'No', // "No" means Cilok Supplies
    preferredPaints: [] as string[],
    budgetRange: 'To be discussed',
    notes: '',
    referral: 'Google'
  });

  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: string; preview: string }[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTextChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceToggle = (slug: string) => {
    setFormData(prev => {
      const selected = prev.selectedServices.includes(slug)
        ? prev.selectedServices.filter(s => s !== slug)
        : [...prev.selectedServices, slug];
      return { ...prev, selectedServices: selected };
    });
  };

  const handlePaintToggle = (slug: string) => {
    setFormData(prev => {
      const selected = prev.preferredPaints.includes(slug)
        ? prev.preferredPaints.filter(p => p !== slug)
        : [...prev.preferredPaints, slug];
      return { ...prev, preferredPaints: selected };
    });
  };

  // DRAG AND DROP FILE UPLOAD HANDLERS
  const handleDrag = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const processFiles = (files: FileList) => {
    const list = Array.from(files).slice(0, 5); // Max 5 files
    const newFiles = list.map(f => ({
      name: f.name,
      size: (f.size / (1024 * 1024)).toFixed(2) + ' MB',
      preview: URL.createObjectURL(f)
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFiles(e.target.files);
    }
  };

  const removeFile = (idx: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (formData.selectedServices.length === 0) {
      alert('Please select at least one wall finishing service.');
      return;
    }

    setIsSubmitting(true);
    
    // Fallback to active demo Formspree ID
    const endpoint = getFormEndpoint('SERVICE_BOOKING', 'https://formspree.io/f/xvonzgjo');

    try {
      const bodyPayload = {
        ...formData,
        servicesSummary: formData.selectedServices.join(', '),
        paintsSummary: formData.supplyPaint === 'No' ? formData.preferredPaints.join(', ') : 'Customer Supplies Own Paint',
        attachedImageCount: uploadedFiles.length
      };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(bodyPayload)
      });

      if (res.ok) {
        setSubmitStatus('success');
        const servicesSummary = formData.selectedServices.join(', ');
        const paintsSummary = formData.supplyPaint === 'No' ? formData.preferredPaints.join(', ') : 'Customer Supplies Own Paint';
        sendToPrivyr({
          client_name: formData.fullName,
          phone_number: formData.phone,
          email_address: formData.email,
          additional_client_details: `WhatsApp: ${formData.whatsapp}\nProperty: ${formData.propertyAddress}\nType: ${formData.propertyType}\nServices: ${servicesSummary}\nSurface: ${formData.surfaceArea} sqm\nRooms: ${formData.roomsFloors}\nWall Condition: ${formData.wallCondition}\nPaints: ${paintsSummary}\nStart: ${formData.startDate}\nDuration: ${formData.durationEstimate}\nBudget: ${formData.budgetRange}\nNotes: ${formData.notes}`,
          lead_source: 'Cilok Paint - Service Booking Form'
        });
      } else {
        setSubmitStatus('error');
      }
    } catch {
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
        <h3 className="font-display font-bold text-3xl text-white mb-4">Service Booking Secured!</h3>
        <p className="text-text-soft text-base md:text-lg leading-relaxed mb-8">
          Your request to book our application specialists has been received. Our chief sites engineer will review your dimensions and photos, and call you shortly to confirm the scheduled site visit date. Get ready to redefine your walls!
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="primary" size="md" onClick={() => navigate('/')}>
            Return to Home
          </Button>
          <Button variant="secondary" size="md" onClick={() => navigate('/projects')}>
            Browse Past Projects
          </Button>
        </div>
      </motion.div>
    );
  }

  // Get minimum start date (5 days from today)
  const getMinStartDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 5);
    return today.toISOString().split('T')[0];
  };

  const containsScreeding = formData.selectedServices.includes('wall-screeding');
  const containsPremium = formData.selectedServices.includes('crackos-effect') || formData.selectedServices.includes('ottochinto');

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-950 rounded-2xl p-6 md:p-10 border border-zinc-800/80 shadow-2xl space-y-8 max-w-4xl mx-auto">
      
      {/* SECTION 1: Personal Coordinates */}
      <div>
        <h3 className="text-xl font-display font-medium text-white mb-4 pb-2 border-b border-brand-muted/40">
          1. Customer Identity & Reach
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
              placeholder="e.g. Chief Jude Nwoke" 
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
              placeholder="e.g. jude@modenigeria.com" 
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
              placeholder="e.g. 08039556430" 
              className="w-full px-4 py-3 rounded-xl border border-brand-muted focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white mb-1.5">WhatsApp Number</label>
            <input 
              type="tel" 
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleTextChange}
              placeholder="e.g. 08039556430" 
              className="w-full px-4 py-3 rounded-xl border border-brand-muted focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-sm"
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: Property coordinates */}
      <div>
        <h3 className="text-xl font-display font-medium text-white mb-4 pb-2 border-b border-brand-muted/40">
          2. Building Site Parameters
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white mb-1.5">Property Architecture Type *</label>
            <select
              name="propertyType"
              required
              value={formData.propertyType}
              onChange={handleTextChange}
              className="w-full px-4 py-3 rounded-xl border border-brand-muted focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-sm bg-transparent"
            >
              <option value="Residential">Residential (Villa, Duplex, Apartment)</option>
              <option value="Commercial">Commercial Office Complex</option>
              <option value="Religious Building">Religious Building (Church/Cathedral)</option>
              <option value="Hospitality">Hospitality (Hotel, Lounge, Suites)</option>
              <option value="Government">Government Secretariat / Facility</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white mb-1.5">Current Wall Condition</label>
            <select
              name="wallCondition"
              value={formData.wallCondition}
              onChange={handleTextChange}
              className="w-full px-4 py-3 rounded-xl border border-brand-muted focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-sm bg-transparent"
            >
              <option value="New Build">New Build (Fresh plaster, bare bricking)</option>
              <option value="Repaint">Requires Repainting / Facelift</option>
              <option value="Damaged/Cracked">Damaged Walls (requires damp sealing / crack repair)</option>
              <option value="Requires Screeding">Unpolished Plaster (needs dual putty coating)</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-white mb-1.5">Complete Site Address *</label>
            <textarea 
              name="propertyAddress"
              required
              rows={2}
              value={formData.propertyAddress}
              onChange={handleTextChange}
              placeholder="e.g. Ester Obiakor Avenue, Agu-Awka, Anambra State" 
              className="w-full px-4 py-3 rounded-xl border border-brand-muted focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-sm"
            />
          </div>
        </div>
      </div>

      {/* SECTION 3: Services selection */}
      <div>
        <h3 className="text-xl font-display font-medium text-white mb-1 pb-2">
          3. Select Cohesive Finishing Services
        </h3>
        <p className="text-xs text-text-soft mb-4">Check all operations you wish our crews to execute on your premises:</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {services.map((serv) => {
            const isSelected = formData.selectedServices.includes(serv.slug);
            const isPremium = serv.slug === 'crackos-effect' || serv.slug === 'ottochinto';
            return (
              <div
                key={serv.slug}
                onClick={() => handleServiceToggle(serv.slug)}
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
                    <h4 className="font-semibold text-sm text-white">{serv.name}</h4>
                    {isPremium && (
                      <span className="text-[9px] uppercase font-bold tracking-widest bg-brand-accent/20 text-brand-accent px-1.5 py-0.5 rounded">Luxury Accent</span>
                    )}
                  </div>
                  <p className="text-xs text-text-soft mt-1 leading-normal line-clamp-2">{serv.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Conditional Notifications on Service Selections */}
        {containsScreeding && (
          <div className="bg-brand-secondary/40 border border-brand-muted/70 text-brand-primary text-xs font-semibold p-4 rounded-xl mt-4 flex items-center gap-2">
            <Info className="w-4 h-4 text-brand-accent shrink-0" />
            <span>Screeding Note: Preparation of surfaces with dual-layer Cilok wall putty is highly recommended before laying down premium sheens.</span>
          </div>
        )}
        {containsPremium && (
          <div className="bg-brand-accent/10 border border-brand-accent/25 text-black text-xs font-semibold p-4 rounded-xl mt-4 flex items-center gap-2">
            <Info className="w-4 h-4 text-brand-accent shrink-0" />
            <span>Luxury Finishes: Shimmer effects are premium-grade applications hand-layered by our specialized artisan decorators.</span>
          </div>
        )}
      </div>

      {/* SECTION 4: Paint Supply */}
      <div>
        <h3 className="text-xl font-display font-medium text-white mb-4 pb-2 border-b border-brand-muted/40">
          4. Material & Paint Supply Plan
        </h3>
        <div className="space-y-4">
          <div className="bg-brand-surface p-4 rounded-2xl border border-brand-muted/70 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h4 className="font-semibold text-sm text-white">Do you already supply the paint?</h4>
              <p className="text-xs text-text-soft">Or should Cilok formulate, mix, deliver, and supply everything for the site?</p>
            </div>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 font-bold text-xs text-white select-none cursor-pointer">
                <input 
                  type="radio" 
                  name="supplyPaint" 
                  value="Yes"
                  checked={formData.supplyPaint === 'Yes'}
                  onChange={handleTextChange}
                  className="text-brand-primary focus:ring-brand-primary" 
                />
                Yes, I supply
              </label>
              <label className="flex items-center gap-2 font-bold text-xs text-white select-none cursor-pointer">
                <input 
                  type="radio" 
                  name="supplyPaint" 
                  value="No"
                  checked={formData.supplyPaint === 'No'}
                  onChange={handleTextChange}
                  className="text-brand-primary focus:ring-brand-primary" 
                />
                No, Cilok Paint supplies (Recommended)
              </label>
            </div>
          </div>

          <AnimatePresence>
            {formData.supplyPaint === 'No' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-brand-secondary/20 border border-brand-muted rounded-2.5xl p-5 md:p-6 overflow-hidden"
              >
                <h4 className="font-display font-semibold text-xs uppercase tracking-wider text-brand-primary mb-3">
                  Check which Cilok formulation you prefer us to pack:
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {products.map(p => {
                    const isChecked = formData.preferredPaints.includes(p.slug);
                    return (
                      <label 
                        key={p.slug}
                        className={`p-3 rounded-xl border text-center cursor-pointer select-none ${
                          isChecked ? 'border-brand-primary bg-zinc-800 text-brand-primary font-bold' : 'border-brand-muted font-medium text-xs text-text-soft hover:border-brand-primary/40'
                        }`}
                      >
                        <input 
                          type="checkbox" 
                          checked={isChecked}
                          onChange={() => handlePaintToggle(p.slug)}
                          className="hidden"
                        />
                        <span className="text-xs">{p.name}</span>
                      </label>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* SECTION 5: Timing and Budget */}
      <div>
        <h3 className="text-xl font-display font-medium text-white mb-4 pb-2 border-b border-brand-muted/40">
          5. Schedule & Estimated Budget
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white mb-1.5 font-sans">Wall Area Dimensions (sqm Estimate)</label>
            <input 
              type="number" 
              name="surfaceArea"
              value={formData.surfaceArea}
              onChange={handleTextChange}
              placeholder="e.g. 500" 
              className="w-full px-4 py-3 rounded-xl border border-brand-muted focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white mb-1.5 font-sans font-semibold">Total Rooms / Floors</label>
            <input 
              type="text" 
              name="roomsFloors"
              value={formData.roomsFloors}
              onChange={handleTextChange}
              placeholder="e.g. 15 rooms, 2 floors" 
              className="w-full px-4 py-3 rounded-xl border border-brand-muted focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white mb-1.5">When would you like our crews to start? *</label>
            <input 
              type="date" 
              name="startDate"
              required
              min={getMinStartDate()}
              value={formData.startDate}
              onChange={handleTextChange}
              className="w-full px-4 py-3 rounded-xl border border-brand-muted focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-sm font-semibold"
            />
            <span className="text-[10px] text-text-soft italic mt-1 block">Requires at least 5 days from today for logistical crew layouts.</span>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white mb-1.5">Project Duration Target</label>
            <select
              name="durationEstimate"
              value={formData.durationEstimate}
              onChange={handleTextChange}
              className="w-full px-4 py-3 rounded-xl border border-brand-muted focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-sm bg-transparent"
            >
              <option value="1-3 days">Quick facelift (1 to 3 Days)</option>
              <option value="1 week">Standard house (1 Week)</option>
              <option value="2 weeks">Large complex (2 Weeks)</option>
              <option value="1 month">Massive luxury estate (1 Month)</option>
              <option value="Unsure">To Be Discussed on Inspection</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white mb-1.5 font-semibold">Estimated Booking Budget</label>
            <select
              name="budgetRange"
              value={formData.budgetRange}
              onChange={handleTextChange}
              className="w-full px-4 py-3 rounded-xl border border-brand-muted focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-sm bg-transparent"
            >
              <option value="To be discussed">Choose options... (Will discuss inside quotation)</option>
              <option value="Under 200k">Under ₦200,000</option>
              <option value="200k-500k">₦200,000 to ₦500,000</option>
              <option value="500k-1M">₦500,000 to ₦1,000,000</option>
              <option value="Above 1M">Above ₦1,000,000</option>
            </select>
          </div>
        </div>
      </div>

      {/* SECTION 6: File Upload spaces */}
      <div>
        <h3 className="text-xl font-display font-medium text-white mb-1 pb-2">
          6. Upload Building Space Photos (Highly Recommended)
        </h3>
        <p className="text-xs text-text-soft mb-4">Sharing photos allows us to formulate the right moisture and sealer profiles early.</p>
        
        {/* Drag active frame */}
        <div 
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2.5xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center ${
            dragActive 
              ? 'border-brand-accent bg-brand-secondary/40' 
              : 'border-brand-muted bg-brand-surface hover:bg-brand-secondary/15 hover:border-brand-primary/50'
          }`}
        >
          <input 
            type="file" 
            ref={fileInputRef}
            aria-label="Upload photos"
            multiple 
            accept="image/*"
            onChange={handleFileInputChange}
            className="hidden" 
          />
          <Upload className="w-8 h-8 text-brand-primary/80 mb-3 animate-pulse" />
          <p className="font-semibold text-sm text-white mb-1">Drag and drop photos here, or click to browse</p>
          <p className="text-xs text-text-soft">Supports JPGS/PNGS, max 5 images, up to 5MB each.</p>
        </div>

        {/* Thumbnail previews */}
        {uploadedFiles.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-4">
            {uploadedFiles.map((file, i) => (
              <div key={i} className="relative group rounded-xl overflow-hidden aspect-square border border-brand-muted">
                <img src={file.preview} alt="attached site preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-brand-dark/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    type="button"
                    onClick={(e) => { e.stopPropagation(); removeFile(i); }} 
                    className="p-1.5 rounded-full bg-brand-red text-white hover:scale-105 transition-transform"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-zinc-900/90 text-[10px] p-1 font-semibold text-white truncate">
                  {file.name}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 7: Notes and referrals */}
      <div>
        <h3 className="text-xl font-display font-medium text-white mb-4 pb-2 border-b border-brand-muted/40">
          7. Additional Notes
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white mb-1.5">Special Instructions / Project Specific Details</label>
            <textarea 
              name="notes"
              rows={3}
              value={formData.notes}
              onChange={handleTextChange}
              placeholder="Please elaborate on access heights, compound size, or existing peel problems." 
              className="w-full px-4 py-3 rounded-xl border border-brand-muted focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white mb-1.5">How did you hear about us?</label>
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
              <option value="Signage">Factory Roadside Signage (Nkpor)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Form Error Notification */}
      {submitStatus === 'error' && (
        <div className="bg-brand-red/10 border border-brand-red/20 text-brand-red text-sm p-4 rounded-xl font-medium">
          An error occurred while transmitting your service inquiry. Please call us at <a href="tel:08039556430" className="underline font-bold">08039556430</a> to book immediately.
        </div>
      )}

      {/* SUBMIT BUTTON ROW */}
      <div className="flex items-center justify-end pt-4 border-t border-brand-muted/30">
        <Button 
          id="btn-service-booking-submit"
          type="submit" 
          variant="primary" 
          size="lg"
          disabled={isSubmitting}
          className="w-full sm:w-auto"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin animate-infinite" />
              Securing Booking...
            </>
          ) : (
            'Book Expert Coatings Service'
          )}
        </Button>
      </div>

    </form>
  );
}
