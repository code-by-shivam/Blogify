import { Link } from "react-router-dom";
import Badge from "./Badge";
import CardFooter from "./CardFooter";

const BlogCard = ({ blog }) => (
  <article className="group flex flex-col overflow-hidden rounded-2xl border bg-card transition duration-300 hover:-translate-y-1 hover:shadow-lg">
    <Link to={`/blogs/${blog.slug}`} className="block aspect-[16/10] overflow-hidden bg-muted">
      {blog?.featured_image && (
        <img
          src={blog.featured_image}
          alt={blog.title}
          loading="lazy"
          className="size-full object-cover transition duration-500 group-hover:scale-105"
        />
      )}
    </Link>
    <div className="flex flex-1 flex-col gap-4 p-5">
      <Badge blog={blog} />
      <Link to={`/blogs/${blog.slug}`}>
        <h3 className="line-clamp-2 break-words text-lg font-semibold leading-snug tracking-tight transition-colors group-hover:text-primary">
          {blog.title}
        </h3>
      </Link>
      <div className="mt-auto border-t pt-4">
        <CardFooter blog={blog} />
      </div>
    </div>
  </article>
);

export default BlogCard;
