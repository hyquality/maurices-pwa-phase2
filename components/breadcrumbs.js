import Link from 'next/link'
export default function Breadcrumbs({title="Home"}) {

    return <ul className="py-8">
        <li>
            <Link href={"/"}>
                <a className="text-xs text-red">{title}</a>
            </Link>
        </li>
    </ul>
}