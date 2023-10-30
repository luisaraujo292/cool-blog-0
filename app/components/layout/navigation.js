import Link from "next/link";
import styles from "./navigation.module.css"


export default function Navigation(){
    return(
        <header className={styles.header}>
            <Link href="/" className={styles["nav-link"]}>
                Home
            </Link>

            <nav>
                <ul>
                    <li>
                        <Link href="/posts" className={styles["nav-link"]}>
                            posts
                        </Link>
                    </li>

                    <li>
                        <Link href="/login" className={styles["nav-link"]}>
                            Sing in
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}