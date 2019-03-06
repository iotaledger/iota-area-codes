# Deployment

## Configuration

You should copy `./public/data/config.template.json` to `./public/data/config.dev.json` and modify it to point the `apiEndpoint` to wherever you have deployed the `api` package.

```js
{
    "node": {
        "provider": "https://MYNODE/",           /* A node to perform Tangle operations */
        "depth": 3,                              /* Depth to use for attaches */
        "mwm": 9                                 /* MWM to use for attaches */
    },
    "seed": "SEED",                              /* Seed to use for attaching transactions */
    "apiEndpoint": "API-ENDPOINT",               /* The url of the api endpoint e.g. https://api.my-domain.com */
    "queryEndpoint": "QUERY-ENDPOINT",           /* The url of the query endpoint e.g. https://query.my-domain.com */
    "tangleExplorer": {
        "transactions": "https://thetangle.org/transaction/:transactionHash",
        "bundles": "https://thetangle.org/bundle/:bundleHash"
    },
    "googleAnalyticsId": "GOOGLE-ANALYTICS-ID",  /* Optional, google analytics id */
    "googleMapsKey": "GOOGLE-MAPS-KEY"           /* Key for using with Google maps API */
}
```

## Build

```shell
npm run build
```

## Deploy

The app is configured to use zeit/now for hosting, you can configure `./now.json` to suit your own setup.

If you want to use a different name for the config file you can specify an environment variable of CONFIG_ID, e.g. set CONFIG_ID to `dev` will load `config.dev.json` instead.

After modifying the configuration files you can deploy using the folllowing commands:

```shell
now
```
