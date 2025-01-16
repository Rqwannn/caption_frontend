"use client";
import LoadingImage from "@/components/core/LoadingImage";
import { useLoadingApi } from "@/stores/loading-api-store";
import Image from "next/image";
import { useEffect } from "react";
import { useImageUrl } from "@/stores/image-url-store";
export default function ImageSection() {
  const { loading, setLoading } = useLoadingApi();
  const { url } = useImageUrl();

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  useEffect(() => {
    const loadImages = async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
    };

    loadImages();
  }, []);

  return (
    <section className="grid mx-auto lg:w-96 px-5 pt-10">
      {url && loading && <LoadingImage imageURL={url} />}
      {url && !loading && (
        <>
          <Image
            src={url}
            alt="road"
            width={500}
            height={500}
            className="rounded-xl "
          ></Image>
        </>
      )}
    </section>
  );
}
