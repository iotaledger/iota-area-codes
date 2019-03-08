import React, { Component, ReactNode } from "react";
import { ServiceFactory } from "../../factories/serviceFactory";
import { TangleExplorerService } from "../../services/tangleExplorerService";
import "./IACMapMarker.scss";
import { IACMapMarkerProps } from "./IACMapMarkerProps";

/**
 * Component to display an IAC map marker.
 */
class IACMapMarker extends Component<IACMapMarkerProps, any> {
    /**
     * The tangle explorer service.
     */
    private readonly _tangleExplorerService: TangleExplorerService;

    /**
     * Create a new instance of EventCard.
     * @param props The props.
     */
    constructor(props: IACMapMarkerProps) {
        super(props);

        this._tangleExplorerService = ServiceFactory.get<TangleExplorerService>("tangleExplorer");
    }

    /**
     * Render the component.
     * @returns The node to render.
     */
    public render(): ReactNode {
        const posProps = {
            lat: this.props.lat,
            lng: this.props.lng
        };

        return (
            <button {...posProps} className="iac-map-marker" onClick={() => this._tangleExplorerService.transaction(this.props.transactionHash)}>
                <img alt="marker" src={this.props.icon} />
            </button>
        );
    }
}

export default IACMapMarker;
