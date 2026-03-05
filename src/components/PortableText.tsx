import {
  PortableText as PortableTextComponent,
  type PortableTextComponents,
} from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/image";

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      return (
        <figure className="my-6">
          <Image
            src={urlFor(value).width(800).url()}
            alt={value.alt || ""}
            width={800}
            height={500}
            className="rounded-lg"
          />
          {value.caption && (
            <figcaption className="mt-2 text-center font-serif text-sm text-text-light">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

interface Props {
  value: Parameters<typeof PortableTextComponent>[0]["value"];
}

export function PortableText({ value }: Props) {
  return (
    <div className="portable-text">
      <PortableTextComponent value={value} components={components} />
    </div>
  );
}
