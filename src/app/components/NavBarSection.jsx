import Image from "next/image";
import Link from "next/link";

function NavBarSection() {
  return (
    <nav className="w-full flex py-4 px-32 justify-between items-center lg:px-64 lg:py-8">
      <Link
        href="/"
        className="text-sm font-medium text-foreground/60 hover:text-foreground/100 transition"
      >
        <Image
          src="https://www.jamar.com/cdn/shop/files/Logo-Jamar_new.svg?v=1721659704&width=100"
          alt="Jamar Logo"
          width={200}
          height={200}
          className="object-contain"
        />
      </Link>
    </nav>
  );
}

export default NavBarSection;
