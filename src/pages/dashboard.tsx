import React, { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Icons } from "../assets/icons";

export default function Dashboard() {
  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card
          title="Teachers"
          value={78}
          icon={<Icons.User className="w-6 h-6 text-white" />}
          gradient="from-indigo-500 to-indigo-700"
        />
        <Card
          title="Students"
          value={1245}
          icon={<Icons.GraduationCap className="w-6 h-6 text-white" />}
          gradient="from-green-500 to-green-700"
        />
        <Card
          title="Sessions"
          value={5}
          icon={<Icons.CalenderDays className="w-6 h-6 text-white" />}
          gradient="from-rose-500 to-rose-700"
        />
        <Card
          title="Total Sections"
          value={78}
          icon={<Icons.School className="w-6 h-6 text-white" />}
          gradient="from-yellow-500 to-yellow-700"
        />
      </div>

      <div className="bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Overview</h2>
        <div className="text-gray-500 text-sm">
          This is where charts, graphs, or data summaries can be displayed.
        </div>
      </div>
    </div>
  );
}

// Counter Hook
function useAnimatedCounter(to: number) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.floor(latest));

  useEffect(() => {
    const controls = animate(count, to, { duration: 1.2 });
    return controls.stop;
  }, [to]);

  return rounded;
}

// Card Component
function Card({
  title,
  value,
  icon,
  gradient,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  gradient: string;
}) {
  const count = useAnimatedCounter(value);

  return (
    <div
      className={`bg-gradient-to-r ${gradient} text-white rounded-2xl p-4 shadow-md hover:scale-105 transition-transform duration-200`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold">{title}</p>
          <motion.h2 className="text-2xl font-bold">{count}</motion.h2>
        </div>
        <div className="bg-white/20 p-3 rounded-full">{icon}</div>
      </div>
    </div>
  );
}
