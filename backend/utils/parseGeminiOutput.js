export function parseGeminiOutput(response) {
  const rawText = response?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) throw new Error('Empty Gemini response');

  try {
    const blocks = rawText
      .split(/\n\s*\n/)
      .filter((block) =>
        /Correct:\s*\[\d\]/.test(block) && /\d\.\s/.test(block)
      );

    const grouped = [];
    let temp = '';

    for (let line of blocks) {
      temp += line + '\n';
      if (/Correct:\s*\[\d\]/.test(line)) {
        grouped.push(temp.trim());
        temp = '';
      }
    }

    const parsed = grouped.map((block) => {
      const correctMatch = block.match(/Correct:\s*\[(\d)\]/);
      const correct = correctMatch ? parseInt(correctMatch[1]) - 1 : null;
      const cleanText = block.replace(/Correct:\s*\[\d\]/, '').trim();

      const explanationMatch = block.match(/Explanation:\s*(.*)/);
      const explanation = explanationMatch ? explanationMatch[1].trim() : '';

      const lines = cleanText.split('\n');
      const questionLine = (lines[0] || 'No question found').replace(/^\d+\.\s*/, '');
      const answers = lines
        .slice(1)
        .filter(line => /^\d\.\s/.test(line))
        .map(line => line.replace(/^\d\.\s/, '').trim());

      return {
        prompt: questionLine,
        type: 'single',
        options: answers,
        correctAnswers: [correct],
        explanation,
      };
    });

    return parsed;
  } catch (err) {
    throw new Error('Gemini parsing failed: ' + err.message);
  }
}
