
import Link from 'next/link'
export default function Breadcrumbs() {

    return <ul className="py-8">
        <li>
            <Link href={"/"}>
                <a className="text-xs">Home</a>
            </Link>
        </li>
    </ul>
}