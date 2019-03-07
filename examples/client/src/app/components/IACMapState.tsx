interface Transactions {
  iac: string
  tx_id: string
}

export interface IACMapState {
  /**
   * Should we show the map.
   */
  transactions: Array<Transactions>

  mapCenter: any

  zoom: any

  tx?: {
    iac: string
    tx_id: string
  }
}
