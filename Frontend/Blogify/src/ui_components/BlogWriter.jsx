import { Link } from "react-router-dom";
import { FormatDate } from "@/services/formatData";

const BlogWriter = ({ blog }) => {
  const profileImage = blog?.author?.profile_picture;

  return (
    <Link to={`/profile/${blog?.author?.username}`}>
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-2">
          {/* Profile Picture */}
          <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
            {profileImage ? (
              <img
                src={profileImage}
                alt={blog?.author?.username}
                className="rounded-full w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-300 rounded-full" />
            )}
          </div>

          {/* Author Name */}
          <small className="text-[#696A75] text-[14px]">
            {blog?.author?.first_name} {blog?.author?.last_name}
          </small>
        </span>

        {/* Published Date */}
        <small className="text-[#696A75] text-[14px] ml-3">
          {FormatDate(blog?.published_date)}
        </small>
      </div>
    </Link>
  );
};

export default BlogWriter;
