import NavbarSection from "@/containers/navbar-section";
import UploadSection from "@/containers/upload-section";
import ImageSection from "@/containers/image-section";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="relative mx-auto grid min-h-screen">
      <NavbarSection />      
      <UploadSection />
      <ImageSection />
  </main>
  );
}
