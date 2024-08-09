import { Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full max-w-[1200px] mx-auto flex flex-col justify-center items-center gap-3 mt-10 p-4">
      <p>With ❤️ from 🇨🇴 🇮🇳</p>
      <div className="flex gap-3">
        <a href="https://github.com/chrisarevalo11/superhack" target="_blank">
          <Github />
        </a>
      </div>
    </footer>
  );
}
