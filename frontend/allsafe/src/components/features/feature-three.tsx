// React and Next.js imports
import Image from "next/image";
import Link from "next/link";

// UI component imports
import * as Craft from "@/components/craft";
import { Button } from "@/components/ui/button";
import { TypographyH2 } from "@/typography/h2";
import { TypographyH3 } from "@/typography/h3";

// Asset imports
// import Placeholder from "@/public/placeholder.jpg";

const FeatureLeft = ({title, body}: {title: string, body: string}) => {
  return (
    <Craft.Section>
      <Craft.Container className="grid items-stretch md:grid-cols-2 md:gap-12">
        <div className="not-prose relative flex h-96 overflow-hidden rounded-lg border">
          {/* <Image
            src={Placeholder}
            alt="placeholder"
            className="fill object-cover"
          /> */}
        </div>
        <div className="flex flex-col gap-6 py-8">
          <TypographyH3 className="!my-0">{title}</TypographyH3>
          <p className="font-light leading-[1.4] opacity-70">
            {body}
          </p>
          <div className="not-prose flex items-center gap-2">
            <Button className="w-fit" asChild>
              <Link href="#">Get Started</Link>
            </Button>
            <Button className="w-fit" variant="link" asChild>
              <Link href="#">Learn More {"->"}</Link>
            </Button>
          </div>
        </div>
      </Craft.Container>
    </Craft.Section>
  );
};

export default FeatureLeft;