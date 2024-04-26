"use client";

import { useState } from "react";
import { v4 as uuid } from "uuid";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

interface responseType {
  query: string;
  text: string;
  id: string;
  responseTime: number;
}

const DBAdmin = () => {
  const [data, setData] = useState<responseType[]>([]);
  const [input, setInput] = useState("");
  const sendReq = async () => {
    const startTime = Date.now();
    const response = await fetch("/api/db-query", {
      method: "POST",
      body: input,
    });
    const endTime = Date.now();
    const newData = await response.json();
    const indentedJSON = JSON.stringify(newData, null, 2);
    setData([
      {
        query: input,
        text: indentedJSON,
        id: uuid(),
        responseTime: (endTime - startTime) / 1000,
      },
      ...data,
    ]);
  };

  const clearRes = () => {
    setData([]);
  };

  return (
    <div className="p-4 flex flex-col gap-6 h-full">
      <div className="w-full flex flex-col gap-4">
        <p className="text-2xl">Input SQL Query</p>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-zinc-700 rounded-md p-2 px-4 shrink-0"
        />
        <div className="flex gap-4">
          <button
            className="self-start bg-zinc-700 p-2 rounded-md"
            onClick={sendReq}
          >
            Run Query
          </button>
          <button
            className="self-start bg-zinc-700 p-2 rounded-md"
            onClick={clearRes}
          >
            Clear results
          </button>
        </div>
      </div>
      {data.length !== 0 && (
        <div className="flex flex-col gap-4">
          <p className="text-2xl">Query Result</p>
          <div key={data[0].id} className="h-fit w-full flex">
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel className="rounded-md rounded-r-none">
                <p className="w-full text-center border-r-2 border-r-zinc-700 p-2 border-b-2 border-b-zinc-900 bg-zinc-800 text-zinc-300">
                  Query
                </p>
                <textarea
                  key={data[0].id}
                  className="w-full min-h-40 border-r-2 border-r-zinc-700 rounded-md rounded-r-none p-2 bg-zinc-800 text-zinc-300"
                  value={data[0].query}
                />
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel className="rounded-md rounded-l-none">
                <p className="w-full text-center border-r-2 border-r-zinc-700 p-2 border-b-2 border-b-zinc-900 bg-zinc-800 text-zinc-300">
                  Result
                </p>
                <textarea
                  key={data[0].id}
                  className="w-full min-h-40 rounded-md rounded-l-none p-2 bg-zinc-800 text-zinc-300 whitespace-pre"
                  value={data[0].text}
                />
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-4">
        <p className="text-2xl">Results</p>
        <ResizablePanelGroup className="max-h-fit" direction="horizontal">
          <ResizablePanel className="rounded-md rounded-r-none">
            <p className="w-full text-center border-r-2 border-r-zinc-700 p-2 border-b-2 border-b-zinc-900 bg-zinc-800 text-zinc-300">
              Query
            </p>
            {data.map((response) => (
              <p
                key={response.id}
                className="w-full h-14 border-b-2 border-b-zinc-700 border-r-2 border-r-zinc-700 p-2 bg-zinc-800 text-zinc-300"
              >
                {response.query}
              </p>
            ))}
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel className="rounded-none flex flex-col">
            <p className="w-full text-center border-r-2 border-r-zinc-700 p-2 border-b-2 border-b-zinc-900 bg-zinc-800 text-zinc-300">
              Result
            </p>
            {data.map((response) => (
              <textarea
                key={response.id}
                className="w-full h-14 border-b-2 border-b-zinc-700 border-r-2 border-r-zinc-700 p-2 bg-zinc-800 text-zinc-300"
                value={response.text}
              />
            ))}
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel className="rounded-md rounded-l-none flex flex-col">
            <p className="w-full text-center p-2 border-b-2 border-b-zinc-900 bg-zinc-800 text-zinc-300">
              Response time
            </p>
            {data.map((response) => (
              <textarea
                key={response.id}
                className="w-full h-14 border-b-2 border-b-zinc-700 border-r-2 border-r-zinc-700 p-2 bg-zinc-800 text-zinc-300"
                value={`${response.responseTime} sec`}
              />
            ))}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default DBAdmin;
