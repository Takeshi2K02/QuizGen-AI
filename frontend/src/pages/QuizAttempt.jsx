import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommonLayout from '../layouts/CommonLayout';
import { getQuizById } from '../api/quizApi';

export default function QuizAttempt() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const data = await getQuizById(id);
        setQuiz(data);
      } catch (err) {
        setError('Failed to load quiz');
      } finally {
        setLoading(false);
      }
    };
    loadQuiz();
  }, [id]);

  const handleSelect = (qIndex, optionIndex) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qIndex]: optionIndex }));
  };

  const handleSubmit = () => {
    let score = 0;
    quiz.questions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswers[0]) score++;
    });
    setScore(score);
    setSubmitted(true);
  };

  return (
    <CommonLayout>
      <div className="max-w-3xl mx-auto space-y-8">
        {loading ? (
          <p className="text-center text-sm text-[var(--text-muted)]">Loading quiz...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : quiz ? (
          <>
            {/* Quiz Header */}
            <div className="text-center">
              <h1 className="text-3xl font-extrabold text-[var(--primary)]">{quiz.title}</h1>
              <p className="text-sm text-[var(--text-muted)]">{quiz.description}</p>
            </div>

            {/* Questions */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="space-y-6"
            >
              {quiz.questions.map((q, idx) => (
                <div key={q._id} className="p-4 border rounded-xl bg-[var(--bg-subtle)] border-[var(--border)]">
                  <p className="font-semibold text-[var(--text)] mb-2">{idx + 1}. {q.prompt}</p>
                  <div className="space-y-2">
                    {q.options.map((option, i) => (
                      <label key={i} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name={`question-${idx}`}
                          value={i}
                          checked={answers[idx] === i}
                          onChange={() => handleSelect(idx, i)}
                          className="accent-[var(--primary)]"
                          disabled={submitted}
                        />
                        <span className="text-sm text-[var(--text)]">{option}</span>
                      </label>
                    ))}
                  </div>

                  {/* Show feedback if submitted */}
                  {submitted && (
                    <div className="mt-2 text-sm">
                      {answers[idx] === q.correctAnswers[0] ? (
                        <span className="text-green-600 font-medium">✅ Correct</span>
                      ) : (
                        <span className="text-red-600 font-medium">❌ Incorrect</span>
                      )}
                      <p className="text-[var(--text-muted)] mt-1">Explanation: {q.explanation}</p>
                    </div>
                  )}
                </div>
              ))}

              {/* Submit Button or Score */}
              <div className="text-center mt-6">
                {submitted ? (
                  <p className="text-xl font-bold text-[var(--primary)]">
                    You scored {score} out of {quiz.questions.length}
                  </p>
                ) : (
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-[var(--primary)] text-white font-semibold hover:bg-[var(--primary-hover)] transition"
                  >
                    Submit Quiz
                  </button>
                )}
              </div>
            </form>
          </>
        ) : null}
      </div>
    </CommonLayout>
  );
}