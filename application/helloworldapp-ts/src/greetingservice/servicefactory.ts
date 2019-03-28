import { Gateway } from 'fabric-network';
import * as fs from 'fs';
import { GreetingAPI } from './greetingapi';
export class ServiceFactory {

    public static async configure(gatewayProfilePath, connectOptions): Promise<ServiceFactory> {
        const gateway = new Gateway();

        // Load connection profile
        const gatewayprofile = JSON.parse(fs.readFileSync(gatewayProfilePath, 'utf8'));
        // Connect to gateway using application specified parameters
        await gateway.connect(gatewayprofile, connectOptions);

        return new ServiceFactory(gateway);
    }

    private gateway: Gateway;
    public constructor(gateway: Gateway) {
        this.gateway = gateway;
    }

    public async getServiceInstance(channel: string,
                                    name: string): Promise<GreetingAPI> {
        // get the network
        const network = await this.gateway.getNetwork(channel);

        const greetingAPI = new GreetingAPI(network);
        await greetingAPI.init(name);

        return greetingAPI;
    }

    public disconnect() {
        this.gateway.disconnect();
    }
}
