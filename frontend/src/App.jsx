function App() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--primary)]">
      {/* Hero Section */}
      <header className="px-6 py-20 text-center">
        <h1 className="text-5xl font-extrabold leading-tight tracking-tight">
          QuizGen AI
        </h1>
        <p className="mt-4 text-xl text-[var(--accent)]">
          Instantly generate smart, styled quizzes from any passage of text using AI.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <button className="bg-[var(--primary)] text-white font-medium px-6 py-2 rounded-2xl shadow hover:opacity-90 transition">
            Try Demo
          </button>
          <button className="bg-[var(--highlight)] text-[var(--accent)] font-medium px-6 py-2 rounded-2xl shadow hover:bg-[var(--secondary)] transition">
            Learn More
          </button>
        </div>
      </header>

      {/* Features Section */}
      <section className="px-6 py-16 bg-[var(--secondary)] text-[var(--accent)]">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-10 text-center">
          <div>
            <h3 className="text-xl font-semibold mb-2">AI-Powered</h3>
            <p className="text-sm">
              Generate MCQs, true/false, and fill-in-the-blank questions using top-tier LLMs.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Fully Customizable</h3>
            <p className="text-sm">
              Choose difficulty, tone, and output formats with granular control.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Multi-Model Support</h3>
            <p className="text-sm">
              Connect to OpenAI, Gemini, or even local LLMs with ease.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-[var(--accent)]">
        &copy; {new Date().getFullYear()} QuizGen AI. All rights reserved.
      </footer>
    </div>
  );
}

export default App;