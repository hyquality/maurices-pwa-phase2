export default function AnnouncementBar({data}) {
    return (
        <div className="announcement-bar bg-red text-center text-white text-xs py-2.5">
            {data.text}
            {
                data.link
                    ? (
                        <a href={data.link.url} className={"ml-2 underline hover:no-underline"}>{data.link.text}</a>
                    )
                    : null
            }
        </div>
    )
}