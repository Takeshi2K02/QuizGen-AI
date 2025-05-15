import React from 'react';
import { Link } from 'react-router-dom';

const toggleDarkMode = () => {
  const root = document.documentElement;
  if (root.classList.contains('dark')) {
    root.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  } else {
    root.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }
};

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* Navbar */}
      <nav className="w-full flex items-center justify-between px-8 py-4 shadow-sm bg-[var(--bg-subtle)] text-sm">
        <h1 className="text-2xl font-extrabold tracking-wide text-primary-700">QuizGen AI</h1>
        <div className="space-x-4">
          <button
            onClick={toggleDarkMode}
            className="px-4 py-2 rounded-xl bg-neutral-200 text-neutral-800 hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600 transition"
          >
            Toggle Theme
          </button>
          <Link to="/login">
            <button className="px-4 py-2 rounded-xl border border-primary-500 text-primary-700 hover:bg-primary-50 dark:border-neutral-500 dark:text-neutral-200 dark:hover:bg-neutral-600 transition text-sm">
              Sign In
            </button>
          </Link>
          <Link to="/signup">
            <button className="px-4 py-2 rounded-xl bg-primary-500 text-white hover:opacity-90 dark:bg-primary-700 dark:hover:bg-primary-600 transition text-sm">
              Sign Up
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center text-center px-4 py-8">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight max-w-3xl text-primary-700 dark:text-[var(--text)]">
          Create AI-Generated Quizzes Instantly
        </h2>
        <p className="mt-5 text-lg md:text-xl max-w-2xl text-secondary-600 dark:text-[var(--text-muted)]">
          QuizGen AI helps you turn any passage of text into smart, customizable multiple-choice questions using powerful language models.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <button className="px-6 py-2.5 rounded-xl bg-primary-500 text-white hover:opacity-90 dark:bg-primary-700 dark:hover:bg-primary-600 transition text-base">
            Try it Now
          </button>
          <button className="px-6 py-2.5 rounded-xl bg-secondary-200 text-secondary-700 hover:bg-secondary-300 dark:bg-neutral-700 dark:text-[var(--text-muted)] dark:hover:bg-neutral-600 transition text-base">
            See Features
          </button>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-10 px-6 text-secondary-700 dark:text-[var(--text-muted)]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <h3 className="text-[1.125rem] font-semibold mb-1 text-secondary-800 dark:text-[var(--text)]">AI-Powered</h3>
            <p className="text-secondary-600 dark:text-[var(--text-muted)]">Generate MCQs, true/false, and fill-in-the-blanks using top-tier LLMs.</p>
          </div>
          <div>
            <h3 className="text-[1.125rem] font-semibold mb-1 text-secondary-800 dark:text-[var(--text)]">Customizable Output</h3>
            <p className="text-secondary-600 dark:text-[var(--text-muted)]">Control difficulty, tone, export format, and more.</p>
          </div>
          <div>
            <h3 className="text-[1.125rem] font-semibold mb-1 text-secondary-800 dark:text-[var(--text)]">Model Flexibility</h3>
            <p className="text-secondary-600 dark:text-[var(--text-muted)]">Integrate OpenAI, Gemini, or your own local LLM endpoints.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-secondary-600 dark:text-[var(--text-muted)]">
        &copy; {new Date().getFullYear()} QuizGen AI. Built with ❤️ for learners and educators.
      </footer>
    </div>
  );
};

export default LandingPage;