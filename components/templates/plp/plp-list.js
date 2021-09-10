import PlpCard from "@components/templates/plp/plp-card";

export default function PlpList({t, data}) {
    return (
        <>
            {
                data ? (
                    <>
                        <div className="flex justify-between">
                            <span className="text-sm text-gray_5">{data.length} {t('results')}</span>
                            <div className="sort">
                                <select className="text-sm text-gray_2 font-medium pl-4 py-2.5 border border-gray_3 min-w-min230">
                                    <option value="1">{t('Sort by Featured')}</option>
                                    <option value="2">{t('Sort by Price')}</option>

                                </select>
                            </div>
                        </div>
                        <ul className="flex justify-between flex-wrap border-b border-gray_border py-5 mb-8 ">
                            {
                                data.map((product, index) => (
                                    <li className="w-30"
                                        key={"product-" + product.slug + "-" + index}>
                                        <PlpCard data={product}/>

                                    </li>
                                ))
                            }
                        </ul>
                    </>
                ) : ("")
            }
        </>
    )
}
