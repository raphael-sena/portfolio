import Link from "next/link";

type NavItemProps = {
    section: string;
    title: string;
}

export default function NavigationItem({section, title}: NavItemProps) {
    return (
        <li>
            <Link href={`#${section}`} className="
                group h-7
                flex items-center gap-3
                cursor-pointer
                transition-all
            ">
                <div
                    className="h-0.5 rounded-full w-5 bg-black dark:bg-slate-50 group-hover:w-12 group-hover:bg-black dark:group-hover:bg-slate-50 transition-all"></div>
                {title}
            </Link>
        </li>
    );
}