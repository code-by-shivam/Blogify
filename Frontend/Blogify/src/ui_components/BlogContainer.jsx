import BlogCard from "./BlogCard";

const BlogContainer = ({ isPending, blogs = [], title = "Latest posts" }) => (
  <section id="posts" className="page scroll-mt-20 py-10">
    <h2 className="mb-8 text-2xl font-semibold tracking-tight">{title}</h2>
    {isPending ? (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="animate-pulse overflow-hidden rounded-2xl border bg-card">
            <div className="aspect-[16/10] bg-muted" />
            <div className="space-y-3 p-5">
              <div className="h-5 w-20 rounded-full bg-muted" />
              <div className="h-5 w-4/5 rounded bg-muted" />
              <div className="h-9 w-1/2 rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    ) : blogs.length === 0 ? (
      <p className="rounded-2xl border border-dashed py-16 text-center text-muted-foreground">
        No posts yet.
      </p>
    ) : (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)}
      </div>
    )}
  </section>
);

export default BlogContainer;
