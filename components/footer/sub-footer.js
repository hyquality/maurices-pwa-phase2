import Link from "next/link";
import Container from "@components/container";
export default function SubFooter({data}) {
    return (
            <div className="sub-footer bg-gray_1 py-5">
            <Container>
              <ul className="block text-center w-full md:flex md:justify-center md:items-center">
                  <li className="text-xs px-5 block text-center">{data.copy}</li>
                  {data.nav.map((link) => (
                      <li key={"subfooter-"+link.id} className="block">
                          <Link href={link.url}>
                              <a className="text-xs border-l-0 md:border-l md:border-gray_3 px-3 md:px-5">{link.text}</a>
                          </Link>
                      </li>
                  ))}
              </ul>
            </Container>
        </div>


    )
}
