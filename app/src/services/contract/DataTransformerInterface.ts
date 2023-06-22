export interface DataTransformerInterface {
    process(transaction: object): object;
};
