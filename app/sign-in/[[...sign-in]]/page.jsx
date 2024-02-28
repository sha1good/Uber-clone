import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

function Page() {
  return (
    <>
      <div>
        <Image
          src="https://media.istockphoto.com/id/1311247904/photo/uber-car-waiting-for-customer.jpg?s=1024x1024&w=is&k=20&c=9iUiEa_byJFMuSO7shC9ECJl1DLCc-YVxlgDth4fV2g="
          width={900}
          height={1000}
          className="object-contain w-full h-full"
        />
      </div>
      <div className="absolute top-10 right-0">
        <SignIn />
      </div>
    </>
  );
}
export default Page;
