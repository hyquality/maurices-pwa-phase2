import Link from "next/link";
import Container from "@components/container";
export default function SubFooter({data}) {
    return (
            <div className="sub-footer bg-gray_1 py-5">
            <Container>
              <ul className="flex justify-center items-center">
                  <li className="text-xs px-5">{data.copy}</li>
                  {data.nav.map((link) => (
                      <li key={"subfooter-"+link.id}>
                          <Link href={link.url}>
                              <a className="text-xs border-l border-gray_3 px-5">{link.text}</a>
                          </Link>
                      </li>
                  ))}
              </ul>
            </Container>
        </div>


    )
}
