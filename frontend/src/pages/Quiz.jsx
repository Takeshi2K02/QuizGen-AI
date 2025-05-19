import React, { useState, useEffect } from 'react';
import CommonLayout from '../layouts/CommonLayout';
import { generateQuiz, fetchMyQuizzes } from '../api/quizApi';

export default function Quiz() {
  const [passage, setPassage] = useState('');
  const [loading, setLoading] = useState(false);
  const [quizzes, setQuizzes] = useState([]);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    loadQuizzes();
  }, []);

  const loadQuizzes = async () => {
    try {
      const data = await fetchMyQuizzes();
      setQuizzes(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      await generateQuiz(passage);
      setPassage('');
      setSuccessMsg('✅ Quiz generated successfully!');
      await loadQuizzes();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CommonLayout>
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-[var(--primary)]">AI Quiz Generator</h1>
          <p className="mt-2 text-[var(--text-muted)]">Paste a passage to auto-generate a quiz with AI</p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleGenerate}
          className="bg-[var(--bg-subtle)] rounded-2xl shadow border border-[var(--border)] p-6 space-y-4"
        >
          <label className="block text-sm font-medium text-[var(--text-muted)] mb-1">
            Paste passage
          </label>
          <textarea
            rows={6}
            required
            className="w-full p-4 border rounded-xl bg-[var(--bg)] text-[var(--text)] border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            value={passage}
            onChange={(e) => setPassage(e.target.value)}
            placeholder="E.g. Photosynthesis is the process by which plants convert..."
          />

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

        {/* Quiz List */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Your Quizzes</h2>

          {quizzes.length === 0 ? (
            <p className="text-[var(--text-muted)] italic">No quizzes yet. Generate one above!</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {quizzes.map((quiz) => (
                <div
                  key={quiz._id}
                  className="rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] shadow p-4 hover:shadow-md transition"
                >
                  <h3 className="font-semibold text-lg text-[var(--primary)]">{quiz.title}</h3>
                  <p className="text-sm text-[var(--text-muted)] truncate">{quiz.description || 'No description'}</p>
                  <p className="text-xs text-[var(--text-muted)] mt-2">
                    {quiz.questions.length} question{quiz.questions.length !== 1 ? 's' : ''}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </CommonLayout>
  );
}