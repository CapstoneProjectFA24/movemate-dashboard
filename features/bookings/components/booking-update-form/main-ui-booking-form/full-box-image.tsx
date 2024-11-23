"use client";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { CldImage } from "next-cloudinary";

interface ImageLightboxProps {
  src: string;
  alt: string;
}

const ImageLightbox = ({ src, alt }: ImageLightboxProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openLightbox = () => {
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="cursor-pointer" onClick={openLightbox}>
        <CldImage
          src={src}
          width={150}
          height={150}
          alt={alt}
          className="object-cover w-[400px] h-[200px] hover:scale-105 transition-transform duration-200"
        />
      </div>
      <Dialog open={isOpen} onOpenChange={closeLightbox}>
        <DialogOverlay className="fixed inset-0 bg-black/70 z-50" />
        <DialogContent className="max-w-5xl overflow-hidden">
          <div className="h-[60vh]">
            <CldImage
              src={src}
              width={600}
              height={600}
              alt={alt}
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-200"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageLightbox;
