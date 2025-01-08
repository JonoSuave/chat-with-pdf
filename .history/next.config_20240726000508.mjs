import { config } from "process";

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "i.imgur.com",
			},
			{
				
			}
		],
	},
	future: { webpack5: true },
	webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
		config.resolve.alias.canvas = false;
		config.resolve.alias.encoding = false;
		return config;
	},
	// webpack: (config) => {
	// 	config.resolve.alias.canvas = false;

	// 	return config;
	// },
};

export default nextConfig;
