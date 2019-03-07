import * as IotaAreaCodes from '@iota/area-codes'
import {
  Button,
  Fieldset,
  Form,
  FormStatus,
  Heading
} from 'iota-react-components'
import React, { Component, ReactNode } from 'react'
import { ServiceFactory } from '../../factories/serviceFactory'
import { IConfiguration } from '../../models/config/IConfiguration'
import { ConfigurationService } from '../../services/configurationService'
import { QueryClient } from '../../services/queryClient'
import IACTransactionCard from '../components/IACTransactionCard'
import IACMap from '../components/IACMap'

import './Conversion.scss'
import { QueryState } from './QueryState'

/**
 * Component which will show conversions with IACs.
 */
class Query extends Component<any, QueryState> {
  /**
   * The configuration.
   */
  private readonly _configuration: IConfiguration

  /**
   * The query client.
   */
  private readonly _queryClient: QueryClient

  /**
   * Create a new instance of Conversion.
   * @param props The props.
   */
  constructor(props: any) {
    super(props)

    this._configuration = ServiceFactory.get<
      ConfigurationService<IConfiguration>
    >('configuration').get()
    this._queryClient = new QueryClient(this._configuration.queryEndpoint)

    this.state = {
      isBusy: false,
      isErrored: false,
      status: '',
      userIotaAreaCode: ''
    }
  }

  /**
   * Render the component.
   * @returns The node to render.
   */
  public render(): ReactNode {
    return (
      <React.Fragment>
        <Heading level={1}>Query</Heading>
        <p>
          Enter a partial IOTA Area Code to search the database for
          transactions, end the code with AA pairs for wildcard matches.
        </p>
        <Form>
          <Fieldset>
            <label>IOTA Area Code</label>
            <input
              type="text"
              placeholder="Enter partial, 9 Tryte IAC ie. NPHTAAAA9"
              value={this.state.userIotaAreaCode}
              onChange={e =>
                this.setState({ userIotaAreaCode: e.target.value }, () =>
                  this.validateIotaAreaCode()
                )
              }
            />
            <Button
              disabled={!this.state.userIotaAreaCodeIsValid}
              onClick={() => this.query()}
            >
              Query
            </Button>
          </Fieldset>
          <FormStatus
            message={this.state.status}
            isBusy={this.state.isBusy}
            isError={this.state.isErrored}
          />
          {this.state.iacTransactions !== undefined && (
            <div>
              <React.Fragment>
                <hr />
                <Heading level={1}>Map</Heading>
                {this.state.iacTransactions.length > 0 && (
                  <IACMap
                    query={this.state.userIotaAreaCode}
                    transactions={this.state.iacTransactions}
                  />
                )}
              </React.Fragment>
              <React.Fragment>
                <hr />
                <Heading level={1}>Transactions</Heading>
                {this.state.iacTransactions.length === 0 && (
                  <p>
                    There are no IAC transactions within the specified area.
                  </p>
                )}
                {this.state.iacTransactions.length > 0 &&
                  this.state.iacTransactions.map(item => (
                    <IACTransactionCard
                      key={item.tx_id}
                      iotaAreaCode={item.iac}
                      transactionHash={item.tx_id}
                    />
                  ))}
              </React.Fragment>
            </div>
          )}
        </Form>
      </React.Fragment>
    )
  }

  // /**
  //  * The google maps api was loaded capture the maps and map object.
  //  * @param map The map object.
  //  * @param maps The maps object.
  //  */
  // private apiLoaded(map: any, maps: any): void {
  //     this._map = map;
  //     this._maps = maps;
  // }

  // /**
  //  * The map was clicked.
  //  * @param event The click event.
  //  */
  // private mapClicked(event: ClickEventValue): void {
  //     this.updateIac(IotaAreaCodes.encode(event.lat, event.lng));
  // }

  // /**
  //  * Update based on iota area code.
  //  * @param iac The area code.
  //  */
  // private updateIac(iac: string): void {
  //     const area = IotaAreaCodes.decode(iac);

  //     this.setState({
  //         latitude: area.latitude,
  //         longitude: area.longitude,
  //         iotaAreaCode: iac,
  //         openLocationCode: IotaAreaCodes.toOpenLocationCode(iac),
  //         zoom: area.codePrecision === 2 ? 1 : area.codePrecision * 2
  //     });

  //     this.updateHighlight(area);
  // }

  // /**
  //  * Update the highlight on the map.
  //  * @param area The area to highlight.
  //  */
  // private updateHighlight(area: IotaAreaCodes.IacCodeArea): void {
  //     if (this._highlight) {
  //         this._highlight.setMap(undefined);
  //     }

  //     this._highlight = new this._maps.Rectangle({
  //         strokeColor: "#FF0000",
  //         strokeOpacity: 0.8,
  //         strokeWeight: 2,
  //         fillColor: "#FF0000",
  //         fillOpacity: 0.35,
  //         map: this._map,
  //         bounds: {
  //             south: area.latitudeLow,
  //             north: area.latitudeHigh,
  //             west: area.longitudeLow,
  //             east: area.longitudeHigh
  //         }
  //     });
  // }

  /**
   * Validate the iota area code using the library.
   */
  private validateIotaAreaCode(): void {
    let isValid = false
    try {
      if (this.state.userIotaAreaCode) {
        isValid = IotaAreaCodes.isValidPartial(this.state.userIotaAreaCode)
      }
    } catch (err) {}
    this.setState({ userIotaAreaCodeIsValid: isValid })
  }

  /**
   * Search the api for transactions.
   */
  private async query(): Promise<void> {
    this.setState(
      {
        isBusy: true,
        isErrored: false,
        status: 'Querying transactions, please wait...'
      },
      async () => {
        const response = await this._queryClient.query({
          iac: this.state.userIotaAreaCode
        })

        if (response.success) {
          this.setState({
            isBusy: false,
            status: '',
            isErrored: false,
            iacTransactions: response.items
          })
        } else {
          this.setState({
            isBusy: false,
            status: response.message,
            isErrored: true
          })
        }
      }
    )
  }
}

export default Query
