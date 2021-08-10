export default function AnnouncementBar({data}) {
    return (
        <div>
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