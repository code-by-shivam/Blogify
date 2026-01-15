import { Link } from "react-router-dom";
import { FormatDate } from "@/services/formatData";

const CardFooter = ({ blog }) => {
  const author = blog?.author;

  return (
    <Link to={`/profile/${author?.username}`}>
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-2">
          {/* Profile Picture */}
          <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
            {author?.profile_picture_url ? (
              <img
                src={author.profile_picture_url}
                alt={author.username}
                className="rounded-full w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-300 rounded-full" />
            )}
          </div>

          {/* Author Name */}
          <small className="text-[#97989F] text-[12px] font-semibold">
            {author?.first_name} {author?.last_name}
          </small>
        </span>

        {/* Published Date */}
        <small className="text-[#97989F] text-[12px] font-semibold ml-3">
          {FormatDate(blog?.published_date)}
        </small>
      </div>
    </Link>
  );
};

export default CardFooter;
