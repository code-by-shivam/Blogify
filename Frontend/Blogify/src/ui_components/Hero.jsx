import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import Avatar from "./Avatar";

const Hero = ({ userInfo, authUsername, toggleModal }) => (
  <section className="page pt-12">
    <div className="surface flex flex-col items-center gap-4 px-4 py-8 text-center sm:px-6 sm:py-10">
      <Avatar user={userInfo} className="size-24" text="text-2xl" />
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          {userInfo?.first_name} {userInfo?.last_name}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {userInfo?.job_title || "Collaborator & Editor"} · @{userInfo?.username}
        </p>
      </div>
      {userInfo?.bio && (
        <p className="max-w-xl break-words leading-relaxed text-muted-foreground">{userInfo.bio}</p>
      )}
      <p className="text-sm">
        <span className="font-semibold">{userInfo?.author_posts?.length ?? 0}</span>{" "}
        <span className="text-muted-foreground">published posts</span>
      </p>
      {userInfo?.username === authUsername && (
        <Button variant="outline" size="sm" onClick={toggleModal}>
          <Pencil /> Edit profile
        </Button>
      )}
    </div>
  </section>
);

export default Hero;
