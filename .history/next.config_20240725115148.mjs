/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "i.imgur.com",
			},
		],
	},
	webpack: (con)
};

export default nextConfig;
