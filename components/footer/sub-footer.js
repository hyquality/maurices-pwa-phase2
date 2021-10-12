import Link from "next/link";
import Container from "@components/container";
import {DataProviderContext} from '../layout-data-provider';
import {useContext} from "react";

export default function SubFooter() {
    const {
        footer
    } = useContext(DataProviderContext)
    const {subfooter} = footer || {}
    return (
        <div className="sub-footer bg-gray_1 py-5">
            <Container>
                <ul className="block text-center w-full md:flex md:justify-center md:items-center">
                    <li className="text-xs px-5 block text-center">{subfooter.copy}</li>
                    {subfooter.nav.map((link) => (
                        <li key={"subfooter-" + link.id} className="block">
                            <Link href={link.url}>
                                <a className="text-xs border-l-0 md:border-l md:border-gray_3 px-3 md:px-5">{link.text}</a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </Container>
        </div>


    )
}
