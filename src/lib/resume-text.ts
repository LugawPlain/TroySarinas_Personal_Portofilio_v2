import { PDFParse } from "pdf-parse";

const MAX_RESUME_BYTES = 10 * 1024 * 1024;

export async function extractResumeText(file: File): Promise<string> {
  if (file.size > MAX_RESUME_BYTES) {
    throw new Error("Resume files must be 10 MB or smaller.");
  }

  if (
    file.type !== "application/pdf" &&
    !file.name.toLowerCase().endsWith(".pdf")
  ) {
    throw new Error("Only PDF resumes can be parsed automatically.");
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const parser = new PDFParse({ data: buffer });
  const parsed = await parser.getText();
  await parser.destroy();
  const text = parsed.text.replace(/\s+/g, " ").trim();

  if (!text) {
    throw new Error("The PDF does not contain selectable text.");
  }

  return text.slice(0, 100_000);
}
