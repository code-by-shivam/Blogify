import Badge from "@/ui_components/Badge";
import BlogWriter from "@/ui_components/BlogWriter";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "@/ui_components/Spinner";
import { BASE_URL } from "@/api";
import { deleteBlog, getBlog } from "@/services/apiBlog";
import { useEffect, useState } from "react";
import { HiPencilAlt } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import Modal from "@/ui_components/Modal";
import CreatePostPage from "./CreatePostPage";
import { toast } from "react-toastify";

const DetailPage = ({ username, isAuthenticated }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  function toggleModal() {
    setShowModal((curr) => !curr);
  }

  const {
    isPending,
    isError,
    error,
    data: blog,
  } = useQuery({
    queryKey: ["blog", slug],
    queryFn: () => getBlog(slug),
  });
  const blogId = blog?.id

  useEffect(() => {
    if (blog) {
      console.log("Blog loaded:", blog);
    }
  }, [blog]);



  const deleteMutation = useMutation({
    mutationFn:(id) => deleteBlog(id),
    onSuccess:() => {
      toast.success("Your post has been deleted succesfully.")
      navigate("/")
    },
    onError:(err) => {
      console.log(err)
      toast.error(err.message)
    }
    

  })

  function handleDeletePost(){
    const popUp = window.confirm("Are you sure you eant to delete this post ?")
    if(!popUp){
      return;
    }
    deleteMutation.mutate(blogId)
    
  }
  

  if (isPending) {
    return <Spinner />;
  }

  return (
    <>
      <div className="padding-dx max-container py-9">
        <Badge blog={blog} />

        <div className="flex justify-between items-center">
          <h2 className="py-6 leading-normal text-2xl md:text-3xl text-[#181A2A] tracking-wide font-semibold dark:text-[#FFFFFF]">
            {blog?.title}
          </h2>
          {isAuthenticated && username === blog.author.username && (
            <span className="flex justify-between items-center gap-2">
              <HiPencilAlt
                onClick={toggleModal}
                className="dark:text-white text-3xl cursor-pointer"
              />

              <MdDelete onClick={handleDeletePost} className="dark:text-white text-3xl cursor-pointer" />
            </span>
          )}
        </div>

        <BlogWriter blog={blog} />

        <div className="w-full h-[350px] my-9 overflow-hidden rounded-sm">
          <img
            className="w-full h-full object-cover rounded-sm"
            src={`${BASE_URL}${blog?.featured_image}`}
          />
        </div>
        <p className="text-[16px] leading-[2rem] text-justify text-[#3B3C4A] dark:text-[#BABABF]">
          {blog?.content}
        </p>
      </div>
      {showModal && (
        <Modal toggleModal={toggleModal}>
          <CreatePostPage blog={blog}  toggleModal={toggleModal} />
        </Modal>
      )}
    </>
  );
};

export default DetailPage;
