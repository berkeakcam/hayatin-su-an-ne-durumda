import { Suspense } from "react";
import ResultClient from "./ResultClient";

export default function ResultPage() {
  return (
    <Suspense fallback={<div className="p-6 text-center">Yükleniyor...</div>}>
      <ResultClient />
    </Suspense>
  );
}
