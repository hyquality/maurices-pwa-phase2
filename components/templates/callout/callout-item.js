import Link from "next/link";
export default function CalloutItem({data}) {
    const cell = data;
    return (
        <div  className="flex pb-9 md:pb-0">
            <div>
                <img src={cell.icon}
                     className="max-w-cellout-width-small lg:max-w-cellout-width h-auto mr-6"/>
            </div>
            <div>
                <h4 className="text-sm font-bold">{cell.title}</h4>
                <p className="text-xs">{cell.text}</p>

                <ul className="flex pt-5">
                    {cell.nav ? (
                        cell.nav.map((link) => (
                            <li key={"cell-" + cell.id + "_" + link.id} className="text-xs pr-5">
                                <Link href={link.url}>
                                    <a className="underline hover:no-underline">{link.text}</a>
                                </Link>
                            </li>
                        ))
                    ):("")}
                </ul>
            </div>
        </div>
    )
}
