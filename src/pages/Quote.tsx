import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calculator, Ruler, Layers, PaintBucket, CheckCircle2, ChevronLeft, ChevronRight, Sparkles, Droplets } from "lucide-react";

const steps = [
  { title: "Dimensions", icon: Ruler },
  { title: "Services", icon: Layers },
  { title: "Product", icon: PaintBucket },
];

const servicesOptions = [
  { label: "Wall Screeding", value: "screeding", price: 500 },
  { label: "Stucco Coating", value: "stucco", price: 1200 },
  { label: "Pearl Effect", value: "pearl", price: 2000 },
  { label: "Crackled Effect", value: "crackled", price: 1500 },
  { label: "Tyrolean Finish", value: "tyrolean", price: 800 },
];

const productOptions = [
  { label: "Premium Silk", value: "silk", price: 3500, coverage: 10 },
  { label: "Standard Emulsion", value: "emulsion", price: 2000, coverage: 12 },
  { label: "Weather Proof", value: "weather", price: 4500, coverage: 8 },
  { label: "Matt Finish", value: "matt", price: 3000, coverage: 10 },
  { label: "Texcoat", value: "texcoat", price: 3800, coverage: 6 },
];

export default function Quote() {
  const [step, setStep] = useState(0);
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState(productOptions[0]);

  const area = (parseFloat(length) || 0) * (parseFloat(width) || 0);
  const wallArea = area * (parseFloat(height) || 2.4);
  const volume = wallArea > 0 ? (wallArea * 1) / (selectedProduct?.coverage || 10) : 0;
  const productTotal = wallArea > 0 ? volume * (selectedProduct?.price || 0) : 0;
  const servicesTotal = selectedServices.reduce((sum, s) => {
    const svc = servicesOptions.find((o) => o.value === s);
    return sum + (svc ? svc.price * (wallArea || 0) : 0);
  }, 0);
  const total = productTotal + servicesTotal;

  const toggleService = (value: string) => {
    setSelectedServices((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleNumberInput = (val: string) => {
    const cleaned = val.replace(/[^0-9.]/g, "");
    if ((cleaned.match(/\./g) || []).length > 1) return cleaned.slice(0, -1);
    return cleaned;
  };

  const canProceed = () => {
    if (step === 0) return parseFloat(length) > 0 && parseFloat(width) > 0 && parseFloat(height) > 0;
    if (step === 1) return selectedServices.length > 0;
    return true;
  };

  const progressPercent = ((step + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <Calculator className="w-6 h-6 text-brand-primary" />
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-brand-primary">Cost Estimator</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white">Estimate Calculator</h1>
          <p className="mt-3 text-text-soft text-lg max-w-xl">
            Get an instant cost estimate for your wall coating project.
          </p>
        </motion.div>

        <div className="mt-10 mb-8">
          <div className="flex items-center justify-between mb-3">
            {steps.map((s, i) => {
              const Icon = s.icon;
              const isActive = i <= step;
              return (
                <div key={s.title} className="flex flex-col items-center gap-1.5">
                  <div
                    className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                      isActive
                        ? "bg-brand-primary text-black shadow-[0_0_12px_rgba(144,163,238,0.4)]"
                        : "bg-zinc-800 text-zinc-500"
                    }`}
                  >
                    <Icon size={16} />
                  </div>
                  <span className={`text-[10px] font-medium whitespace-nowrap ${isActive ? "text-brand-primary" : "text-zinc-600"}`}>
                    {s.title}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="relative h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-brand-primary to-brand-accent rounded-full"
              initial={{ width: "33.33%" }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </div>
        </div>

        <div className="bg-zinc-950 rounded-2xl border border-zinc-800/80 p-5 md:p-8">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                    <Droplets className="w-5 h-5 text-brand-primary" />
                    Room Dimensions
                  </h2>
                  <p className="text-xs text-text-soft mt-1">Enter the dimensions of the room you want to coat.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { label: "Length (m)", value: length, set: setLength },
                    { label: "Width (m)", value: width, set: setWidth },
                    { label: "Height (m)", value: height, set: setHeight, placeholder: "2.4" },
                  ].map((field) => (
                    <div key={field.label}>
                      <label className="block text-xs font-medium text-text-soft mb-1.5">{field.label}</label>
                      <input
                        type="text"
                        inputMode="decimal"
                        value={field.value}
                        onChange={(e) => field.set(handleNumberInput(e.target.value))}
                        placeholder={field.placeholder || "0"}
                        className="w-full px-4 py-3 bg-brand-dark border border-zinc-700/80 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:border-brand-primary transition-all"
                      />
                    </div>
                  ))}
                </div>
                {area > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-brand-dark/60 rounded-xl border border-zinc-800/60"
                  >
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-text-soft">Floor area</span>
                        <p className="text-white font-semibold">{area.toFixed(1)} m&sup2;</p>
                      </div>
                      <div>
                        <span className="text-text-soft">Wall area</span>
                        <p className="text-white font-semibold">{(wallArea || 0).toFixed(1)} m&sup2;</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-brand-primary" />
                    Select Services
                  </h2>
                  <p className="text-xs text-text-soft mt-1">Choose the finishing services you need.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {servicesOptions.map((svc) => {
                    const isSelected = selectedServices.includes(svc.value);
                    return (
                      <button
                        key={svc.value}
                        onClick={() => toggleService(svc.value)}
                        className={`flex items-center justify-between p-4 rounded-xl text-left transition-all duration-200 ${
                          isSelected
                            ? "bg-brand-primary/10 border border-brand-primary/50 shadow-[0_0_12px_rgba(144,163,238,0.15)]"
                            : "bg-zinc-900/60 border border-zinc-800/60 hover:border-zinc-700"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-md flex items-center justify-center border text-[10px] font-bold transition-all ${
                            isSelected
                              ? "bg-brand-primary border-brand-primary text-black"
                              : "border-zinc-600 text-transparent"
                          }`}>
                            {isSelected && "✓"}
                          </div>
                          <div>
                            <span className={`text-sm font-medium ${isSelected ? "text-white" : "text-zinc-300"}`}>
                              {svc.label}
                            </span>
                            <p className={`text-[10px] ${isSelected ? "text-brand-primary/70" : "text-zinc-500"}`}>
                              {isSelected ? "Selected" : "Click to add"}
                            </p>
                          </div>
                        </div>
                        <span className={`text-sm font-bold ${isSelected ? "text-brand-primary" : "text-zinc-500"}`}>
                          &#8358;{svc.price.toLocaleString()}/m&sup2;
                        </span>
                      </button>
                    );
                  })}
                </div>
                {selectedServices.length > 0 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-text-soft text-right"
                  >
                    {selectedServices.length} service{selectedServices.length > 1 ? "s" : ""} selected
                  </motion.p>
                )}
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                    <PaintBucket className="w-5 h-5 text-brand-primary" />
                    Choose Product Grade
                  </h2>
                  <p className="text-xs text-text-soft mt-1">Select the paint grade for your project.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {productOptions.map((prod) => {
                    const isSelected = selectedProduct.value === prod.value;
                    return (
                      <button
                        key={prod.value}
                        onClick={() => setSelectedProduct(prod)}
                        className={`flex items-center justify-between p-4 rounded-xl text-left transition-all duration-200 ${
                          isSelected
                            ? "bg-brand-primary/10 border border-brand-primary/50 shadow-[0_0_12px_rgba(144,163,238,0.15)]"
                            : "bg-zinc-900/60 border border-zinc-800/60 hover:border-zinc-700"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                            isSelected ? "border-brand-primary" : "border-zinc-600"
                          }`}>
                            {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-brand-primary" />}
                          </div>
                          <div>
                            <span className={`text-sm font-medium ${isSelected ? "text-white" : "text-zinc-300"}`}>
                              {prod.label}
                            </span>
                            <p className={`text-[10px] ${isSelected ? "text-brand-primary/70" : "text-zinc-500"}`}>
                              {prod.coverage} m&sup2;/L coverage
                            </p>
                          </div>
                        </div>
                        <span className={`text-sm font-bold ${isSelected ? "text-brand-primary" : "text-zinc-500"}`}>
                          &#8358;{prod.price.toLocaleString()}/L
                        </span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-zinc-800/60">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="flex items-center gap-1 px-4 py-2.5 text-sm font-medium text-zinc-400 disabled:opacity-30 hover:text-white transition-colors"
            >
              <ChevronLeft size={16} /> Back
            </button>

            {step < 2 ? (
              <button
                onClick={() => setStep((s) => Math.min(2, s + 1))}
                disabled={!canProceed()}
                className="flex items-center gap-1 px-6 py-2.5 bg-brand-primary text-black text-sm font-bold rounded-full disabled:opacity-40 hover:bg-brand-primary/90 transition-all shadow-[0_0_12px_rgba(144,163,238,0.2)]"
              >
                Next <ChevronRight size={16} />
              </button>
            ) : (
              <div />
            )}
          </div>
        </div>

        <AnimatePresence>
          {step === 2 && total > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-6 bg-zinc-950 border border-zinc-800/80 rounded-2xl overflow-hidden"
            >
              <div className="p-5 md:p-6">
                <div className="flex items-center gap-2 mb-5">
                  <Calculator className="w-5 h-5 text-brand-primary" />
                  <h3 className="text-lg font-semibold text-white">Estimate Summary</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-zinc-800/60">
                    <span className="text-text-soft">Wall Area</span>
                    <span className="text-white font-medium">{(wallArea || 0).toFixed(1)} m&sup2;</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-zinc-800/60">
                    <span className="text-text-soft">Paint Required</span>
                    <span className="text-white font-medium">{volume.toFixed(1)} L</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-zinc-800/60">
                    <span className="text-text-soft">Product Cost</span>
                    <span className="text-white font-medium">&#8358;{productTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  {servicesTotal > 0 && (
                    <div className="flex justify-between py-2 border-b border-zinc-800/60">
                      <span className="text-text-soft">Services Cost</span>
                      <span className="text-white font-medium">&#8358;{servicesTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                    </div>
                  )}
                </div>
                <div className="mt-5 pt-4 border-t border-zinc-800/80 flex justify-between items-center">
                  <span className="text-base text-text-soft">Total Estimated</span>
                  <span className="text-2xl font-bold text-brand-primary">&#8358;{total.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 p-4 bg-zinc-900/50 border border-zinc-800/60 rounded-xl text-xs text-zinc-400"
        >
          <strong className="text-zinc-300">Note:</strong> This is an estimate only. Final pricing may vary based on site assessment and material availability. Contact us for a detailed quotation.
        </motion.div>
      </div>
    </div>
  );
}
