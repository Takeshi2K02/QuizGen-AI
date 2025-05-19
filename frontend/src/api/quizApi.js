const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

export async function generateQuiz(passage, title = 'Untitled Quiz', description = '') {
  const token = localStorage.getItem('token');

  const res = await fetch(`${API_BASE}/quizzes/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ passage, title, description }),
  });

  if (!res.ok) {
    throw new Error('Failed to generate quiz');
  }

  return await res.json();
}

export async function fetchMyQuizzes() {
  const token = localStorage.getItem('token');

  const res = await fetch(`${API_BASE}/quizzes/my`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch quizzes');
  }

  return await res.json();
}