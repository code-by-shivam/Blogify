import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import banner from "../images/workspace-banner.jpg";

const Header = () => (
  <section className="page pb-6 pt-10 sm:pt-20">
    <div className="max-w-2xl">
      <p className="mb-4 text-sm font-medium text-primary">The Blogify journal</p>
      <h1 className="text-3xl font-semibold leading-[1.1] tracking-tight sm:text-5xl 2xl:text-6xl">
        Stories, ideas and insights worth your time.
      </h1>
      <p className="mt-5 text-base leading-relaxed sm:text-lg text-muted-foreground">
        Read thoughtful writing from independent authors, or share your own with the world.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild size="lg"><Link to="/create">Start writing</Link></Button>
        <Button asChild size="lg" variant="outline"><a href="#posts">Read latest</a></Button>
      </div>
    </div>
    <div className="mt-10 h-48 overflow-hidden rounded-2xl border sm:mt-12 sm:h-80 2xl:h-96">
      <img src={banner} alt="" className="size-full object-cover" />
    </div>
  </section>
);

export default Header;
