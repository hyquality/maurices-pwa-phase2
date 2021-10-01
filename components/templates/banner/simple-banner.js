import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function SimpleBanner({data, className=""}) {
    return (
        <div className={"simple-banner text-center "+className}>
            <Link href={data.url}>
                <a>
                    <Image
                        alt={data.title}
                        src={data.image}
                        width={72}
                        height={64}
                        quality={100}
                    />
                </a>
            </Link>
        </div>
    )
}
