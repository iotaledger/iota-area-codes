import { RouteComponentProps } from "react-router";

export interface ConversionProps extends RouteComponentProps<{
    /**
     * The iota area code to automate.
     */
    iac?: string;
}> {
}
