import "iota-css-theme";
import { Footer, FoundationDataHelper, GoogleAnalytics, Header, LayoutAppSingle, SideMenu, StatusMessage } from "iota-react-components";
import React, { Component, ReactNode } from "react";
import { Link, Route, RouteComponentProps, Switch, withRouter } from "react-router-dom";
import logo from "../assets/logo.svg";
import { ServiceFactory } from "../factories/serviceFactory";
import { IConfiguration } from "../models/config/IConfiguration";
import { ConfigurationService } from "../services/configurationService";
import { TangleExplorerService } from "../services/tangleExplorerService";
import { AppState } from "./AppState";
import Conversion from "./routes/Conversion";
import { ConversionProps } from "./routes/ConversionProps";
import Create from "./routes/Create";
import Introduction from "./routes/Introduction";
import Live from "./routes/Live";
import Query from "./routes/Query";

/**
 * Main application class.
 */
class App extends Component<RouteComponentProps, AppState> {
    /**
     * The configuration for the app.
     */
    private _configuration?: IConfiguration;

    /**
     * Create a new instance of App.
     * @param props The props.
     */
    constructor(props: any) {
        super(props);

        this.state = {
            isBusy: true,
            status: "Loading Configuration...",
            statusColor: "info",
            isSideMenuOpen: false
        };
    }

    /**
     * The component mounted.
     */
    public async componentDidMount(): Promise<void> {
        try {
            this.setState({ foundationData: await FoundationDataHelper.loadData() });

            const configService = new ConfigurationService<IConfiguration>();
            const configId = process.env.REACT_APP_CONFIG_ID || "local";
            const config = await configService.load(`/data/config.${configId}.json`);

            ServiceFactory.register("configuration", () => configService);
            ServiceFactory.register("tangleExplorer", () => new TangleExplorerService(config.tangleExplorer));

            this._configuration = config;

            this.setState({
                isBusy: false,
                status: "",
                statusColor: "success"
            });
        } catch (err) {
            this.setState({
                isBusy: false,
                status: err.message,
                statusColor: "danger"
            });
        }
    }

    /**
     * Render the component.
     * @returns The node to render.
     */
    public render(): ReactNode {
        return (
            <React.Fragment>
                <Header
                    title="IOTA Area Codes"
                    foundationData={this.state.foundationData}
                    logo={logo}
                    compact={true}
                    hamburgerClick={() => this.setState({ isSideMenuOpen: !this.state.isSideMenuOpen })}
                    hamburgerMediaQuery="tablet-up-hidden"
                />
                <nav className="tablet-down-hidden">
                    <Link className="link" to="/">Introduction</Link>
                    <Link className="link" to="/conversion">Conversion</Link>
                    <Link className="link" to="/create">Create</Link>
                    <Link className="link" to="/query">Query</Link>
                    <Link className="link" to="/live">Live Map</Link>
                </nav>
                <SideMenu
                    isMenuOpen={this.state.isSideMenuOpen}
                    handleClose={() => this.setState({ isSideMenuOpen: false })}
                    history={this.props.history}
                    items={[
                        {
                            name: "IOTA Area Codes",
                            isExpanded: true,
                            items: [
                                {
                                    items: [
                                        {
                                            name: "Introduction",
                                            link: "/"
                                        },
                                        {
                                            name: "Conversion",
                                            link: "/conversion"
                                        },
                                        {
                                            name: "Create",
                                            link: "/create"
                                        },
                                        {
                                            name: "Query",
                                            link: "/query"
                                        },
                                        {
                                            name: "Live",
                                            link: "/live"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]}
                    selectedItemLink={this.props.location.pathname}
                    mediaQuery="tablet-up-hidden"
                />
                <section className="content">
                    <LayoutAppSingle>
                        <StatusMessage status={this.state.status} color={this.state.statusColor} isBusy={this.state.isBusy} />
                        {!this.state.status && (
                            <Switch>
                                <Route exact={true} path="/" component={() => (<Introduction hash={Date.now()} />)} />
                                <Route exact={true} path="/conversion/:iac?" component={(p: ConversionProps) => (<Conversion {...p} />)} />
                                <Route exact={true} path="/create" component={() => (<Create hash={Date.now()} />)} />
                                <Route exact={true} path="/query" component={() => (<Query hash={Date.now()} />)} />
                                <Route exact={true} path="/live" component={() => (<Live hash={Date.now()} />)} />
                            </Switch>
                        )}
                    </LayoutAppSingle>
                </section>
                <Footer
                    history={this.props.history}
                    foundationData={this.state.foundationData}
                    sections={[
                        {
                            heading: "IOTA Area Codes",
                            links: [
                                {
                                    href: "/",
                                    text: "Introduction"
                                },
                                {
                                    href: "/conversion",
                                    text: "Conversion"
                                },
                                {
                                    href: "/create",
                                    text: "Create"
                                },
                                {
                                    href: "/query",
                                    text: "Query"
                                },
                                {
                                    href: "/live",
                                    text: "Live Map"
                                }
                            ]
                        }]} />
                <GoogleAnalytics id={this._configuration && this._configuration.googleAnalyticsId} />
            </React.Fragment>
        );
    }
}

export default withRouter(App);
