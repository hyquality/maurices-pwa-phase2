
import Link from 'next/link'
export default function Breadcrumbs({t}) {

    return <ul className="py-8">
        <li>
            <Link href={"/"}>
                <a className="text-xs"> {t('home')}</a>
            </Link>
        </li>
    </ul>
}