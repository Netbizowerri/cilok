import { useState } from "react";
import { motion } from "motion/react";
import { Eye, Wallpaper, PaintBucket, Home } from "lucide-react";

const formulations = [
  { name: "Silk Weather Proof", color: "#c9a96e", label: "Silk Gold" },
  { name: "Matt Elegance", color: "#8b8c89", label: "Matt Grey" },
  { name: "Emulsion White", color: "#f5f0e8", label: "Emulsion" },
  { name: "Stucco Terracotta", color: "#c4674b", label: "Terracotta" },
  { name: "Pearl Iris", color: "#b8a9c9", label: "Pearl" },
  { name: "Palace Blue", color: "#2c4c6b", label: "Navy" },
];

const surfaces = ["main_wall", "accent_wall", "ceiling"] as const;
type Surface = (typeof surfaces)[number];

export default function Visualizer() {
  const [activeSurface, setActiveSurface] = useState<Surface>("main_wall");
  const [activeFinish, setActiveFinish] = useState(formulations[0]);

  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl md:text-6xl font-bold text-brand-navy">Visualizer Studio</h1>
          <p className="mt-3 text-gray-500 text-lg max-w-xl">
            Experiment with Cilok finishes on a virtual room. Select a surface and pick a formulation.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="relative w-full aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden border border-gray-200">
              <div className="absolute inset-0 p-6">
                <div
                  className="w-full h-full rounded-xl transition-colors duration-500"
                  style={{ backgroundColor: activeSurface === "main_wall" ? activeFinish.color : "#e5e0d8" }}
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="grid grid-cols-2 gap-4 w-full h-full p-8">
                  <div
                    className="rounded-xl transition-colors duration-500"
                    style={{ backgroundColor: activeSurface === "accent_wall" ? activeFinish.color : "#d4cfc7" }}
                  />
                  <div
                    className="rounded-xl transition-colors duration-500"
                    style={{ backgroundColor: activeSurface === "ceiling" ? activeFinish.color : "#ede8e0" }}
                  />
                </div>
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {surfaces.map((s) => (
                  <button
                    key={s}
                    onClick={() => setActiveSurface(s)}
                    className={`px-4 py-2 rounded-full text-xs font-medium capitalize transition-colors ${
                      activeSurface === s
                        ? "bg-brand-navy text-white"
                        : "bg-white/80 text-gray-700 hover:bg-white"
                    }`}
                  >
                    {s.replace("_", " ")}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Finishes</h3>
            <div className="space-y-2">
              {formulations.map((f) => (
                <motion.button
                  key={f.name}
                  onClick={() => setActiveFinish(f)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${
                    activeFinish.name === f.name
                      ? "bg-brand-navy text-white"
                      : "bg-white border border-gray-100 text-gray-700 hover:border-gray-200"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span
                    className="w-6 h-6 rounded-full border border-white/20 shrink-0"
                    style={{ backgroundColor: f.color }}
                  />
                  <div>
                    <div className="text-sm font-medium">{f.label}</div>
                    <div className="text-xs opacity-60">{f.name}</div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
