import BigNumber from "bignumber.js";
import { Horizon } from "stellar-sdk";
import { Types } from "@stellar/wallet-sdk";
import { SERVICE_TYPES, EXTERNAL_SERVICE_TYPES } from "../constants/services";
import { APPLICATION_STATE } from "../constants/applicationState";
import { WalletType } from "../constants/hardwareWallet";
import { NetworkDetails } from "../constants/stellar";
export declare enum ActionStatus {
    IDLE = "IDLE",
    PENDING = "PENDING",
    SUCCESS = "SUCCESS",
    ERROR = "ERROR"
}
export interface UserInfo {
    publicKey: string;
}
export interface Response {
    error: string;
    messagedId: number;
    applicationState: APPLICATION_STATE;
    publicKey: string;
    privateKey: string;
    hasPrivateKey: boolean;
    mnemonicPhrase: string;
    isCorrectPhrase: boolean;
    confirmedPassword: boolean;
    password: string;
    mnemonicPhraseToConfirm: string;
    recoverMnemonic: string;
    transaction: {
        sign: (sourceKeys: {}) => void;
    };
    transactionXDR: string;
    signedTransaction: string;
    signedBlob: string;
    signedAuthEntry: string;
    source: string;
    type: SERVICE_TYPES;
    url: string;
    isDataSharingAllowed: boolean;
    isTestnet: boolean;
    isMemoValidationEnabled: boolean;
    isSafetyValidationEnabled: boolean;
    isValidatingSafeAssetsEnabled: boolean;
    isExperimentalModeEnabled: boolean;
    networkDetails: NetworkDetails;
    sorobanRpcUrl: string;
    networksList: NetworkDetails[];
    allAccounts: Array<Account>;
    accountName: string;
    assetCode: string;
    assetCanonical: string;
    iconUrl: string;
    network: string;
    networkIndex: number;
    networkName: string;
    recentAddresses: Array<string>;
    hardwareWalletType: WalletType;
    bipPath: string;
    blockedDomains: BlockedDomains;
    blockedAccounts: BlockedAccount[];
    assetDomain: string;
    contractId: string;
    tokenId: string;
    tokenIdList: string[];
    isConnected: boolean;
    isAllowed: boolean;
    userInfo: UserInfo;
    allowList: string[];
}
export interface BlockedDomains {
    [key: string]: boolean;
}
export interface BlockedAccount {
    address: string;
    name: string;
    domain: string | null;
    tags: string[];
}
export interface ExternalRequestBase {
    network: string;
    networkPassphrase: string;
    accountToSign: string;
    type: EXTERNAL_SERVICE_TYPES;
}
export interface ExternalRequestTx extends ExternalRequestBase {
    transactionXdr: string;
}
export interface ExternalRequestBlob extends ExternalRequestBase {
    blob: string;
}
export interface ExternalRequestAuthEntry extends ExternalRequestBase {
    entryXdr: string;
}
export declare type ExternalRequest = ExternalRequestTx | ExternalRequestBlob | ExternalRequestAuthEntry;
export interface Account {
    publicKey: string;
    name: string;
    imported: boolean;
    hardwareWalletType?: WalletType;
}
export declare enum AccountType {
    HW = "HW",
    IMPORTED = "IMPORTED",
    FREIGHTER = "FREIGHTER"
}
export interface Preferences {
    isDataSharingAllowed: boolean;
    isMemoValidationEnabled: boolean;
    isSafetyValidationEnabled: boolean;
    isValidatingSafeAssetsEnabled: boolean;
    networksList: NetworkDetails[];
    error: string;
    isExperimentalModeEnabled: boolean;
}
export declare type Settings = {
    allowList: string[];
    networkDetails: NetworkDetails;
    networksList: NetworkDetails[];
    error: string;
} & Preferences;
export interface AssetIcons {
    [code: string]: string;
}
export interface AssetDomains {
    [code: string]: string;
}
export declare type Balances = Types.BalanceMap | null;
export interface SorobanBalance {
    contractId: string;
    total: BigNumber;
    name: string;
    symbol: string;
    decimals: number;
}
export declare type AssetType = Types.AssetBalance | Types.NativeBalance | SorobanBalance;
export declare type TokenBalances = SorobanBalance[];
export declare type HorizonOperation = any;
export interface AccountBalancesInterface {
    balances: Balances;
    isFunded: boolean | null;
    subentryCount: number;
}
export interface AccountHistoryInterface {
    operations: Array<HorizonOperation> | [];
}
export interface ErrorMessage {
    errorMessage: string;
    response?: Horizon.ErrorResponseData.TransactionFailed;
}
declare global {
    interface Window {
        freighter: boolean;
        freighterApi: {
            [key: string]: any;
        };
    }
}
