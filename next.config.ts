import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'archive.cetus.zone',
                port: '',
                pathname: '/assets/image/sui/sui.png',
                search: '',
            },
        ],
    },
};

export default nextConfig;
