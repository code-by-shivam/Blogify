import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SOCIALS = [
  { Icon: FaInstagram, href: "https://www.instagram.com/", label: "Instagram" },
  { Icon: FaFacebookF, href: "https://www.facebook.com/", label: "Facebook" },
  { Icon: BsTwitterX, href: "https://twitter.com/", label: "X" },
  { Icon: FaYoutube, href: "https://www.youtube.com/", label: "YouTube" },
];
const CATEGORIES = ["Technology", "Business", "Economy", "Lifestyle", "Sports"];

const Footer = () => (
  <footer className="mt-24 border-t bg-muted/40">
    <div className="page grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
      <div className="space-y-3">
        <p className="text-lg font-semibold tracking-tight">Blogify</p>
        <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
          Insightful articles on technology, business and life, written by a community of curious people.
        </p>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-semibold">Explore</p>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li><Link to="/" className="hover:text-foreground">Home</Link></li>
          <li><Link to="/create" className="hover:text-foreground">Write a post</Link></li>
          <li><Link to="/signin" className="hover:text-foreground">Login</Link></li>
          <li><Link to="/signup" className="hover:text-foreground">Register</Link></li>
        </ul>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-semibold">Topics</p>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {CATEGORIES.map((c) => <li key={c}>{c}</li>)}
        </ul>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-semibold">Weekly newsletter</p>
        <p className="text-sm text-muted-foreground">Fresh articles in your inbox. No spam.</p>
        <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
          <Input type="email" placeholder="you@example.com" aria-label="Email" className="bg-background" />
          <Button type="submit">Join</Button>
        </form>
      </div>
    </div>

    <div className="border-t">
      <div className="page flex flex-col items-center justify-between gap-4 py-6 text-sm text-muted-foreground sm:flex-row">
        <p>© {new Date().getFullYear()} Blogify. All rights reserved.</p>
        <div className="flex items-center gap-4">
          {SOCIALS.map(({ Icon, href, label }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="transition-colors hover:text-foreground">
              <Icon className="size-4" />
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
