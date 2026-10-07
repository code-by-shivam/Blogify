import { Link } from "react-router-dom";
import { FormatDate } from "@/services/formatData";
import Avatar from "./Avatar";

const BlogWriter = ({ blog }) => {
  const author = blog?.author;
  return (
    <Link to={`/profile/${author?.username}`} className="inline-flex items-center gap-3">
      <Avatar user={author} className="size-10" text="text-sm" />
      <span className="text-sm leading-tight">
        <span className="block font-medium">{author?.first_name} {author?.last_name}</span>
        <span className="text-muted-foreground">{FormatDate(blog?.published_date)}</span>
      </span>
    </Link>
  );
};

export default BlogWriter;
