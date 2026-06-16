import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calculator, Ruler, Layers, PaintBucket, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";

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

  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-8 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl md:text-6xl font-bold text-brand-navy">Estimate Calculator</h1>
          <p className="mt-3 text-gray-500 text-lg max-w-xl">
            Get an instant cost estimate for your wall coating project.
          </p>
        </motion.div>

        <div className="mt-10 flex items-center justify-between mb-10">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="flex items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                    i <= step ? "bg-brand-navy text-white" : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <Icon size={18} />
                </div>
                <span className={`text-sm font-medium hidden sm:block ${i <= step ? "text-brand-navy" : "text-gray-400"}`}>
                  {s.title}
                </span>
                {i < steps.length - 1 && <div className="hidden sm:block w-12 h-px bg-gray-200 mx-2" />}
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                <h2 className="text-xl font-semibold text-brand-navy">Room Dimensions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { label: "Length (m)", value: length, set: setLength },
                    { label: "Width (m)", value: width, set: setWidth },
                    { label: "Height (m)", value: height, set: setHeight, placeholder: "2.4" },
                  ].map((field) => (
                    <div key={field.label}>
                      <label className="block text-sm font-medium text-gray-600 mb-1">{field.label}</label>
                      <input
                        type="text"
                        inputMode="decimal"
                        value={field.value}
                        onChange={(e) => field.set(handleNumberInput(e.target.value))}
                        placeholder={field.placeholder || "0"}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/30"
                      />
                    </div>
                  ))}
                </div>
                {area > 0 && (
                  <p className="text-sm text-gray-500">
                    Floor area: <strong>{area.toFixed(1)} m&sup2;</strong> &middot; 
                    Wall area: <strong>{(wallArea || 0).toFixed(1)} m&sup2;</strong>
                  </p>
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
                <h2 className="text-xl font-semibold text-brand-navy">Select Services</h2>
                {servicesOptions.map((svc) => (
                  <button
                    key={svc.value}
                    onClick={() => toggleService(svc.value)}
                    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-left transition-colors ${
                      selectedServices.includes(svc.value)
                        ? "bg-brand-navy text-white"
                        : "bg-gray-50 border border-gray-100 text-gray-700 hover:border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle2
                        size={18}
                        className={selectedServices.includes(svc.value) ? "text-brand-gold" : "text-gray-300"}
                      />
                      <span className="text-sm font-medium">{svc.label}</span>
                    </div>
                    <span className="text-sm font-medium">&#8358;{svc.price.toLocaleString()}/m&sup2;</span>
                  </button>
                ))}
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
                <h2 className="text-xl font-semibold text-brand-navy">Choose Product Grade</h2>
                {productOptions.map((prod) => (
                  <button
                    key={prod.value}
                    onClick={() => setSelectedProduct(prod)}
                    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-left transition-colors ${
                      selectedProduct.value === prod.value
                        ? "bg-brand-navy text-white"
                        : "bg-gray-50 border border-gray-100 text-gray-700 hover:border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedProduct.value === prod.value ? "border-brand-gold" : "border-gray-300"
                        }`}
                      >
                        {selectedProduct.value === prod.value && <div className="w-2.5 h-2.5 rounded-full bg-brand-gold" />}
                      </div>
                      <div>
                        <div className="text-sm font-medium">{prod.label}</div>
                        <div className="text-xs opacity-60">{prod.coverage} m&sup2;/L coverage</div>
                      </div>
                    </div>
                    <span className="text-sm font-medium">&#8358;{prod.price.toLocaleString()}/L</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-500 disabled:opacity-30 hover:text-brand-navy transition-colors"
            >
              <ChevronLeft size={16} /> Back
            </button>

            {step < 2 ? (
              <button
                onClick={() => setStep((s) => Math.min(2, s + 1))}
                disabled={!canProceed()}
                className="flex items-center gap-1 px-6 py-2.5 bg-brand-navy text-white text-sm font-medium rounded-full disabled:opacity-40 hover:bg-brand-navy-light transition-colors"
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
              className="mt-6 p-6 bg-brand-navy text-white rounded-2xl"
            >
              <h3 className="text-lg font-semibold mb-4">Estimate Summary</h3>
              <div className="space-y-2 text-sm text-white/70">
                <div className="flex justify-between">
                  <span>Wall Area</span>
                  <span>{(wallArea || 0).toFixed(1)} m&sup2;</span>
                </div>
                <div className="flex justify-between">
                  <span>Paint Required</span>
                  <span>{volume.toFixed(1)} L</span>
                </div>
                <div className="flex justify-between">
                  <span>Product Cost</span>
                  <span>&#8358;{productTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
                {servicesTotal > 0 && (
                  <div className="flex justify-between">
                    <span>Services Cost</span>
                    <span>&#8358;{servicesTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                )}
              </div>
              <div className="mt-4 pt-4 border-t border-white/10 flex justify-between text-lg font-bold">
                <span>Total Estimated</span>
                <span className="text-brand-gold">&#8358;{total.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
          <strong>Note:</strong> This is an estimate only. Final pricing may vary based on site assessment and material availability. Contact us for a detailed quotation.
        </div>
      </div>
    </div>
  );
}
