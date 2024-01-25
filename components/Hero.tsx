import Image from "next/image";

export const Hero = () => {
  return (
    <div className="relative ">
      <Image
        src="/images/bgImg.jpg"
        unoptimized
        priority
        alt="hero"
        width={200}
        height={200}
        style={{
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,1), rgba(0,0,0,0.9), rgba(0,0,0,0.4), rgba(0,0,0,0))",
        }}
        className="w-full h-[80vh]"
      />

      <div className="absolute bottom-10 left-16 w-[40vw] flex flex-col gap-y-2">
        <h2 className="text-3xl font-semibold">The World of the Witcher</h2>
        <p className="text-gray-200">2017 ● 5.1 ● Action, Fantasy</p>
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
