export const formatResponse = (text: string): string => {
  return (
    text
      // Handle bold text
      .replace(
        /\*\*(.*?)\*\*/g,
        '<span class="text-[#915461] font-bold">$1</span>'
      )
      // Handle bullet points and ensure proper spacing
      .replace(/^[•*-]\s(.+)$/gm, '• <span class="pl-2">$1</span>')
      // Handle line breaks
      .split("\n")
      .join("<br />")
  );
};
