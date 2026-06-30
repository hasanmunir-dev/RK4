import { Code2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t mt-12 py-6 text-center text-sm text-muted-foreground">
      <div className="flex items-center justify-center gap-1.5">
        <Code2 className="h-4 w-4" />
        Developed by{" "}
        <a
          href="https://hasanmunir.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-foreground hover:underline"
        >
          Hasan Munir
        </a>
      </div>
    </footer>
  );
}