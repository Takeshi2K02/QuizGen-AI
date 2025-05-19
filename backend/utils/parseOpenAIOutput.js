export function parseOpenAIOutput(rawText) {
  if (!rawText) throw new Error('Empty OpenAI response');

  try {
    const cleaned = rawText
      .replace(/```json/g, '')   // remove markdown json tag
      .replace(/```/g, '')       // remove closing markdown
      .replace(/[\u201C\u201D]/g, '"') // curly quotes → normal
      .replace(/[\u2018\u2019]/g, "'");

    const parsed = JSON.parse(cleaned);

    if (!Array.isArray(parsed)) throw new Error('Expected JSON array of questions');

    const validated = parsed.map((q, index) => {
      if (
        !q.question ||
        !Array.isArray(q.options) ||
        q.options.length < 2 ||
        (!Array.isArray(q.correctAnswers) && typeof q.correctIndex !== 'number')
      ) {
        throw new Error(`Invalid format at index ${index}`);
      }

      return {
        prompt: q.question,
        type: q.type || 'single',
        options: q.options,
        correctAnswers: q.correctAnswers ?? [q.correctIndex],
        explanation: q.explanation ?? '',
      };
    });

    return validated;
  } catch (err) {
    throw new Error('OpenAI parsing failed: ' + err.message);
  }
}
