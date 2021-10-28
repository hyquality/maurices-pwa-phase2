import Link from 'next/link'
export default function Breadcrumbs({title="Home", elements=[]}) {

    return <ul className="py-8">
        <li>
            <Link href={"/"}>
                <a className="text-xs text-red">{title}</a>
            </Link>
        </li>
        {
            elements.map((element, index) => (
                <li key={`breadcrumb-${index}`}>
                    <Link href={"/"}>
                        <a className="text-xs text-red">{element.displayName}</a>
                    </Link>
                </li>
            ))
        }
    </ul>
}