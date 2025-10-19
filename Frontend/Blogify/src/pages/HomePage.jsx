import { getBlogs } from "@/services/apiBlog";
import BlogContainer from "@/ui_components/BlogContainer";
import Header from "@/ui_components/Header";
import PagePaginations from "@/ui_components/PagePaginations";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import React, { useState } from "react";

export const HomePage = () => {

  const [page, setPage] = useState(1);
  const numOfBlogsperPage = 3;

  const {
    isPending,
    isError,
    error,
    data,
  } = useQuery({
    queryKey: ["blogs", page],
    queryFn:() => getBlogs(page),
    placeholderData: keepPreviousData,
  });


  const blogs = data?.results || [];
  const numOfPages = Math.ceil(data?.count/numOfBlogsperPage)
  function handleSetPage(val){
    setPage(val);
  }

  function increasePageValue(){
    setPage(curr => curr +1)
  }

  function decreasePageValue(){
    setPage(curr => curr -1)
  }


  return (
    <>
      <Header />
     <BlogContainer isPending={isPending} blogs={blogs} />
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
