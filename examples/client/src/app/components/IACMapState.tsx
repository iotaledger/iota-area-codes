export interface IACMapState {
    /**
     * The center for the map.
     */
    mapCenter: {
        /**
         * The latitude for the center.
         */
        latitude: number;
        /**
         * The longitude for the center.
         */
        longitude: number;
    };

    /**
     * The zoom for the map.
     */
    zoom: number;
}
