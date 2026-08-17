function DashboardCard({
  icon,
  title,
  description,
  buttonText,
  onClick,
  accent = "blue",
}) {
  const accentStyles = {
    blue: {
      iconBg: "bg-blue-500/10 border-blue-500/20",
      iconText: "text-blue-400",
      button: "bg-blue-600 hover:bg-blue-500 shadow-blue-500/20",
      glow: "group-hover:bg-blue-500/10",
    },

    purple: {
      iconBg: "bg-purple-500/10 border-purple-500/20",
      iconText: "text-purple-400",
      button: "bg-purple-600 hover:bg-purple-500 shadow-purple-500/20",
      glow: "group-hover:bg-purple-500/10",
    },

    green: {
      iconBg: "bg-emerald-500/10 border-emerald-500/20",
      iconText: "text-emerald-400",
      button: "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/20",
      glow: "group-hover:bg-emerald-500/10",
    },
  };

  const style = accentStyles[accent] || accentStyles.blue;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 p-7 hover:-translate-y-1 hover:border-slate-700 transition-all duration-300">
      {/* Hover glow */}
      <div
        className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition duration-500 ${style.glow}`}
      />

      <div className="relative">
        {/* Icon */}
        <div
          className={`w-14 h-14 rounded-2xl border flex items-center justify-center text-2xl ${style.iconBg}`}
        >
          {icon}
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-white mt-6">{title}</h2>

        {/* Description */}
        <p className="text-slate-400 mt-3 leading-relaxed min-h-[96px]">
          {description}
        </p>

        {/* Button */}
        <button
          onClick={onClick}
          className={`mt-6 inline-flex items-center gap-2 text-white px-5 py-2.5 rounded-lg font-semibold text-sm shadow-lg transition-all hover:-translate-y-0.5 ${style.button}`}
        >
          {buttonText}
          <span>→</span>
        </button>
      </div>
    </div>
  );
}

export default DashboardCard;
