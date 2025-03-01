"use client";
import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TableView } from "@/components/table-view";
import { PaginatedResponse } from "../types";
import { useSmaller } from "@/lib/breakpoints";

const LIMIT_PER_PAGE = 10;

type Props = {
  title: string;
  description: string;
  displayColumns?: string[];
  fetchData: (
    currentPage: number,
    limitPerPage: number
  ) => Promise<PaginatedResponse>;
};

export default function BrowseTable({
  title,
  description,
  fetchData,
  displayColumns,
}: Props) {
  const isSmallDevice = useSmaller("md");
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<PaginatedResponse>({
    data: [],
    meta: {
      totalItems: 0,
      totalPages: 1,
    },
  });

  const generatePaginationNumbers = () => {
    const { totalPages } = data.meta;
    let pages: number[] = [];

    // If we're at the start
    if (currentPage <= 2) {
      pages = [1, 2, 3];
    }
    // If we're at the end
    else if (currentPage >= totalPages - 1) {
      pages = [totalPages - 2, totalPages - 1, totalPages];
    }
    // If we're in the middle
    else {
      pages = [currentPage - 1, currentPage, currentPage + 1];
    }

    return pages.filter((page) => page > 0 && page <= totalPages);
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > data.meta.totalPages) return;
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchData(currentPage, LIMIT_PER_PAGE)
      .then((res) => setData(res))
      .catch((error) => console.error("Error fetching data:", error));
  }, [currentPage]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <TableView results={data.data} displayColumns={displayColumns} />

        <div className="mt-4 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {isSmallDevice ? (
                <PaginationItem>
                  <PaginationLink onClick={() => {}}>
                    {currentPage}
                  </PaginationLink>
                </PaginationItem>
              ) : (
                <>
                  {currentPage > 2 && (
                    <>
                      <PaginationItem>
                        <PaginationLink onClick={() => handlePageChange(1)}>
                          1
                        </PaginationLink>
                      </PaginationItem>
                      {currentPage > 3 && <PaginationEllipsis />}
                    </>
                  )}

                  {generatePaginationNumbers().map((pageNumber) => (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        onClick={() => handlePageChange(pageNumber)}
                        isActive={pageNumber === currentPage}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  {currentPage < data.meta.totalPages - 1 && (
                    <>
                      {currentPage < data.meta.totalPages - 2 && (
                        <PaginationEllipsis />
                      )}
                      <PaginationItem>
                        <PaginationLink
                          onClick={() => handlePageChange(data.meta.totalPages)}
                        >
                          {data.meta.totalPages}
                        </PaginationLink>
                      </PaginationItem>
                    </>
                  )}
                </>
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={
                    currentPage === data.meta.totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </CardContent>
    </Card>
  );
}
