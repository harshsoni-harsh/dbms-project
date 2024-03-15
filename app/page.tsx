'use client';

import { useEffect, useRef, useState } from 'react';

async function fetchData(query: string) {
    const res = await fetch(`/api/execute`, {
        method: 'POST',
        body: JSON.stringify({ query })
    });
    if(!res.ok) throw new Error(`Failed to fetch /api ${res.status}`);
    return res.json();
}

export default function Home() {
    const queryArea = useRef<HTMLTextAreaElement>(null);
    const [result, setResult] = useState('Your result appears here...');

    const cb = async () => {
        if(!queryArea.current) return;
        if(!queryArea.current.value) return;
        try {
            const data = await fetchData(queryArea.current.value);
            setResult(JSON.stringify(data, null, 2));
        } catch(err) {
            setResult(JSON.stringify(err, null, 2));
        }
    };

return (
        <div className='flex flex-col p-2 gap-2 w-full h-full items-center justify-center'>
            <div className='relative h-1/2 w-full'>
                <textarea ref={queryArea} className='rounded-md h-full w-full border-2 border-black p-2 resize-none' placeholder='Write your query here...'></textarea>
                <button 
                    className='absolute left-full top-full -translate-x-full -translate-y-full p-2 w-32 -m-2 bg-blue-500 hover:bg-blue-600 font-bold rounded-md'
                    onClick={cb} 
                >
                    Run Query
                </button>
            </div>
            <div className='rounded-md h-1/2 w-full border-2 border-black p-2 whitespace-pre grow-0 overflow-scroll'>{ result }</div>
        </div>
    );
}
