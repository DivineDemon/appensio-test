import { ChartCircle } from "iconsax-react";
import { type ChangeEvent, type Dispatch, type SetStateAction, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import UploadIcon from "@/assets/icons/upload.svg";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { extractTextFromFile } from "@/lib/utils";
import {
  useCheckExistenceQuery,
  useUpdateKnowledgeBaseMutation,
  useUploadDocumentMutation,
} from "@/store/services/knowledge";

interface AddDocumentDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const AddDocumentDialog = ({ open, setOpen }: AddDocumentDialogProps) => {
  const { id } = useParams();
  const [desc, setDesc] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const { data: exists } = useCheckExistenceQuery(`${id}`, {
    skip: !id,
    refetchOnMountOrArgChange: true,
  });
  const [uploadDoc, { isLoading }] = useUploadDocumentMutation();
  const [updateDoc, { isLoading: updating }] = useUpdateKnowledgeBaseMutation();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      if (
        selectedFile.type === "application/pdf" ||
        selectedFile.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        setFile(selectedFile);
      } else {
        toast.error("Invalid file type. Please upload a PDF or Word document.");
      }
    } else {
      setFile(null);
    }
  };

  const handleSubmit = async () => {
    let response = null;
    const formData = new FormData();
    const fileContent = await extractTextFromFile(file!);

    if (!desc) {
      toast.error("Please provide a description for the knowledge base.");
      return;
    }

    formData.append("files", file!);
    formData.append("file_content", fileContent);
    formData.append("knowledge_base_description", desc);

    if (exists?.has_query_tool) {
      response = await updateDoc({
        business_id: id!,
        body: formData,
      });
    } else {
      response = await uploadDoc({
        business_id: id!,
        body: formData,
      });
    }

    if (response.data) {
      toast.success("Document uploaded successfully!");
      setFile(null);
      setOpen(false);
    } else {
      toast.error("Failed to upload document!");
    }
  };

  useEffect(() => {
    if (open) {
      setFile(null);
      if (fileRef.current) {
        fileRef.current.value = "";
      }
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
        </DialogHeader>
        <div className="flex w-full flex-col items-center justify-center gap-5">
          <div className="flex w-full flex-col items-center justify-center gap-2">
            <Label htmlFor="kb-desc" className="w-full text-left">
              Knowledge Base Description
            </Label>
            <Textarea
              className="h-36 w-full resize-none"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Describe when this knowledge base should be used."
            />
          </div>
          <Input
            ref={fileRef}
            type="file"
            className="hidden"
            accept=".pdf,.docx"
            multiple={false}
            onChange={handleFileChange}
          />
          <div
            onClick={() => {
              if (fileRef.current) {
                fileRef.current.click();
              }
            }}
            className="flex w-full items-center justify-center gap-5 rounded-lg bg-primary py-5 text-white"
          >
            <img src={UploadIcon} alt="upload-icon" className="invert" />
            <div className="flex flex-col items-center justify-center">
              <span className="w-full text-left text-lg">Upload Document</span>
              <span className="w-full text-left text-sm text-white/70">Supported Formats: PDF, Word</span>
            </div>
          </div>
          {file && (
            <div className="flex w-[375px] flex-col items-center justify-center rounded-lg border-2 bg-gray-100 p-5">
              <span className="w-full overflow-hidden truncate text-left font-semibold text-[#71717A] text-lg">
                {file.name}
              </span>
              <span className="w-[375px] overflow-hidden truncate px-5 text-left text-[#71717A] text-sm">
                {file.type === "application/pdf" ? "PDF" : "Word Document"}
              </span>
            </div>
          )}
        </div>
        <DialogFooter>
          <div className="flex w-full items-center justify-end gap-2.5">
            <Button disabled={isLoading} onClick={() => setOpen(false)} type="button" variant="secondary">
              Cancel
            </Button>
            <Button disabled={isLoading || updating} onClick={handleSubmit} type="button" variant="default">
              {isLoading || updating ? <ChartCircle size={20} color="#FFFFFF" className="animate-spin" /> : "Submit"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddDocumentDialog;
