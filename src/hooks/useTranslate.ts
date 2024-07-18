import { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const useTranslate = (sourceText: string, selectedLanguage: string) => {
  const [translatedText, setTranslatedText] = useState<string>("");

  const prompt = `You will be provided with a sentence. This sentence: ${sourceText}.
    Your tasks are to:
    - detect what language the sentence is in
    - translate the sentence into ${selectedLanguage}
    do not return anything other than the translated sentence
    `;

  useEffect(() => {
    const handleTranslate = async () => {
      try {
          const result = await model.generateContent(prompt);
          const response = result.response
        const text = response.text()
        setTranslatedText(text)
      } catch (error) {
        console.log('Error translating text:', error)
      }
    }
    if (sourceText.trim()) {
      const timeoutId = setTimeout(() => {
        handleTranslate()
      }, 500)
      return () => clearTimeout(timeoutId)
    }
  }, [sourceText, selectedLanguage]);

  return translatedText
};

export default useTranslate