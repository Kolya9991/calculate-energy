
module.exports = {
    webpack: (config, { isServer }) => {
        config.module.rules.push({
            test: /\.html$/,
            loader: 'html-loader',
        });
        if (!isServer) {
            config.resolve.alias['bluebird'] = false;
            config.resolve.alias['underscore'] = false;
        }
        return config;
    },
};
