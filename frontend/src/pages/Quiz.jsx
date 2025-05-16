import React from 'react';
import { PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CommonLayout from '../layouts/CommonLayout';

export default function Quiz() {
  const navigate = useNavigate();

  return (
    <CommonLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Your Quizzes</h1>
        <button
          onClick={() => navigate('/quiz/create')}
          className="flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-white rounded-md font-medium hover:bg-[var(--primary-hover)] transition"
        >
          <PlusCircle size={18} /> Create Quiz
        </button>
      </div>

      {/* Placeholder for quiz listing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Example card */}
        <div className="border border-[var(--border)] rounded-xl bg-[var(--bg-subtle)] p-4 shadow-sm hover:shadow-md transition">
          <h2 className="text-lg font-semibold text-[var(--text)] mb-1">Science Quiz</h2>
          <p className="text-sm text-[var(--text-muted)]">10 questions · Medium</p>
        </div>

        {/* Repeat above block for each quiz when mapped from data */}
      </div>
    </CommonLayout>
  );
}