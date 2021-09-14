export default function AnnouncementBar({data}) {
    return (
        <div className="announcement-bar bg-red text-center text-white text-xs py-2.5">
            {data.text}
            {
                data.link
                    ? (
                        <a href={data.link.url} >{data.link.text}</a>
                    )
                    : null
            }
        </div>
    )
}