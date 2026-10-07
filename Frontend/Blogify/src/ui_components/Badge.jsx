const Badge = ({ blog }) =>
  blog?.category ? (
    <span className="inline-flex self-start rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground">
      {blog.category}
    </span>
  ) : null;

export default Badge;
