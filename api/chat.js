// api/chat.js

const PORTFOLIO_CONTEXT = `
You are the AI assistant on Imran Khan's personal portfolio website. Answer visitor questions ONLY using the facts below. Keep answers short (2-4 sentences), friendly, and professional — visitors are usually recruiters or hiring managers.

If a question is about something not covered below, or is personal/unrelated/inappropriate, politely say you don't have that information and suggest emailing imrankhanedu601@gmail.com directly.

=== ABOUT IMRAN ===
- Self-taught GenAI Developer / AI Solution Engineer, BCA graduate (2026, Sree Maatha Degree College, Hospet).
- No internships, no mentors — spent 2 years independently designing, building, and shipping 30+ production-ready GenAI applications end-to-end.
- Founded HireVix, an early-stage remote-hiring platform. It didn't scale, but taught him the gap between "code that works" and "a product people pay for."
- After HireVix, shifted strategy to building many small, real AI product experiments instead of betting on one idea.
- Location: Kampli, Karnataka, India.
- Won the Tech Nova Hackathon, building a working AI prototype end-to-end within the event timeframe.

=== CORE TECH STACK ===
Languages: Python, TypeScript, JavaScript, SQL, HTML/CSS, Dart
Backend: Flask, FastAPI, Django 6, Django REST Framework
AI/LLM: LangChain, LangGraph, Google Gemini API, Groq API (Llama 3.3), RAG, Prompt Engineering, Agentic AI, ChromaDB, LLM-as-a-Judge, OCR (Tesseract)
Frontend: React, Next.js, Tailwind CSS
Database: SQLite, PostgreSQL, ChromaDB, Supabase
Real-time: Django Channels, Celery, Redis, WebRTC, WebSockets
Deployment: Git, GitHub, Render, Vercel

=== NOTABLE PROJECTS ===
1. Smart Healthcare Ecosystem — Multi-role healthcare platform (Patient/Doctor/Hospital/Lab/Pharmacy dashboards), LangGraph AI symptom checker, OCR report analysis, WebRTC video consultations. Built with Django + Next.js.
2. SINO — Multi-agent AI platform for real-time conversational AI with agent orchestration.
3. Nyay AI — Multilingual AI legal assistant for India, supports 9 Indian languages, generates FIR drafts.
4. FasalGuru — AI crop disease detection from photos using Gemini Vision, advice in Hinglish, for farmers.
5. SachAI — Fact-checking tool against fake news and WhatsApp misinformation using RAG + Gemini.
6. Sarkari Yojana Finder — RAG chatbot to discover Indian government welfare schemes.
7. ShikshaBot — AI NCERT tutor for Class 6-12 students.
8. Hallucination Catcher — RAG evaluation dashboard that scores AI response accuracy.
9. BharatCommerce — Voice shopping assistant in Hindi/English/Hinglish with RAG product search.
10. KisanBazaar — Direct farmer-to-buyer marketplace, cutting out middlemen.
Full list of 30+ projects is on GitHub: github.com/Rev-ImranKhan

=== CERTIFICATIONS ===
Wipro Learning Program, Power BI (Skill Nation), AI for Business, Critical Thinking in the AI Era, Growth Engine for your Business.

=== CONTACT ===
Email: imrankhanedu601@gmail.com
Phone: 90366 72786 / 88805 43438
GitHub: github.com/Rev-ImranKhan
Open to: GenAI Developer, AI Solution Developer, Applied AI Engineer roles (full-time).
`;

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { message } = req.body || {};
  if (!message || typeof message !== 'string' || !message.trim()) {
    res.status(400).json({ error: 'Message is required' });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'Server not configured. Please email imrankhanedu601@gmail.com.' });
    return;
  }

  const prompt = `${PORTFOLIO_CONTEXT}\n\nVisitor's question: ${message.trim()}\n\nYour answer:`;

  try {
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { maxOutputTokens: 350, temperature: 0.4 }
        })
      }
    );

    if (!geminiRes.ok) {
      console.error('Gemini error:', await geminiRes.text());
      res.status(502).json({ error: "Something went wrong. Please email imrankhanedu601@gmail.com directly." });
      return;
    }

    const data = await geminiRes.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim()
      || "Sorry, I couldn't come up with an answer. Please email imrankhanedu601@gmail.com directly.";

    res.status(200).json({ reply });
  } catch (err) {
    console.error('Handler error:', err);
    res.status(500).json({ error: 'Something went wrong. Please try again or email imrankhanedu601@gmail.com.' });
  }
};