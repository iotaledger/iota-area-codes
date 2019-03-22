import { Heading } from "iota-react-components";
import React, { Component, ReactNode } from "react";

/**
 * Component which will show information about IACs.
 */
class Introduction extends Component<any, any> {
    /**
     * Render the component.
     * @returns The node to render.
     */
    public render(): ReactNode {
        return (
            <React.Fragment>
                <Heading level={1}>IOTA Area Codes (IAC)</Heading>
                <p>IACs are short, tryte encoded, location codes that can be used to tag and retrieve IOTA transactions related to
                     specific locations. The IACs are typically 11 trytes long and will represent a 13.5m by 13.5m area,
                     at the equator. However IACs can be 12 trytes long and represent a 2.8m by 3.5m grid.</p>

                <p>For example: In IAC, you can represent the location of the IOTA Foundation's registered address as `NPHTQORL9XK`</p>

                <p>IACs are a direct copy of the <a href="https://en.wikipedia.org/wiki/Open_Location_Code" target="_blank" rel="noreferrer noopener">Open Location Codes</a>,
                 also known as <a href="https://plus.codes/" target="_blank" rel="noreferrer noopener">Plus Codes</a>, proposed by Google Zurich in 2014.
                  There are a few minor changes to make it compatible with IOTA's encoding. Compare the differences below which are as follows:</p>

                <table>
                    <thead>
                        <tr>
                            <th>&nbsp;</th>
                            <th>OLC</th>
                            <th>IAC</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Example</td>
                            <td>9F4MGCH7+R6F</td>
                            <td>NPHTQORL9XK</td>
                        </tr>
                        <tr>
                            <td>Alphabet</td>
                            <td>23456789CFGHJMPQRVWX</td>
                            <td>FGHJKLMNOPQRSTUVXWYZ</td>
                        </tr>
                        <tr>
                            <td>Separator</td>
                            <td>+</td>
                            <td>9</td>
                        </tr>
                        <tr>
                            <td>Padding</td>
                            <td>0</td>
                            <td>A</td>
                        </tr>
                    </tbody>
                </table>

                <Heading level={2}>How it works</Heading>

                <p>Plus codes are based on latitude and longitude – the grid that can be used to describe every point on the planet.
                    By using a simpler code system, they end up much shorter and easier to use than traditional global coordinates.</p>

                <p>A plus code in its full length is 10 characters long, with a plus sign before the last two. It consists of two parts:</p>

                <ul>
                    <li>The first four characters are the area code, describing a region of roughly 100 x 100 kilometers.</li>
                    <li>The last six characters are the local code, describing the neighborhood and the building, an area of roughly 14 x 14 meters
                         – about the size of one half of a basketball court.</li>
                </ul>

                <p>Each code uses these two parts to locate a larger region and then find the precise location within that region.</p>

                <p>For those needing more precision, an additional, optional character can be used to improve accuracy to roughly 3 x 3 meters
                     – about the size of a small car. <i>The code length excludes the separator</i>.</p>

                <table>
                    <thead>
                        <tr>
                            <th>Code Length</th>
                            <th>2</th>
                            <th>4</th>
                            <th>6</th>
                            <th>8</th>
                            <th>10</th>
                            <th>11</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Blocks size</td>
                            <td>20°</td>
                            <td>1°</td>
                            <td>0.05° (3′)</td>
                            <td>0.0025° (9″)</td>
                            <td>0.000125° (0.45″)</td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>Approximately</td>
                            <td>2200 km</td>
                            <td>110 km</td>
                            <td>5.5 km</td>
                            <td>275 m</td>
                            <td>14 m</td>
                            <td>3.5 m</td>
                        </tr>
                    </tbody>
                </table>

                <Heading level={2}>Why would we want this</Heading>

                <p>When publishing information on IOTA there is no way to easily identify transactions that relate to a geographic areas.
                     These transactions could contain localised service advertisements, sensor information or any number of other data formats.</p>

                <p>In order to find transactions related to an area you'd have to register your transactions with a centralised service,
                    like a data marketplace, that collects locations to store and serve it to consumers. By using IACs in the first 12
                    trytes of the 27 tryte `tag` field in an IOTA transaction, we can localise an IOTA transaction to a 2.8m by 3.5m area.
                    This allows for someone to find a transaction related to a small area, however the **real value** of this system comes
                    from the ability to query large swaths of land for related transactions.</p>

                <Heading level={2}>Querying large areas</Heading>

                <p>The original OLC protocol is able to accurately represent areas on the globe by using 5 pairs of characters.
                    Each pair of characters added to the code represent a 400x increase in accuracy. A side effect of the code
                    being determined by a set of pairs, rather than a unique code, is we are able to vary the accuracy by removing
                    pairs from right to left. This allows us to ingest and store the pairs in a way that we can query some what efficiently.</p>

                <p>So by querying the initial 4 trytes of tags, that match the correct IAC format, we can find transactions in a 100km by 100km
                     area. By querying for all tags that start with `NPHT` we can find all items in a 100km by 100km area covering Berlin & parts
                      of Potsdam. Then by using these 6 trytes: `NPHTQO` we are able to see transactions within a few suburbs in central/north Berlin.</p>
            </React.Fragment >
        );
    }
}

export default Introduction;
