import { getBlogs } from "@/services/apiBlog";
import BlogContainer from "@/ui_components/BlogContainer";
import Header from "@/ui_components/Header";
import PagePaginations from "@/ui_components/PagePaginations";
import { useEffect, useState } from "react";

export const HomePage = () => {

  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const numOfBlogsperPage = 3;

  useEffect(() => {
    async function fetchBlogs() {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await getBlogs(page);
        setData(response);
      } catch (err) {
        setIsError(true);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBlogs();
  }, [page]);


  const blogs = data?.results || [];
  const numOfPages = Math.ceil(data?.count / numOfBlogsperPage)
  function handleSetPage(val) {
    setPage(val);
  }

  function increasePageValue() {
    setPage(curr => curr + 1)
  }

  function decreasePageValue() {
    setPage(curr => curr - 1)
  }


  return (
    <>
      <Header />
      <BlogContainer isPending={isLoading} blogs={blogs} />
      <PagePaginations
        decreasePageValue={decreasePageValue}
        increasePageValue={increasePageValue}
        page={page}
        numOfPages={numOfPages}
        handleSetPage={handleSetPage}
      />
    </>
  );
};
