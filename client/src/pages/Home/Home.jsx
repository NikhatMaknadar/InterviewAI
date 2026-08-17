import Navbar from "../../components/layout/Navbar";
import Hero from "../../components/common/Hero";
import Features from "../../components/common/Features";
import Footer from "../../components/common/Footer";

function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <Navbar />

      <main>
        <Hero />
        <Features />
      </main>

      <Footer />
    </div>
  );
}

export default Home;
