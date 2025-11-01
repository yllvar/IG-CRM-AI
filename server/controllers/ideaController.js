// import { openai } from "../utils/openai.js";
import ContentIdea from "../models/ContentIdea.model.js";
import { ai } from '../utils/gemini.js';

export const generateIdea = async (req, res) => {
  const { topic, niche } = req.body;

  try {
    const result = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `You are a content strategist. Generate 5 unique short Instagram reel ideas for the topic "${topic}" in the niche "${niche}". Keep them punchy and list them as bullet points.

Also provide:
- A caption
- A list of 5 relevant hashtags
- An engaging hook

Format:
Reel Idea:
1. [idea 1]
2. [idea 2]
3. [idea 3]
4. [idea 4]
5. [idea 5]

Caption: [caption here]
Hashtags: [#tag1 #tag2 #tag3 #tag4 #tag5]
Hook: [engaging hook]`
    });

    const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      console.error('⚠️ No content generated:', result);
      return res.status(500).json({ error: 'Failed to generate content.' });
    }

    // Regex extractions
    const captionMatch = text.match(/Caption:\s*(.*)/i);
    const hashtagsMatch = text.match(/Hashtags:\s*(.*)/i);
    const hookMatch = text.match(/Hook:\s*(.*)/i);

    // Extract reel ideas (1. idea1 … 5. idea5)
    const ideaMatches = [...text.matchAll(/\d\.\s*(.+)/g)];
    const ideas = ideaMatches.map((m) => m[1].replace(/\*/g, '').trim());

    const clean = (str) => str?.replace(/\*/g, '').replace(/^\[|\]$/g, '').trim();

    const hashtagsRaw = clean(hashtagsMatch?.[1] || '');
    const hashtags = hashtagsRaw
      .split(/\s+/)
      .map((tag) => tag.replace(/\*/g, '').trim())
      .filter((tag) => tag.startsWith('#'));

    res.json({
      idea: ideas, // now an array of 5 ideas
      caption: clean(captionMatch?.[1] || ''),
      hashtags,
      hook: clean(hookMatch?.[1] || '')
    });

  } catch (error) {
    console.error('❌ Error generating idea:', error);
    res.status(500).json({ error: 'Failed to generate content.' });
  }
};


export const getAllIdeas = async (req, res) => {
  try {
    const ideas = await ContentIdea.find().sort({ createdAt: -1 });
    res.status(200).json(ideas);
  } catch (error) {
    console.error("Error fetching ideas:", error);
    res.status(500).json({ error: "Failed to fetch content ideas" });
  }
};

