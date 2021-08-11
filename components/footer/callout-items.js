import Link from "next/link";
import Container from "@components/container";
export default function CalloutItems({data}) {
    return (
        <div className="bg-gray_1 py-10">
            <Container>
                <ul className="flex w-full">
                    {data.map((cell) => (
                        <li key={"cell-"+cell.id} className="flex flex-grow">
                            <img src={cell.icon} className="max-w-cellout-width h-auto mr-6"/>
                            <div>
                                <h4 className="text-sm font-bold">{cell.title}</h4>
                                <p className="text-xs">{cell.text}</p>

                                <ul className="flex pt-5">
                                    {cell.nav.map((link) => (
                                        <li key={"cell-"+cell.id+"_"+link.id}  className="text-xs pr-5">
                                            <Link href={link.url}>
                                                <a className="underline hover:no-underline">{link.text}</a>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    ))}
                </ul>
            </Container>
        </div>


    )
}
