# QuizGen AI – AI-Powered MCQ Generator for Smarter Assessments

QuizGen AI is an intelligent, full-featured quiz generation platform powered by large language models (LLMs) such as OpenAI, Gemini, and local AI deployments like LM Studio and Ollama. It transforms any textual passage into high-quality multiple-choice questions (MCQs) with contextual accuracy, flexible answer generation, and automated evaluation.

Designed for educators, learners, developers, and training institutions, QuizGen AI streamlines the creation, customization, and management of AI-generated assessments, quizzes, and practice tests.

---

## Table of Contents

- [Features](#features)
- [Use Cases](#use-cases)
- [How It Works](#how-it-works)
- [Multi-LLM Integration](#multi-llm-integration)
- [Prompt Configuration](#prompt-configuration)
- [Data Structure](#data-structure)
- [Planned Backend Enhancements](#planned-backend-enhancements)
- [Why QuizGen AI](#why-quizgen-ai)
- [Getting Started](#getting-started)
- [License](#license)

---

## Features

### 1. Core Functionalities

- **Passage-to-Question AI Generation**: Paste any paragraph or passage and receive a complete MCQ with five options.
- **Interactive Answer Selection**: Options rendered with radio buttons, allowing immediate selection.
- **Answer Confirmation System**: Validate selected answers using a dedicated \"Confirm\" button.
- **Correctness Feedback**: Get instant feedback on whether your answer is correct or incorrect.
- **Question Reset or Retry**: Clear responses and generate a new question from the same or different passage.
- **Multi-Question Quiz Mode**: Future support for generating a set of questions in sequence.

### 2. AI-Driven Customization

- **Difficulty Control**: Choose difficulty level (easy, medium, hard) before generating questions.
- **Question Format Selection**: Generate various types of questions (MCQ, true/false, fill-in-the-blank).
- **Answer Explanation (Optional)**: Enable users to receive concise explanations for the correct answers.
- **Styling and Tone Options**: Select between formal, conversational, or exam-style question structures.
- **Automatic Subject Tagging**: AI-generated tags based on passage content (e.g., science, AI, geography).

### 3. User-Centric Enhancements

- **Answer Review Mode**: Review all attempted answers, including explanations and correctness.
- **Score Tracking System**: Track progress across multiple questions during a quiz session.
- **Question Bookmarking**: Save generated questions to a local collection for future reference.
- **Quiz Export Options**: Export questions in formats such as PDF, Word, CSV, and JSON.
- **Pagination for Quiz Flow**: Navigate smoothly through multi-question quizzes with previous/next buttons.

---

## Use Cases

### Ideal For:

- **Educators and Teachers**: Automate quiz preparation for classes and assessments.
- **Students and Self-Learners**: Practice comprehension and test readiness using custom-generated questions.
- **eLearning Platforms**: Integrate with LMS systems to provide dynamic content generation.
- **Corporate Trainers**: Create domain-specific quizzes from training content instantly.
- **EdTech Developers**: Build custom learning experiences powered by AI-based question engines.

---

## How It Works

1. **Paste a passage** of your choice into the prompt field.
2. **Select your preferred LLM provider** (e.g., OpenAI, Gemini, or local model).
3. **Customize prompt options** such as difficulty, tone, and output format.
4. **Click generate** to receive a question and five AI-generated answer choices.
5. **Select and confirm** your answer to receive correctness feedback.
6. **Optionally export or save** the question for future use.

---

## Multi-LLM Integration

QuizGen AI is model-agnostic and supports:

- **OpenAI GPT Models** (via API key)
- **Google Gemini Pro & Flash** (via API key)
- **Local LLMs** such as:
  - **LM Studio**
  - **Ollama**
  - **Any OpenAI-compatible local server**

Users can add, switch, or remove their API keys dynamically and test different providers from the same interface.

---

## Prompt Configuration

QuizGen AI includes a flexible prompt template system allowing:

- Fine-grained prompt control
- Structured formatting enforcement (e.g., numbering `1.` to `5.`)
- Appending extra instructions such as:
  - `Correct: 3`
  - `Explain your answer briefly`
  - `Limit question to 15 words`

---

## Data Structure

Generated questions follow a consistent schema:

```json
{
  "question": "What is the main goal of artificial intelligence?",
  "answers": [
    "To entertain humans",
    "To automate human-like thinking",
    "To produce electricity",
    "To replicate plants",
    "To replace the internet"
  ],
  "correctIndex": 1
}
