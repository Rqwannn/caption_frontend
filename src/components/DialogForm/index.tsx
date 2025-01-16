"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "../core/ErrorMessage";
import { useState } from "react";
import { inferenceIndoBERT, inferenceBigBird } from "@/services/stream";
import { useUploadDialog } from "@/stores/upload-dialog-store";
import { useImage } from "@/stores/image-store";
import { useLoadingApi } from "@/stores/loading-api-store";
import { useImageUrl } from "@/stores/image-url-store";
import { useData } from "@/stores/data-store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const schema = z.object({
  model: z.string(),
  image: z
    .any()
    .refine(
      (file) => file?.[0]?.size <= MAX_FILE_SIZE,
      `Max image size is 5MB.`
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type),
      "Only .jpg & .jpeg & .png formats are supported."
    ),
});

type FormData = z.infer<typeof schema>;

export default function FormDialog() {
  const setUploadDialogModal = useUploadDialog((s) => s.setOpen);
  const setImage = useImage((s) => s.setImage);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const [file, setFile] = useState<File | null>(null);
  const { setLoading } = useLoadingApi();
  const { setUrl } = useImageUrl();
  const { setData } = useData();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      setLoading(true);
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const imageDataUrl = reader.result as string;
          setImage(true);
          setUrl(imageDataUrl);
        };
        reader.readAsDataURL(file);
      }

      console.log(data);

      const formData = new FormData();

      formData.append("model", data.model);

      if (data.image[0]) {
        formData.append("image", data.image[0]);
      }

      setUploadDialogModal(false);

      let res = null;
      
      if (data.model == "indobert"){
        res = await inferenceIndoBERT(formData);
      } else if (data.model == "bigbird"){
        res = await inferenceBigBird(formData);
      }

      if (res) {
        setData(res.data);
        setUrl(res.data.original_image);
      }

      console.log("Data: ", res);
    } catch (err) {
      console.log("Error: ", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ul className="grid gap-4">

        <li>
          <div className="grid w-full max-w-sm items-center gap-3">

            <Label htmlFor="model">Model</Label>


            <Select {...register("model")}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih Model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="indobert">IndoBERT</SelectItem>
                <SelectItem value="bigbird">BigBird</SelectItem>
              </SelectContent>
            </Select>

          </div>

        </li>
        
        <li>
          <div className="grid w-full max-w-sm items-center gap-3">

            <Label htmlFor="image">Image</Label>
            <Input
              id="image"
              type="file"
              {...register("image")}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (!e.target.files) return;
                setFile(e.target.files?.[0]);
              }}
            />
            {errors.image && (
              <ErrorMessage message={errors.image.message as string} />
            )}
          </div>

        </li>
        <li className="flex w-full justify-end">
          <Button
            variant={"outline"}
            type="submit"
            onClick={() => {
              // setUploadButton(false);
            }}
          >
            Submit
          </Button>
        </li>
      </ul>
    </form>
  );
}
