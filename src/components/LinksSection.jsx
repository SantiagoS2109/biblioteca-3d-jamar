import { BookmarkIcon, CubeIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

function LinksSection() {
  const linkBiblioteca =
    "https://organizacionjamar-my.sharepoint.com/:x:/g/personal/msoto_jamar_com/IQDaoVA_w7DIRJiasyBxQGP7AaNzPvQ0kompuh7wPAlcg00?rtime=5LkwF0o63kg";

  const linkTangibles =
    "https://organizacionjamar-my.sharepoint.com/:x:/r/personal/ssepulveda_jamar_com/_layouts/15/doc2.aspx?sourcedoc=%7B107E9695-ACF4-40C0-9C54-0DDF7079CF53%7D&file=MODELOS%203D%20-%20TANGIBLES%20PRIMERA%20TANTA%20(1)%20-%20Copia.xlsx&action=default&mobileredirect=true&DefaultItemOpen=1&wdOrigin=WAC.EXCEL.HOME-BUTTON%2CAPPHOME-WEB.FILEBROWSER.RECENT&wdPreviousSession=f57ca8a5-2b97-8a65-3561-83af6b8402a5&wdPreviousSessionSrc=Wac&ct=1766926527153";

  return (
    <section
      id="links"
      className="w-full flex flex-col items-center py-8 px-4 lg:px-64"
    >
      <h2 className="text-2xl font-medium mb-8 lg:text-4xl">Links</h2>

      <div className="w-full flex justify-center gap-4">
        <Link
          className="flex items-center py-2 px-4 rounded-full transition-all duration-300 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
          href={linkBiblioteca}
          rel="noopener noreferrer"
          target="_blank"
        >
          <BookmarkIcon size={24} className="inline mr-2" />
          Biblioteca Excel
        </Link>

        <Link
          className="flex items-center py-2 px-4 rounded-full transition-all duration-300 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
          href={linkTangibles}
          rel="noopener noreferrer"
          target="_blank"
        >
          <CubeIcon size={24} className="inline mr-2" />
          Tangible Excel
        </Link>
      </div>
    </section>
  );
}

export default LinksSection;
