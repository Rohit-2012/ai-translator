"use client"
import 'regenerator-runtime/runtime';
import TextArea from "@/components/inputs/TextArea";
import { ChangeEvent, useState } from "react";
import SpeechRecognitionComponent from '@/components/speechRecognition/SpeechRecognitionComponent';
import { IconCopy, IconStar, IconVolume } from '@tabler/icons-react';
import FileUpload from '@/components/inputs/FileUpload';
import { rtfToText } from '@/utils/rtfToText';
import useTranslate from '@/hooks/useTranslate';
import LanguageSelector from '@/components/inputs/LanguageSelector';

export default function Home() {

  const [sourceText, setSourceText] = useState<string>("")
  const [copied, setCopied] = useState<boolean>(false)
  const [selectedLanguage, setSelectedLanguage] = useState<string>("French")

  const translatedText = useTranslate(sourceText, selectedLanguage)

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const rtfContent = reader.result as string;
        const text = rtfToText(rtfContent);
        setSourceText(text);
      };
      reader.readAsText(file);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(translatedText)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  const handleAudioPlayback = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text)
    window.speechSynthesis.speak(utterance)
  }

  return (
    <div className='h-screen overflow-hidden flex items-center justify-center'>
      <div className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="relative overflow-hidden h-screen">
          <div className="max-w-[85rem] mx-auto px-4 sm:px-6 py-10 sm:py-24">
            <div className="text-center">
              <h1 className="text-4xl sm:text-6xl font-bold text-neutral-200">
                AI <span className="text-cyan-500">Translate</span>
              </h1>
              <p className="mt-3 text-neutral-400">
                AI Translate: Translate your text into any language with AI.
              </p>

              <div className="mt-7 sm:mt-12 mx-auto max-w-3xl relative">
              <div className="grid gap-4 md:grid-cols-2 grid-cols-1">
                <div className="relative z-10 flex flex-col space-x-3 p-3  border rounded-lg shadow-lg  bg-neutral-900 border-neutral-700 shadow-gray-900/20">
                    <TextArea id="source-language" value={sourceText} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                      setSourceText(e.target.value)
                    }} placeholder="Enter the text here" />
                    
                    <div className="flex flex-row justify-between w-full">
                      <span className="cursor-pointer flex space-x-2 flex-row">
                        <SpeechRecognitionComponent setSourceText={setSourceText} />
                        <IconVolume size={22} onClick={() => handleAudioPlayback(sourceText)} />
                        <FileUpload handleFileUpload={handleFileUpload} />
                      </span>
                      <span className='text-sm pr-4'>
                        {sourceText.length}/2000
                      </span>
                    </div>
                  </div>

                  <div className="relative z-10 flex flex-col space-x-3 p-3  border rounded-lg shadow-lg  bg-neutral-900 border-neutral-700 shadow-gray-900/20">
                    <TextArea id="target-language" value={translatedText} onChange={() => { }} placeholder='Translated text will appear here' />
                    <div className='flex flex-row justify-between w-full'>
                      <span className='cursor-pointer flex space-x-2 flex-row items-center'>
                        <LanguageSelector selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} />
                        <IconVolume size={22} onClick={() => handleAudioPlayback(translatedText)} />
                      </span>
                      <div className="flex flex-row items-center space-x-2 pr-4 cursor-pointer">
                        <IconCopy size={22} onClick={handleCopyToClipboard} />
                        {copied && <span className='text-xs text-green-500'>Copied!</span>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
