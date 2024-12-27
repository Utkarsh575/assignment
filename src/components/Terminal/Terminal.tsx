"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon } from "lucide-react";
import { HistoryEntry } from "@/app/types/terminal";
import { COMMANDS, formatResponse, getPromptSymbol } from "@/app/utils";
import { fetchGeneratedResponse } from "@/app/services/apiService";

const Terminal = (): React.JSX.Element => {
  const [input, setInput] = useState<string>("");
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      type: "system",
      content: 'Welcome! Type "help" to see available commands.',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [commandIndex, setCommandIndex] = useState(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(
    () => bottomRef.current?.scrollIntoView({ behavior: "smooth" }),
    [history]
  );

  const addHistoryEntry = (
    type: "system" | "input" | "response" | "error",
    content: string
  ) => {
    setHistory((prev) => [...prev, { type, content }]);
  };

  const handleCommand = async (command: string): Promise<boolean> => {
    const lowerCaseCommand = command.toLowerCase();

    if (COMMANDS[lowerCaseCommand]) {
      const actions: Record<string, () => void> = {
        clear: () => setHistory([]),
        help: () =>
          addHistoryEntry(
            "system",
            formatResponse(
              Object.entries(COMMANDS)
                .map(([cmd, desc]) => `• ${cmd}: ${desc}`)
                .join("\n")
            )
          ),
        greet: () =>
          addHistoryEntry(
            "system",
            `Hello! Welcome to the terminal. Current time: ${new Date().toLocaleTimeString()}`
          ),
      };

      actions[lowerCaseCommand]?.();
      return true;
    }

    return false;
  };

  const fetchResponse = async (prompt: string): Promise<void> => {
    setIsLoading(true);

    try {
      const response = await fetchGeneratedResponse(prompt);
      addHistoryEntry("input", prompt);
      addHistoryEntry("response", formatResponse(response));
    } catch (error) {
      console.error(error);
      addHistoryEntry(
        "error",
        "Error: Failed to get a response. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      const userCommand = input.trim();
      setCommandHistory((prev) => [...prev, userCommand]);
      setCommandIndex(-1);

      if (!(await handleCommand(userCommand))) {
        await fetchResponse(userCommand);
      }

      setInput("");
    } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      navigateCommandHistory(e.key === "ArrowUp");
    }
  };

  const navigateCommandHistory = (isUp: boolean) => {
    if (!commandHistory.length) return;

    const newIndex = isUp
      ? Math.max(
          0,
          commandIndex === -1 ? commandHistory.length - 1 : commandIndex - 1
        )
      : Math.min(commandHistory.length - 1, commandIndex + 1);

    setCommandIndex(newIndex);
    setInput(newIndex === -1 ? "" : commandHistory[newIndex]);
  };

  return (
    <div className="w-full h-screen p-4">
      <div className="max-w-4xl mx-auto bg-background rounded-lg p-4 h-[80vh] overflow-auto shadow-lg">
        <div className="flex items-center gap-2 mb-4 text-terminalAccent">
          <TerminalIcon size={20} />
          <span className="text-foreground">LAMMA3 TERMINAL</span>
        </div>

        <div className="text-terminalText">
          {history.map((entry, i) => (
            <div key={i} className="mb-4">
              <div
                className={`flex ${entry.type === "response" ? "pl-4" : ""}`}
              >
                <span className="text-terminalAccent mr-2 shrink-0">
                  {getPromptSymbol(entry.type)}
                </span>
                <div
                  dangerouslySetInnerHTML={{ __html: entry.content }}
                  className={`${
                    entry.type === "error"
                      ? "text-error"
                      : entry.type === "system"
                      ? "text-system"
                      : ""
                  } whitespace-pre-wrap`}
                />
              </div>
            </div>
          ))}

          <div className="flex items-center">
            <span className="text-terminalAccent mr-2">$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className={`flex-1 bg-transparent border-none outline-none text-terminalText caret-terminalAccent ${
                isLoading ? "animate-pulse" : ""
              }`}
              placeholder="Type a command or question..."
              disabled={isLoading}
              autoFocus
            />
          </div>
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
};

export default Terminal;
