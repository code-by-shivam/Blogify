import { BASE_URL } from "@/api"
import pic from "../images/pic (2).jpg"
import { FormatDate } from "@/services/formatData"

const BlogWriter = ({blog}) => {
  return (
    <div className="flex items-center gap=4 ">

      
      <span className="flex items-center gap-2">
        <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
          <img
            src={`${BASE_URL}${blog?.author.profile_picture}`}
            className="c rounded-full w-full h-full object-cover"
          />
        </div>

        <small className="text-[#696A75] text-[14px]">
          {blog?.author.first_name} {blog?.author.last_name}
        </small>
      </span>

      <small className="text-[#696A75] text-[14px] ml-3">
        {FormatDate(blog?.published_date)}
      </small>


    </div>
  )
}

export default BlogWriter