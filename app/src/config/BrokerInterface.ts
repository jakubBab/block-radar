export interface BrokerInterface {
    channel: any;

    connect(): Promise<boolean>;

    sendMessage(queue, message): Promise<void>;

    close(): Promise<any>
}
