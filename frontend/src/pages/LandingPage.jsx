import React from 'react';

const LandingPage = () => {
  return (
    <div className="h-screen overflow-hidden bg-[var(--bg)] text-[var(--primary)] flex flex-col">
      {/* Navbar */}
      <nav className="w-full flex items-center justify-between px-8 py-4 shadow-sm bg-[var(--secondary)] text-sm">
        <h1 className="text-2xl font-extrabold tracking-wide">QuizGen AI</h1>
        <div className="space-x-4">
          <button className="px-4 py-2 rounded-xl bg-transparent border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--highlight)] transition text-sm">
            Sign In
          </button>
          <button className="px-4 py-2 rounded-xl bg-[var(--primary)] text-white hover:opacity-90 transition text-sm">
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
        <header className="flex-1 flex flex-col items-center justify-center text-center px-4 py-8">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight max-w-3xl">
            Create AI-Generated Quizzes Instantly
        </h2>
        <p className="mt-5 text-lg md:text-xl text-[var(--accent)] max-w-2xl">
            QuizGen AI helps you turn any passage of text into smart, customizable multiple-choice questions using powerful language models.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button className="px-6 py-2.5 rounded-xl bg-[var(--primary)] text-white font-medium hover:opacity-90 transition text-base">
            Try it Now
            </button>
            <button className="px-6 py-2.5 rounded-xl bg-[var(--highlight)] text-[var(--accent)] font-medium hover:bg-[var(--secondary)] transition text-base">
            See Features
            </button>
        </div>
        </header>


      {/* Features Section */}
        <section className="flex-[0.32] flex items-center justify-center px-6 py-6 bg-[var(--tertiary)] text-[var(--accent)] text-[15px]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
            <h3 className="text-[1.125rem] font-semibold mb-1">AI-Powered</h3>
            <p>Generate MCQs, true/false, and fill-in-the-blanks using top-tier LLMs.</p>
            </div>
            <div>
            <h3 className="text-[1.125rem] font-semibold mb-1">Customizable Output</h3>
            <p>Control difficulty, tone, export format, and more.</p>
            </div>
            <div>
            <h3 className="text-[1.125rem] font-semibold mb-1">Model Flexibility</h3>
            <p>Integrate OpenAI, Gemini, or your own local LLM endpoints.</p>
            </div>
        </div>
        </section>



      {/* Footer */}
      <footer className="py-4 text-center text-xs text-[var(--accent)]">
        &copy; {new Date().getFullYear()} QuizGen AI. Built with ❤️ for learners and educators.
      </footer>
    </div>
  );
};

export default LandingPage;