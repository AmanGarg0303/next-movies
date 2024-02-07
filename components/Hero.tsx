import Image from "next/image";
import bgImg from "../public/images/bgImg.jpg";

export const Hero = () => {
  return (
    <div className="relative w-screen h-[80vh]">
      <Image
        src={bgImg}
        // unoptimized
        priority
        alt="hero"
        fill
        style={{
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,1), rgba(0,0,0,0.9), rgba(0,0,0,0.4), rgba(0,0,0,0))",
        }}
      />

      <div className="absolute bottom-10 left-16 w-[40vw] flex flex-col gap-y-2">
        <h2 className="text-3xl font-semibold">The World of the Witcher</h2>
        <p className="text-gray-200">
          2017 &nbsp;●&nbsp; 5.1 &nbsp;●&nbsp; Action, Fantasy
        </p>
        <p className="text-gray-200">
          Well, it&apos;s where most of the Witcher takes place - the landmass
          containing both Nilfgaard and the Northern Kingdoms. It&apos;s also
          home to both the elves&apos; Brokilon Forest and the dwarfish mountain
          region of Mahakam. It&apos;s part of the Northern hemisphere, with the
          southern being much less explored and populus.
        </p>
      </div>
    </div>
  );
};
