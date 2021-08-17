import styles from './nav.module.scss'
import Link from 'next/link'
import NavList from "@components/templates/nav-list";
export default function Nav({data}) {
    return (
        <nav className=" border-t border-b border-gray_border border-solid z-20">
            <NavList data={data} className={styles.nav+" main-navigation relative justify-center flex"}/>
        </nav>
    )
}