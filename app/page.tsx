"use client";

import Banner from "@/components/Banner";
import { Volume2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [word, setWord] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dictionary, setDictionary] = useState<any>();

  const handleTextToSpeech = (text: string) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, Your browser does not support text to speech");
    }
  };

  useEffect(() => {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then(async (res) => {
        const data = await res.json();
        setDictionary(data);
        setIsLoading(false);

        const track: any = {
          url: data[0]?.phonetics[0]?.audio,
          title: word,
          tags: [word],
        };

        console.log(data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, [word]);

  return (
    <main>
      <Banner changeWord={setWord} word={word} setIsLoading={setIsLoading} isLoading={isLoading} />
      <section className="absolute top-[400px] bg-white w-[80%] ml-[10%] shadow-2xl p-5 rounded-2xl mb-20">
        <div className="flex justify-between">
          <span className="shadow-md px-6 py-2 rounded-lg bg-green-600 text-white">
            {" "}
            <span className="h-[10px] w-[10px] bg-yellow-300 rounded-full inline-block"></span> {word}
          </span>
          <h1 className=" text-xl font-extrabold text-gray-900  md:text-2xl lg:text-3xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">FIND IN</span>{" "}
            LEXICONARY
          </h1>
          {dictionary?.length && (
            <div className="flex flex-row gap-2">
              <span className="shadow-md px-6 py-2 rounded-lg bg-blue-600 text-white">
                {" "}
                <span className="h-[10px] w-[10px] bg-blue-300 rounded-full inline-block"></span>{" "}
                {`phonetic:${dictionary[0]?.phonetics[1]?.text}`}
              </span>
              <span className="shadow-md px-2 py-2 rounded-lg bg-blue-600 text-white">
                <Volume2 className="cursor-pointer" onClick={() => handleTextToSpeech(word)} />
              </span>
            </div>
          )}
        </div>
        {dictionary?.length &&
          dictionary[0]?.meanings.map((data: any, index: number) => (
            <section key={index} className="mt-8 shadow-2xl p-5 rounded-xl bg-gray-100 ">
              <span className="shadow-md px-6 py-3 rounded-lg font-semibold bg-gray-600 text-white flex items-center justify-between max-w-[150px]">
                {" "}
                <span className="h-[10px] w-[10px] bg-white rounded-full inline-block"></span>MEANING
              </span>

              <div>
                <span className="shadow-sm mt-4 px-3 py-2 rounded-full font-semibold bg-white text-green-700 flex items-center justify-between max-w-[330px]">
                  {" "}
                  <span className="h-[10px] w-[10px] bg-yellow-300 rounded-full inline-block"></span>Part of speech{" "}
                  <span className="shadow-md px-6 py-2 rounded-full font-semibold bg-green-600 text-white flex items-center justify-between max-w-[400px]">
                    {" "}
                    {data.partOfSpeech}
                  </span>{" "}
                </span>
                {data.definitions.map((e: any, i: any) => (
                  <p key={i} className="py-3 text-gray-600 bg-white mt-4 px-4 rounded-lg">
                    {e.definition}
                  </p>
                ))}
              </div>
            </section>
          ))}
      </section>
    </main>
  );
}

