import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const PagePaginations = ({
  numOfPages,
  handleSetPage,
  page,
  decreasePageValue,
  increasePageValue,
}) => {
  const numbers = Array.from({ length: numOfPages }, (_, i) => i + 1);
  const firstNumber = numbers[0];
  const lastNumbers = numbers[numbers.length - 1];
  console.log(numbers);
  return (
    <Pagination className="my-6 dark:text-white">
      <PaginationContent>
        {page === firstNumber || (
          <PaginationItem onClick={decreasePageValue}>
            <PaginationPrevious href="#" />
          </PaginationItem>
        )}

        {numbers.map((num) => (
          <PaginationItem key={num} onClick={() => handleSetPage(num)}>
            {num === page ? (
              <PaginationLink href="#" isActive>
                {num}
              </PaginationLink>
            ) : (
              <PaginationLink href="#" isActive>
                {num}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {page === lastNumbers || (
          <PaginationItem onClick={increasePageValue}>
            <PaginationNext href="#" />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default PagePaginations;
