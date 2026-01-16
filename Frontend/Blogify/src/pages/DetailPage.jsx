import Badge from "@/ui_components/Badge";
import BlogWriter from "@/ui_components/BlogWriter";
import Spinner from "@/ui_components/Spinner";
import Modal from "@/ui_components/Modal";
import CreatePostPage from "./CreatePostPage";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { HiPencilAlt } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
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

  return (
    <>
      <div className="padding-dx max-container py-9">
        <Badge blog={blog} />

        {/* -------- Title + Actions -------- */}
        <div className="flex justify-between items-center">
          <h2 className="py-6 text-2xl md:text-3xl font-semibold tracking-wide text-[#181A2A] dark:text-white">
            {blog?.title}
          </h2>

          {isAuthenticated &&
            blog?.author?.username &&
            username === blog.author.username && (
              <span className="flex items-center gap-3">
                <HiPencilAlt
                  onClick={toggleModal}
                  className="text-3xl cursor-pointer dark:text-white"
                />
                <MdDelete
                  onClick={handleDeletePost}
                  className="text-3xl cursor-pointer dark:text-white"
                />
              </span>
            )}
        </div>

        <BlogWriter blog={blog} />

        {/* -------- Featured Image (CLOUDINARY) -------- */}
        {blog?.featured_image && (
          <div className="w-full h-[350px] my-9 overflow-hidden rounded-sm">
            <img
              src={blog.featured_image}
              alt={blog.title}
              className="w-full h-full object-cover rounded-sm"
            />
          </div>
        )}

        {/* -------- Content -------- */}
        <p className="text-[16px] leading-[2rem] text-justify text-[#3B3C4A] dark:text-[#BABABF]">
          {blog?.content}
        </p>
      </div>

      {/* -------- Edit Modal -------- */}
      {showModal && (
        <Modal toggleModal={toggleModal}>
          <CreatePostPage
            blog={blog}
            toggleModal={toggleModal}
            isAuthenticated={isAuthenticated}
          />
        </Modal>
      )}
    </>
  );
};

export default DetailPage;
