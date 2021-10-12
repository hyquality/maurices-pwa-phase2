import Container from "@components/container";
import dynamic from "next/dynamic";


export default function CalloutList({data}) {
    const CalloutItem = dynamic(import("./callout-item"));

    return (
        <div className="bg-gray_1 pt-10 pb-0 md:py-10">
            <Container>
                <ul className="md:flex w-full">
                    {data.map((cell) => (
                        <li key={"cell-" + cell.id} className="flex-grow">
                            <CalloutItem data={cell}/>
                        </li>
                    ))}
                </ul>
            </Container>
        </div>
    )
}
