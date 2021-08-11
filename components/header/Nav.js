import styles from './Nav.module.scss'
import Link from 'next/link'
export default function Nav({data}) {
    return (
        <nav className="py-4 border-t border-b border-gray_border border-solid">
            <ul className={styles.nav+" justify-center flex"}>
                {data.map((link) => (
                    <li key={"nav-"+link.id}>
                        <Link href={link.url}>
                            <a>{link.text}</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}