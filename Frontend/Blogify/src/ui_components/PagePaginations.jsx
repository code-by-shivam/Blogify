import {
  Pagination, PaginationContent, PaginationItem, PaginationLink,
  PaginationNext, PaginationPrevious,
} from "@/components/ui/pagination";

const PagePaginations = ({ numOfPages, handleSetPage, page, decreasePageValue, increasePageValue }) => {
  if (!numOfPages || numOfPages < 2) return null;
  const numbers = Array.from({ length: numOfPages }, (_, i) => i + 1);
  const go = (fn) => (e) => {
    e.preventDefault();
    fn();
    document.getElementById("posts")?.scrollIntoView({ behavior: "smooth" });
  };
  const disabled = "pointer-events-none opacity-40";

  return (
    <Pagination className="my-10">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" onClick={go(decreasePageValue)} className={page === 1 ? disabled : ""} />
        </PaginationItem>
        {numbers.map((num) => (
          <PaginationItem key={num}>
            <PaginationLink
              href="#"
              isActive={num === page}
              onClick={go(() => handleSetPage(num))}
              className={num === page ? "border-primary bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground" : ""}
            >
              {num}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext href="#" onClick={go(increasePageValue)} className={page === numOfPages ? disabled : ""} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PagePaginations;
