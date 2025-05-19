import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CommonLayout from '../layouts/CommonLayout';
import { generateQuiz, getMyQuizzes } from '../api/quizApi';

export default function Quiz() {
  const [title, setTitle] = useState('');
  const [passage, setPassage] = useState('');
  const [total, setTotal] = useState(5);
  const [difficulty, setDifficulty] = useState('medium');
  const [loading, setLoading] = useState(false);
  const [quizzes, setQuizzes] = useState([]);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    loadQuizzes();
  }, []);

  const loadQuizzes = async () => {
    try {
      const data = await getMyQuizzes();
      setQuizzes(data);
    } catch (err) {
      setError(err.message || 'Failed to load quizzes.');
    }
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      await generateQuiz({ title, passage, total, difficulty });
      setTitle('');
      setPassage('');
      setSuccessMsg('✅ Quiz generated successfully!');
      await loadQuizzes();
    } catch (err) {
      setError(err.response?.data?.error || 'Quiz generation failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CommonLayout>
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-[var(--primary)]">AI Quiz Generator</h1>
          <p className="mt-2 text-[var(--text-muted)]">Generate a quiz using Gemini</p>
        </div>

        <form
          onSubmit={handleGenerate}
          className="bg-[var(--bg-subtle)] rounded-2xl shadow border border-[var(--border)] p-6 space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-[var(--text-muted)] mb-1">Quiz Title</label>
            <input
              type="text"
              required
              className="w-full p-2 rounded-lg border bg-[var(--bg)] border-[var(--border)]"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Generative AI Basics"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-muted)] mb-1">Paste passage</label>
            <textarea
              rows={6}
              required
              className="w-full p-4 border rounded-xl bg-[var(--bg)] text-[var(--text)] border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              value={passage}
              onChange={(e) => setPassage(e.target.value)}
              placeholder="E.g. Generative AI refers to..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-muted)] mb-1">Total Questions</label>
              <input
                type="number"
                min={1}
                required
                className="w-full p-2 rounded-lg border bg-[var(--bg)] border-[var(--border)]"
                value={total}
                onChange={(e) => setTotal(Number(e.target.value))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text-muted)] mb-1">Difficulty</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full p-2 rounded-lg border bg-[var(--bg)] border-[var(--border)]"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-[var(--primary)] text-white font-semibold hover:bg-[var(--primary-hover)] transition w-full"
          >
            {loading ? 'Generating...' : 'Generate Quiz'}
          </button>

          {successMsg && <p className="text-green-600 text-sm">{successMsg}</p>}
          {error && <p className="text-red-600 text-sm">{error}</p>}
        </form>

        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Your Quizzes</h2>
          {quizzes.length === 0 ? (
            <p className="text-[var(--text-muted)] italic">No quizzes yet. Generate one above!</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {quizzes.map((quiz) => (
                <Link to={`/quiz/${quiz._id}`} key={quiz._id}>
                  <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] shadow p-4 hover:shadow-md transition">
                    <h3 className="font-semibold text-lg text-[var(--primary)]">{quiz.title}</h3>
                    <p className="text-xs text-[var(--text-muted)] mt-2">
                      {quiz.questions.length} question{quiz.questions.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </CommonLayout>
  );
}
