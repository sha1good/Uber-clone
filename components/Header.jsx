import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

const Header = () => {
  const headerMenu = [
    {
      id: 1,
      name: "Ride",
      icons:
        "https://media.istockphoto.com/id/1386831709/photo/pink-retro-toy-car-isolated-on-white.jpg?s=1024x1024&w=is&k=20&c=cciRN02gNAgUAE3KYg0OlX72Fc0gcdPUPWrtl_PelDs=",
    },
    {
      id: 2,
      name: "Package",
      icons:
        "https://media.istockphoto.com/id/1363734940/photo/three-cardboard-boxes.jpg?s=1024x1024&w=is&k=20&c=sOKUVZ4XG2vnerX1oLchQiOkfM2CcVSiTMpxzIDay8Q=",
    },
  ];

  return (
    <div className="p-4 pb-4 pl-10 border-b-[4px] border-gray-200 flex items-center justify-between">
      <div className="flex gap-24 items-center">
        <span className="font-bold">Uber Eats</span>
        <div className="flex gap-6 items-center">
          {headerMenu.map((item) => (
            <div className="flex gap-6 items-center" key={item.id}>
              <Image src={item.icons} width={17} height={17} alt="igm" />
              <h2 className="text-[14px] font-bold">{item.name}</h2>
            </div>
          ))}
        </div>
      </div>
      <UserButton />
    </div>
  );
};

export default Header;
