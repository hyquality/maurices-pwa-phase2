import styles from './Nav.module.scss'
import Link from 'next/link'
export default function Nav() {
    return (
        <nav>
            <ul className={styles.nav}>
                <li>
                    <Link href={"/"}>
                        <a>Home</a>
                    </Link>
                </li>
                <li>
                    <Link href={"/posts/first-post"}>
                        <a>this page!</a>
                    </Link>
                </li>

            </ul>
        </nav>
    )
}