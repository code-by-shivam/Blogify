import Badge from "@/ui_components/Badge";
import BlogWriter from "@/ui_components/BlogWriter";
import Spinner from "@/ui_components/Spinner";
import Modal from "@/ui_components/Modal";
import CreatePostPage from "./CreatePostPage";

import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

import { getBlog, deleteBlog } from "@/services/apiBlog";

const DetailPage = ({ username, isAuthenticated }) => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal((curr) => !curr);

  /* ---------------- Fetch Blog ---------------- */
  useEffect(() => {
    async function fetchBlog() {
      setIsLoading(true);
      try {
        const data = await getBlog(slug);
        setBlog(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load blog");
      } finally {
        setIsLoading(false);
      }
    }
    fetchBlog();
  }, [slug]);

  /* ---------------- Delete Blog ---------------- */
  async function handleDeletePost() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    setIsDeleting(true);
    try {
      await deleteBlog(blog.id);
      toast.success("Post deleted successfully");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete post");
    } finally {
      setIsDeleting(false);
    }
  }

  /* ---------------- Loading ---------------- */
  if (isLoading) return <Spinner />;

  const readMins = Math.max(1, Math.round((blog?.content?.split(/\s+/).length || 0) / 200));
  const isOwner = isAuthenticated && blog?.author?.username && username === blog.author.username;

  return (
    <>
      <article className="page-narrow py-8 sm:py-14">
        <Link to="/" className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="size-4" /> All posts
        </Link>

        <div className="flex items-center gap-3">
          <Badge blog={blog} />
          <span className="text-xs text-muted-foreground">{readMins} min read</span>
        </div>

        <h1 className="mt-4 text-2xl font-semibold leading-tight tracking-tight break-words sm:text-3xl lg:text-4xl 2xl:text-5xl">
          {blog?.title}
        </h1>

        <div className="mt-6 flex flex-col gap-4 border-y py-4 sm:flex-row sm:items-center sm:justify-between">
          <BlogWriter blog={blog} />
          {isOwner && (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={toggleModal}><Pencil /> Edit</Button>
              <Button variant="outline" size="sm" onClick={handleDeletePost} disabled={isDeleting}
                className="text-destructive hover:text-destructive">
                <Trash2 /> Delete
              </Button>
            </div>
          )}
        </div>

        {blog?.featured_image && (
          <img src={blog.featured_image} alt={blog.title}
            className="my-8 aspect-[16/9] w-full rounded-2xl border object-cover sm:my-10" />
        )}

        <div className="whitespace-pre-line break-words text-base leading-7 text-foreground/80 sm:text-[1.0625rem] sm:leading-8 2xl:text-lg">
          {blog?.content}
        </div>
      </article>

      {showModal && (
        <Modal toggleModal={toggleModal}>
          <CreatePostPage blog={blog} toggleModal={toggleModal} isAuthenticated={isAuthenticated} />
        </Modal>
      )}
    </>
  );
};

export default DetailPage;
