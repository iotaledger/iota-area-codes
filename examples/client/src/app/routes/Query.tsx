import * as IotaAreaCodes from "@iota/area-codes";
import { Button, Fieldset, Form, FormStatus, Heading } from "iota-react-components";
import React, { Component, ReactNode } from "react";
import { ServiceFactory } from "../../factories/serviceFactory";
import { IConfiguration } from "../../models/config/IConfiguration";
import { ConfigurationService } from "../../services/configurationService";
import { QueryClient } from "../../services/queryClient";
import IACTransactionCard from "../components/IACTransactionCard";
import "./Conversion.scss";
import { QueryState } from "./QueryState";

/**
 * Component which will show conversions with IACs.
 */
class Query extends Component<any, QueryState> {
    /**
     * The configuration.
     */
    private readonly _configuration: IConfiguration;

    /**
     * The query client.
     */
    private readonly _queryClient: QueryClient;

    /**
     * Create a new instance of Conversion.
     * @param props The props.
     */
    constructor(props: any) {
        super(props);

        this._configuration = ServiceFactory.get<ConfigurationService<IConfiguration>>("configuration").get();
        this._queryClient = new QueryClient(this._configuration.queryEndpoint);

        this.state = {
            isBusy: false,
            isErrored: false,
            status: "",
            userIotaAreaCode: ""
        };
    }

    /**
     * Render the component.
     * @returns The node to render.
     */
    public render(): ReactNode {
        return (
            <React.Fragment>
                <Heading level={1}>Query</Heading>
                <p>Enter a partial IOTA Area Code to search the database for transactions, maximum 8 characters and end the code with AA pairs for wildcard matches.</p>
                <p>Example queries could be NPAA or NPHTAA.</p>
                <Form>
                    <Fieldset>
                        <label>IOTA Area Code</label>
                        <input
                            type="text"
                            placeholder="Please enter the iota area code"
                            value={this.state.userIotaAreaCode}
                            onChange={(e) => this.setState({ userIotaAreaCode: e.target.value.toUpperCase() }, () => this.validateIotaAreaCode())}
                        />
                        <Button disabled={!this.state.userIotaAreaCodeIsValid} onClick={() => this.query()}>Query</Button>
                    </Fieldset>
                    <FormStatus message={this.state.status} isBusy={this.state.isBusy} isError={this.state.isErrored} />
                    {this.state.iacTransactions !== undefined && (
                        <React.Fragment>
                            <hr />
                            <Heading level={1}>Transactions</Heading>
                            {this.state.iacTransactions.length === 0 && (
                                <p>There are no IAC transactions within the specified area.</p>
                            )}
                            {this.state.iacTransactions.length > 0 && this.state.iacTransactions.map(item => (
                                <IACTransactionCard key={item.tx_id} iotaAreaCode={item.iac} transactionHash={item.tx_id} />
                            ))}
                        </React.Fragment>
                    )}
                </Form>
                <hr/>
                <p>For further information on how this code is implemeted visit the GitHub Repository for
                    the main library [<a href="https://github.com/iotaledger/iota-area-codes" target="_blank" rel="noreferrer noopener">@iota/area-codes</a>]
                    , the web app [<a href="https://github.com/iotaledger/iota-area-codes/tree/master/examples/client" target="_blank" rel="noreferrer noopener">Client</a>]
                    or the server [<a href="https://github.com/iotaledger/iota-area-codes/tree/master/examples/queryServer" target="_blank" rel="noreferrer noopener">Query Server</a>]
                </p>
            </React.Fragment>
        );
    }

    /**
     * Validate the iota area code using the library.
     */
    private validateIotaAreaCode(): void {
        let isValid = false;
        try {
            if (this.state.userIotaAreaCode) {
                isValid = IotaAreaCodes.isValidPartial(this.state.userIotaAreaCode);
            }
        } catch (err) {
        }
        this.setState({ userIotaAreaCodeIsValid: isValid });
    }

    /**
     * Search the api for transactions.
     */
    private async query(): Promise<void> {
        this.setState(
            {
                isBusy: true,
                isErrored: false,
                status: "Querying transactions, please wait..."
            },
            async () => {
                const response = await this._queryClient.query({
                    iac: this.state.userIotaAreaCode
                });

                if (response.success) {
                    this.setState({
                        isBusy: false,
                        status: "",
                        isErrored: false,
                        iacTransactions: response.items
                    });
                } else {
                    this.setState({
                        isBusy: false,
                        status: response.message,
                        isErrored: true
                    });
                }
            });
    }
}

export default Query;
