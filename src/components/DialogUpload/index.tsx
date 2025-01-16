"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useUploadDialog } from "@/stores/upload-dialog-store";
import FormDialog from "../DialogForm";
import { Separator } from "../ui/separator";

export default function UploadDialog() {
  const { open, setOpen } = useUploadDialog();

  return (
    <Dialog open={open} onOpenChange={setOpen} modal={true}>
      <DialogContent className="gap-0 overflow-hidden p-0 md:rounded-2xl text-black">
        <DialogHeader className="items-center justify-center space-y-3 px-16 py-8">
          <DialogTitle className="font-display text-2xl font-bold leading-normal tracking-normal">
            Upload Image
          </DialogTitle>
          <DialogDescription>
          This action cannot be undone. This will permanently delete your account
          and remove your data from our servers.
        </DialogDescription>
          <Separator />
          <FormDialog />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
