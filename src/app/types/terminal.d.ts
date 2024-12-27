export interface HistoryEntry {
  type: "input" | "response" | "error" | "system";
  content: string;
}

export interface ApiResponse {
  response?: string;
  error?: string;
}
export interface Commands {
  [key: string]: string;
}
