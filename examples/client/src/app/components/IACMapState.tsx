export interface IACMapState {
    /**
     * The center for the map.
     */
    center: {
        /**
         * The latitude for the center.
         */
        lat: number;
        /**
         * The longitude for the center.
         */
        lng: number;
    };

    /**
     * The zoom for the map.
     */
    zoom: number;
}
