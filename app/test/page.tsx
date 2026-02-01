"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const questions = [
  {
    text: "Ay sonu geldiğinde para durumu genelde?",
    options: [
      { label: "Bitmiş olur, eksiye bakarım", score: 0 },
      { label: "Zor yetiyor", score: 5 },
      { label: "Rahatım, hatta kenara koyarım", score: 10 },
    ],
  },
  {
    text: "Sabah uyanınca ilk his?",
    options: [
      { label: "Yine mi ya…", score: 0 },
      { label: "Nötr, alışılmış", score: 5 },
      { label: "Bugün fena olmayacak", score: 10 },
    ],
  },
  {
    text: "Son 1 haftada kaç işi erteledin?",
    options: [
      { label: "Saymayı bıraktım", score: 0 },
      { label: "Birkaç tane", score: 5 },
      { label: "Neredeyse hiç", score: 10 },
    ],
  },
  {
    text: "Gün içinde kendin için yaptığın bir şey?",
    options: [
      { label: "Hiç yok", score: 0 },
      { label: "Arada bir", score: 5 },
      { label: "Bilerek zaman ayırıyorum", score: 10 },
    ],
  },
  {
    text: "Son 1 ayda kaç kez 'keşke' dedin?",
    options: [
      { label: "Çok fazla", score: 0 },
      { label: "Arada", score: 5 },
      { label: "Nadiren", score: 10 },
    ],
  },
  {
    text: "Hayat şu an sana daha çok ne yapıyor?",
    options: [
      { label: "Yoruyor", score: 0 },
      { label: "Taşıyor", score: 5 },
      { label: "Güç veriyor", score: 10 },
    ],
  },
  {
    text: "Günlerin çoğu nasıl geçiyor?",
    options: [
      { label: "Aynı, birbirine karışıyor", score: 0 },
      { label: "Yoğun ama idare eder", score: 5 },
      { label: "Dolu ve anlamlı", score: 10 },
    ],
  },
  {
    text: "Geleceğe bakınca?",
    options: [
      { label: "Belirsizlik görüyorum", score: 0 },
      { label: "Kararsızım", score: 5 },
      { label: "Netim", score: 10 },
    ],
  },
  {
    text: "Şu anki hayatın, hayal ettiğin hayata?",
    options: [
      { label: "Çok uzak", score: 0 },
      { label: "Kısmen yakın", score: 5 },
      { label: "Oldukça yakın", score: 10 },
    ],
  },
  {
    text: "Genel olarak son 1 ay?",
    options: [
      { label: "Beni yıprattı", score: 0 },
      { label: "Ne iyi ne kötü", score: 5 },
      { label: "İyi geldi", score: 10 },
    ],
  },
];


export default function TestPage() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const router = useRouter();

  const handleAnswer = (value: number) => {
    const newScore = score + value;

    if (current + 1 < questions.length) {
      setScore(newScore);
      setCurrent(current + 1);
    } else {
      const maxScore = questions.length * 10;
const percentage = Math.round((newScore / maxScore) * 100);

router.push(`/result?score=${percentage}`);

    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="text-sm text-gray-500 mb-4">
        Soru {current + 1} / {questions.length}
      </p>

      <h2 className="text-2xl font-semibold mb-8">
        {questions[current].text}
      </h2>

      <div className="w-full max-w-md space-y-4">
        {questions[current].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option.score)}
            className="w-full border border-gray-300 py-3 rounded-lg text-lg hover:bg-gray-100"
          >
            {option.label}
          </button>
        ))}
      </div>
    </main>
  );
}
