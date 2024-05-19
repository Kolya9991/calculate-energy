import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Skeleton} from "@/components/ui/skeleton";

const SkeletonTable = () => {
  return (
    <div className="overflow-x-auto w-full">
      <Table className='bg-white min-w-[600px] mx-auto rounded-xl h-full'>
        <TableHeader>
          <TableRow>
            <TableHead><Skeleton className="w-4 h-4"/></TableHead>
            <TableHead><Skeleton className="w-full h-4"/></TableHead>
            <TableHead><Skeleton className="w-full h-4"/></TableHead>
            <TableHead><Skeleton className="w-full h-4"/></TableHead>
            <TableHead><Skeleton className="w-full h-4"/></TableHead>
            <TableHead><Skeleton className="w-full h-4"/></TableHead>
            <TableHead><Skeleton className="w-full h-4"/></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className='text-sm text-gray-600'>
          {[...Array(5)].map((_, index) => (
            <TableRow key={index} className='bg-white'>
              <TableCell><Skeleton className="w-4 h-4"/></TableCell>
              <TableCell><Skeleton className="w-full h-4"/></TableCell>
              <TableCell><Skeleton className="w-full h-4"/></TableCell>
              <TableCell><Skeleton className="w-full h-4"/></TableCell>
              <TableCell><Skeleton className="w-full h-4"/></TableCell>
              <TableCell><Skeleton className="w-full h-4"/></TableCell>
              <TableCell><Skeleton className="w-full h-4"/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SkeletonTable;
