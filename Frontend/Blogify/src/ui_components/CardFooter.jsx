import { Link } from "react-router-dom";
import { FormatDate } from "@/services/formatData";
import Avatar from "./Avatar";

const CardFooter = ({ blog }) => {
  const author = blog?.author;
  return (
    <Link to={`/profile/${author?.username}`} className="flex items-center gap-3">
      <Avatar user={author} />
      <span className="text-xs leading-tight">
        <span className="block font-medium text-foreground">{author?.first_name} {author?.last_name}</span>
        <span className="text-muted-foreground">{FormatDate(blog?.published_date)}</span>
      </span>
    </Link>
  );
};

export default CardFooter;
