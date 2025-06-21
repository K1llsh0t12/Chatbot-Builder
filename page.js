'use client';
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState, useEffect } from "react";

export default function Page11() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [apiKey, setApiKey] = useState("");
  // Try to get 'from' from query param, else from document.referrer, else fallback to 'page6'
  const from = searchParams.get('from');
  const effectiveFrom = useMemo(() => {
    if (from && from !== 'null') return from;
    if (typeof window !== 'undefined' && document.referrer) {
      // Try to extract pageX from the referrer URL
      const match = document.referrer.match(/\/page(6|7|8|9|10)/);
      if (match) return match[0].replace('/',''); // e.g., 'page6'
    }
    return 'page6';
  }, [from]);

  // Save API key to backend when page loads (simulate API key generation)
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const generatedKey = 'API_KEY_' + Math.random().toString(36).substring(2, 16).toUpperCase();
    setApiKey(generatedKey);
    if (userId) {
      fetch('http://localhost:5000/save-api-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, apiKey: generatedKey })
      });
    }
  }, []);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[url('/BackGround.png')] bg-cover bg-center">
      <div className="flex flex-col items-center gap-6 w-full max-w-xl">
        <h1 className="custom-heading text-white" style={{ color: 'white', textAlign: 'center' }}>
          Embed the API into your code or website
        </h1>
        <div className="centered-box custom-text w-full flex flex-col items-center justify-center" style={{ minHeight: '120px', textAlign: 'center', gap: '16px' }}>
          <div className="centered-box2 custom-text w-full flex items-center justify-center" style={{ background: '#f3f3f3', color: '#222', border: '1px solid #ccc', minHeight: '48px', fontFamily: 'monospace', fontSize: '1.1rem' }}>
            {apiKey}
          </div>
        </div>
      </div>
      {/* Navigation arrow at the bottom left */}
      <div className="fixed left-10 bottom-10 w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center shadow cursor-pointer z-10 p-0" onClick={() => router.push(`/page10?from=${effectiveFrom}`)}>
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', fontSize: '1.7rem', fontWeight: 'bold', color: 'black' }}>&larr;</span>
      </div>
    </div>
  );
}
