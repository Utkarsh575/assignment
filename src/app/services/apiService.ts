export const fetchGeneratedResponse = async (prompt: string): Promise<string> => {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch response");
    }
  
    const data = await response.json();
    return data.response || "No response received";
  };
  