import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun, Heart } from 'lucide-react';

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
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') setIsDark(true);
    if (theme === 'light') setIsDark(false);
  }, []);

  const handleToggle = () => {
    toggleDarkMode();
    setIsDark(!isDark);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text)]">
      {/* NAV */}
      <nav className="w-full flex items-center justify-between px-8 py-4 shadow-sm bg-[var(--bg-subtle)] text-sm border-b border-[var(--border)]">
        <h1 className="text-2xl font-extrabold tracking-wide text-[var(--primary)]">QuizGen AI</h1>
        <div className="space-x-4 flex items-center">
          <button
            onClick={handleToggle}
            className="p-2 rounded-full border border-[var(--border)] hover:bg-[var(--primary)] hover:text-white transition"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <Link to="/login">
            <button className="px-4 py-2 rounded-xl border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary-hover)] hover:text-white transition text-sm">
              Sign In
            </button>
          </Link>
          <Link to="/signup">
            <button className="px-4 py-2 rounded-xl bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] transition text-sm">
              Sign Up
            </button>
          </Link>
        </div>
      </nav>

      {/* Main content */}
      <div className="flex-grow flex flex-col">
        {/* HERO */}
        <div className="flex-grow flex items-center justify-center px-4">
          <header className="text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight max-w-3xl text-[var(--primary)] dark:text-[var(--text)]">
              Create AI-Generated Quizzes Instantly
            </h2>
            <p className="mt-3 text-lg md:text-xl max-w-2xl text-[var(--text-muted)] dark:text-[var(--text-muted)] mx-auto">
              QuizGen AI helps you turn any passage of text into smart, customizable multiple-choice questions using powerful language models.
            </p>
            <div className="mt-4 flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-2.5 rounded-xl bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] transition text-base">
                Try it Now
              </button>
              <button className="px-6 py-2.5 rounded-xl bg-white text-[var(--primary)] border border-[var(--primary)] hover:bg-[var(--primary-hover)] hover:text-white transition text-base">
                See Features
              </button>
            </div>
          </header>
        </div>

        {/* FEATURES */}
        <section className="py-6 px-6 text-[var(--text-muted)] dark:text-[var(--text-muted)]">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {[
              ['AI-Powered', 'Generate MCQs, true/false, and fill-in-the-blanks using top-tier LLMs.'],
              ['Customizable Output', 'Control difficulty, tone, export format, and more.'],
              ['Model Flexibility', 'Integrate OpenAI, Gemini, or your own local LLM endpoints.']
            ].map(([title, desc], i) => (
              <div key={i}>
                <h3 className="text-lg font-semibold mb-1 text-[var(--text)]">{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <footer className="py-4 text-center text-xs text-[var(--text-muted)] border-t border-[var(--border)] flex justify-center items-center gap-1">
        &copy; {new Date().getFullYear()} QuizGen AI. Built with <Heart className="h-4 w-4 text-pink-500" fill="currentColor" /> for learners and educators.
      </footer>
    </div>
  );
};

export default LandingPage;