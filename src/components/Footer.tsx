import { Heart } from "lucide-react";

const Footer = () => (
  <footer id="contact-us" className="border-t border-border bg-card py-12">
    <div className="container mx-auto px-6 text-center">
      <div className="flex items-center justify-center gap-2 text-lg font-bold">
        <Heart className="h-5 w-5 text-primary" />
        <span>AI Early Detector</span>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">
        © 2026 AI Early Detector. All rights reserved. Empowering early diagnosis with AI.
      </p>
    </div>
  </footer>
);

export default Footer;
