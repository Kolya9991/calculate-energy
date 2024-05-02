'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {MoreHorizontal, Edit, Trash, Copy} from 'lucide-react'
import {Dispatch, FC, SetStateAction, useState, useTransition} from "react";
import {toast} from "sonner";
import {AlertModal} from "@/components/modals/AlertModal";
import {IDeviceAddProps} from "@/types/device";
import {deleteDevice} from "@/actions/delete-device";

interface IActionWithCellProps {
  data: IDeviceAddProps;
  setDevices: Dispatch<SetStateAction<IDeviceAddProps[] | undefined>>;
}

const ActionWithCell: FC<IActionWithCellProps> = ({data, setDevices}) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success('ID пристрою скопійовано в буфер обміну.');
  };

  const onConfirm = (id: string) => {

    setOpen(false);
    startTransition(() => {
      deleteDevice(id).then(response => {
        if (response.error) {
          toast.error(response?.error);
        } else {
          toast.success(response?.success);
          setDevices(currentDevices => currentDevices?.filter(device => device.id !== id));
        }
      });
    });
  };


  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => onConfirm(data.id)}
        loading={isPending}
        title="Підтвердження видалення"
        description="Ви впевнені, що хочете видалити цей пристрій?"
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4"/>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Дії з коміркою</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="mr-2 h-4 w-4"/> Копіювати Id
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Edit className="mr-2 h-4 w-4"/> Оновити дані пристрою
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4"/> Видалити
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ActionWithCell;