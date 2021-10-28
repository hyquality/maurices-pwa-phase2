import {REACT_APP_API_URL, REACT_APP_MODE} from "@lib/constants";
import axios from "axios";

export async function mapNavJson(slug) {
    let apiURL = `${REACT_APP_API_URL}${slug}${REACT_APP_MODE&&"/index.json"}`;

    return  await axios.get(apiURL).then(function (response) {

        let data = []
        let i;
        const navigation = response.data.navMenuItems;
        for (i = 0; i < navigation.length; i++) {
            let columns = []
            let navMenuColumns = navigation[i].navMenuColumns
            let navSpots = navigation[i].navSpots
            let r;
            for (r = 0; r < navMenuColumns.length; r++) {
                let items = []
                navMenuColumns[r].navMenuItems.map(item => (
                    items.push(
                        {
                            "text": item.displayName,
                            //"url": `${item.ancestorCategoryIds.join("/")}/${item.categoryId}`
                            "url": `catalog/${item.categoryId}`
                        }
                    )
                ))
                columns.push(
                    {
                        nav: items,
                    }
                )
            }

            let p;
            for (p = 0; p < navSpots.length; p++) {
                if (navSpots[p].type === "navigationMenuCategorySpot") {
                    columns.push(
                        {
                            banner: {
                                title: navSpots[p].displayName,
                                w: 180,
                                h: 200,
                                image: navSpots[p].imageUrl,
                                url: "#"
                            }
                        }
                    )
                }
                if (navSpots[p].type === "navigationMenuContentSpot") {
                    let categoryLinks = []
                    navSpots[p].categoryLinks.map((link, index) => (
                        categoryLinks.push(
                            {
                                text: link.displayName,
                                url: `/${link.categoryId}`
                            }
                        )
                    ))
                    columns.push(
                        {
                            template: {
                                path: "./banner/simple-text-banner",
                                class: "simple-text-banner",
                                data: {
                                    label: navSpots[p].label,
                                    title: navSpots[p].title,
                                    subtite: navSpots[p].subtitle,
                                    notation: navSpots[p].notation,
                                    color: navSpots[p].backgroundColor,
                                    textColor: navSpots[p].textColor,
                                    url: navSpots[p].linkUrl,
                                    nav: categoryLinks
                                }
                            }
                        }
                    )
                }
            }


            data.push({
                text: navigation[i].displayName,
                url: "",
                mega: columns
            })
        }

        return data
    })
}