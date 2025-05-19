export function parseGeminiOutput(response) {
  const text = response.candidates?.[0]?.content?.parts?.[0]?.text;
  try {
    const match = text.match(/{[\s\S]*}/); // Extract JSON block
    if (!match) throw new Error('Invalid format from Gemini');

    return JSON.parse(match[0]);
  } catch (err) {
    throw new Error('Parsing Gemini response failed: ' + err.message);
  }
}