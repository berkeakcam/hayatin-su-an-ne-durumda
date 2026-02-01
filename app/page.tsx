export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl font-bold mb-4">
  Hayatın Şu An Ne Durumda?
</h1>

<p className="text-lg text-gray-600 mb-8">
  Kimseye anlatmadan kendine dürüst ol.
</p>
    

      <a
        href="/test"
        className="bg-black text-white px-6 py-3 rounded-lg text-lg rounded-xl"
      >
        Teste Başla →
      </a>
    </main>
  );
}
