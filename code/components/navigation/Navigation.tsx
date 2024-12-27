import NavigationItem from "./NavigationItem";

export default function Navigation() {
    return (
        <nav>
            <ul className="hidden lg:grid grid-cols-2">
                <NavigationItem section="about" title="About"/>
                <NavigationItem section="experience" title="Experience"/>
                <NavigationItem section="education" title="Education"/>
                <NavigationItem section="featured-projects" title="Projects"/>
                <NavigationItem section="technologies" title="Technologies*"/>
                <NavigationItem section="wrapped" title="Github Wrapped"/>
                <NavigationItem section="resume" title="Resume"/>
                <NavigationItem section="hobbies" title="Hobbies*"/>
                <NavigationItem section="spotify" title="Spotify"/>
            </ul>
        </nav>
    );
}