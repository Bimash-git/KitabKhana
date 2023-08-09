export declare const pklToJson: {
    convert(pklPath: string, jsonPath: string): Promise<string>;
    reconvert(jsonPath: string, pklPath: string): Promise<string>;
};
