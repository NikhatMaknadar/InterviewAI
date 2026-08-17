function Features() {
  const features = [
    {
      icon: "📄",
      title: "AI Resume Analysis",
      description:
        "Upload your resume and get an ATS score, strengths, weaknesses, missing skills, and actionable improvement suggestions.",
    },
    {
      icon: "🎤",
      title: "Personalized Mock Interviews",
      description:
        "Practice technical and HR questions generated around your resume and experience.",
    },
    {
      icon: "⚡",
      title: "Instant AI Feedback",
      description:
        "Get a score, strengths, weaknesses, ideal answer, and practical tips after every response.",
    },
    {
      icon: "📊",
      title: "Performance Reports",
      description:
        "Understand your overall interview performance with detailed AI-generated insights.",
    },
    {
      icon: "🎯",
      title: "Personalized Roadmap",
      description:
        "Know exactly which skills and areas you should improve before your next interview.",
    },
    {
      icon: "🔒",
      title: "Secure & Private",
      description:
        "Your authentication and interview data are protected using secure JWT-based access.",
    },
  ];

  return (
    <section id="features" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-blue-400">
            Powerful Features
          </span>

          <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">
            Everything you need to
            <span className="text-blue-400"> prepare with confidence.</span>
          </h2>

          <p className="mt-5 text-slate-400 text-lg">
            InterviewAI combines resume intelligence, realistic interview
            practice, and personalized AI feedback in one place.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group ai-card p-7 hover:-translate-y-1 hover:border-blue-500/30 transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/10 flex items-center justify-center text-2xl group-hover:bg-blue-500/15 transition">
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="mt-6 text-xl font-semibold text-white">
                {feature.title}
              </h3>

              <p className="mt-3 text-slate-400 leading-relaxed">
                {feature.description}
              </p>

              <div className="mt-6 text-blue-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition">
                Learn more →
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
