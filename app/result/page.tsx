"use client";

import { useSearchParams } from "next/navigation";

const lowAdvice = [
  "Bugün tek bir şey yapacaksan, ertelediğin küçük bir işi bitir.",
  "Bugün tek bir şey yapacaksan, yapılacaklar listesinden sadece 1 maddeyi sil.",
  "Bugün tek bir şey yapacaksan, yarım bıraktığın bir şeye 10 dakika ayır.",
];

const midAdvice = [
  "Bugün tek bir şey yapacaksan, kendin için 20 dakikalık boş bir alan yarat.",
  "Bugün tek bir şey yapacaksan, telefonu bir kenara bırakıp kısa bir yürüyüş yap.",
  "Bugün tek bir şey yapacaksan, seni yoran bir şeye küçük bir sınır koy.",
];

const highAdvice = [
  "Bugün tek bir şey yapacaksan, bu düzeni bozmamaya odaklan.",
  "Bugün tek bir şey yapacaksan, iyi giden bir alışkanlığı bilinçli şekilde sürdür.",
  "Bugün tek bir şey yapacaksan, yarın için küçük bir plan yap.",
];

const getRandomAdvice = (list: string[]) => {
  return list[Math.floor(Math.random() * list.length)];
};

export default function ResultPage() {
  const searchParams = useSearchParams();
  const scoreParam = searchParams.get("score");
  const score = Number(scoreParam);

  let title = "";
  let description = "";
  let personalInsight = "";
  let adviceText = "";

  if (score <= 39) {
    title = "Alarm Seviyesi 🚨";
    description =
      "Şu an hayat seni ileri taşımıyor, sadece sürüklüyor. " +
      "Bunu yaşayan çok kişi var ama bu durum normal olduğu anlamına gelmiyor. " +
      "Yorgunluk, erteleme ve mutsuzluk birikmiş olabilir. " +
      "Bu bir son değil ama net bir uyarı: Bu şekilde devam edersen daha da zorlaşır. " +
      "İyi haber şu: Küçük ama bilinçli değişiklikler bu tabloyu gerçekten kırabilir.";

    personalInsight =
      "Bu puanı alan insanlar genelde çok şeyi tek başına taşıyor ama bunu kimseye göstermiyor.";

    adviceText = getRandomAdvice(lowAdvice);
  } else if (score <= 69) {
    title = "İdare Ediyor 😐";
    description =
      "Hayat şu an ne çok kötü ne de tatmin edici. " +
      "Bir şeyler yürüyor ama seni gerçekten mutlu etmiyor. " +
      "Muhtemelen günler geçiyor ama iz bırakmıyor. " +
      "Bu seviyede en tehlikeli şey alışmak. " +
      "Çünkü küçük adımlar atılmazsa zaman geçiyor ama hayat ilerlemiyor.";

    personalInsight =
      "Bu puanı alanlar çoğu zaman \"idare ediyorum\" diyor ama aslında daha fazlasını istiyor.";

    adviceText = getRandomAdvice(midAdvice);
  } else {
    title = "İyi Gidiyor 💪";
    description =
      "Hayatının kontrolü büyük ölçüde sende. " +
      "Herkes mükemmel değil ama sen yönü elinde tutuyorsun. " +
      "Bu seviyeye çıkabilen insan sayısı sandığından az. " +
      "Önemli olan nokta şu: Burada durmak değil, bunu sürdürebilmek. " +
      "Doğru alışkanlıklar seni çok daha yukarı taşıyabilir.";

    personalInsight =
      "Bu puanı alanlar genelde hayatında bazı şeyleri bilinçli seçmiş insanlar.";

    adviceText = getRandomAdvice(highAdvice);
  }

  const shareText = `Hayatımın şu anki durumu %${score} çıktı 😅

Bugün bana şu önerildi:
"${adviceText}"

Sen de bak:
${window.location.origin}`;


  const share = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Hayat Karnesi",
        text: shareText,
      });
    } else {
      await navigator.clipboard.writeText(shareText);
      alert("Paylaşım metni kopyalandı!");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl font-bold mb-4">%{score}</h1>

      <h2 className="text-2xl font-semibold mb-4">{title}</h2>

      <p className="text-gray-600 max-w-md mb-4">{description}</p>

      <p className="text-sm text-gray-500 italic max-w-md mb-6">
        {personalInsight}
      </p>

      <div className="bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 max-w-md mb-8">
        <p className="text-sm font-semibold mb-1">Bugün için öneri</p>
        <p className="text-sm text-gray-700">{adviceText}</p>
      </div>

      <button
        onClick={share}
        className="bg-black text-white px-6 py-3 rounded-lg text-lg mb-4"
      >
        Paylaş
      </button>

      <a href="/" className="text-gray-500 underline">
        Testi tekrar çöz
      </a>
    </main>
  );
}