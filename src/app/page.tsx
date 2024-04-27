import Image from "next/image";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { SubmitButton } from "./submit-button"
import { cloudinary } from "@/lib/cloudinary-setup";

export default function Home() {

  async function addAction(formData: FormData) {
    "use server";
    const image = formData.get("image") as File;
    const arrayBuffer = await image.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const uploadResult: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({}, (error, result) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(result);
        })
        .end(buffer);
    });

    // console.log(uploadResult);
    cookies().set("image", uploadResult?.url);
    revalidatePath("/");

    // tinggal masukin ke database imageURLnya === uploadResult?.url 
  }

  const cookieStore = cookies();
  const imageUrl = cookieStore.get("image")?.value || "/";

  return (
    <main className="h-screen p-20 space-y-10">
      <form action={addAction}>
        <input type="file" required={true} name="image" />
        <SubmitButton />

        </form>
        <div>
          <Image src={imageUrl} alt="image" className="w-screen aspect-auto" width="1000" height="1000" />
        </div>
    </main>
  );
}
