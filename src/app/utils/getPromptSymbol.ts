const getPromptSymbol = (type: string): string => {
  const symbols: Record<string, string> = {
    input: "$",
    system: ">",
    error: "✖",
  };

  return symbols[type] || ">";
};

export default getPromptSymbol;
