import { AverageTxFeesByNetwork } from '../../wallets/interfaces';
import { INotification } from '../interfaces';
import RestClient from '../rest/RestClient';
import { captureError } from '../sentry';
import { config } from '../../config';

export default class Relay {
  public static checkCompatibility = async (
    method: string,
    version: string
  ): Promise<{
    compatible: boolean;
    alternatives: {
      update: boolean;
      message: string;
    };
  }> => {
    let res;
    try {
      res = await RestClient.post(`${config().RELAY}checkCompatibility`, {
        AUTH_ID: config().AUTH_ID,
        method,
        version,
      });
    } catch (err) {
      if (err.response) console.log(err.response.data.err);
      if (err.code) console.log(err.code);
    }
    const { compatible, alternatives } = res.data || res.json;
    return {
      compatible,
      alternatives,
    };
  };

  public static fetchReleaseNotes = async (version: string): Promise<any> => {
    let res;
    try {
      res = await RestClient.get(`${config().RELAY}releasesNotes?version=${version}`);
    } catch (err) {
      if (err.response) console.log(err.response.data.err);
      if (err.code) console.log(err.code);
    }
    return res.data || res.json;
  };

  public static updateFCMTokens = async (
    appId: string,
    FCMs: string[]
  ): Promise<{
    updated: boolean;
  }> => {
    try {
      let res;
      try {
        res = await RestClient.post(`${config().RELAY}updateFCMTokens`, {
          appID: appId,
          FCMs,
        });
      } catch (err) {
        if (err.response) throw new Error(err.response.data.err);
        if (err.code) throw new Error(err.code);
      }
      return res.data || res.json;
    } catch (err) {
      console.log('err', err);
      throw new Error('Failed to update FCM token');
    }
  };

  public static fetchNotifications = async (
    appID: string
  ): Promise<{
    notifications: INotification[];
    DHInfos: [{ address: string; publicKey: string }];
  }> => {
    let res;
    try {
      res = await RestClient.post(`${config().RELAY}fetchNotifications`, {
        AUTH_ID: config().AUTH_ID,
        appID,
      });
    } catch (err) {
      console.log({
        err,
      });
      if (err.response) throw new Error(err.response.data.err);
      if (err.code) throw new Error(err.code);
    }

    const { notifications, DHInfos } = res.data || res.json;
    return {
      notifications,
      DHInfos,
    };
  };

  public static sendNotifications = async (
    receivers: { appId: string; FCMs?: string[] }[],
    notification: INotification
  ): Promise<{
    sent: boolean;
  }> => {
    try {
      let res;

      if (!receivers.length) throw new Error('Failed to deliver notification: receivers missing');

      try {
        res = await RestClient.post(`${config().RELAY}sendNotifications`, {
          AUTH_ID: config().AUTH_ID,
          receivers,
          notification,
        });
      } catch (err) {
        if (err.response) throw new Error(err.response.data.err);
        if (err.code) throw new Error(err.code);
      }
      const { sent } = res.data || res.json;
      if (!sent) throw new Error();

      return {
        sent,
      };
    } catch (err) {
      throw new Error('Failed to deliver notification');
    }
  };

  public static fetchFeeAndExchangeRates = async (): Promise<{
    exchangeRates: any;
    averageTxFees: AverageTxFeesByNetwork;
  }> => {
    try {
      let res;
      try {
        // TODO: re-route fee/exchange-rates fetch from legacy relay to keeper-relay
        res = await RestClient.post(`${config().RELAY}fetchFeeAndExchangeRates`, {
          HEXA_ID: config().HEXA_ID,
        });
      } catch (err) {
        // console.log({ err });
        if (err.response) throw new Error(err.response.data.err);
        if (err.code) throw new Error(err.code);
      }
      const { exchangeRates, averageTxFees } = res.data || res.json;

      return {
        exchangeRates,
        averageTxFees,
      };
    } catch (err) {
      throw new Error('Failed fetch fee and exchange rates');
    }
  };

  public static sendKeeperNotifications = async (
    receivers: string[],
    notification: INotification
  ) => {
    try {
      let res;
      const obj = {
        AUTH_ID: config().AUTH_ID,
        receivers,
        notification,
      };
      try {
        res = await RestClient.post(`${config().RELAY}sendKeeperNotifications`, {
          AUTH_ID: config().AUTH_ID,
          receivers,
          notification,
        });
        const { sent } = res.data || res.json;
        if (!sent) throw new Error();
        return {
          sent,
        };
      } catch (err) {
        if (err.response) throw new Error(err.response.data.err);
        if (err.code) throw new Error(err.code);
      }
    } catch (err) {
      throw new Error('Failed to deliver notification');
    }
  };

  public static getMessages = async (
    appID: string,
    timeStamp: Date
  ): Promise<{
    messages: [];
  }> => {
    let res;
    try {
      res = await RestClient.post(`${config().RELAY}getMessages`, {
        AUTH_ID: config().AUTH_ID,
        appID,
        timeStamp,
      });
    } catch (err) {
      console.log({
        err,
      });
      if (err.response) throw new Error(err.response.data.err);
      if (err.code) throw new Error(err.code);
    }
    const { messages } = res.data || res.json;
    return {
      messages,
    };
  };

  public static updateMessageStatus = async (
    appId: string,
    data: []
  ): Promise<{
    updated: boolean;
  }> => {
    try {
      let res;
      try {
        res = await RestClient.post(`${config().RELAY}updateMessages`, {
          AUTH_ID: config().AUTH_ID,
          appId,
          data,
        });
      } catch (err) {
        if (err.response) throw new Error(err.response.data.err);
        if (err.code) throw new Error(err.code);
      }
      const { updated } = res.data || res.json;
      return {
        updated,
      };
    } catch (err) {
      throw new Error('Failed to fetch GetBittr Details');
    }
  };

  public static fetchAppImage = async (
    appId: string
  ): Promise<{
    appImage: any;
  }> => {
    try {
      let res;
      try {
        res = await RestClient.post(`${config().RELAY}v2/fetchappImage`, {
          AUTH_ID: config().AUTH_ID,
          appId: appId,
        });
      } catch (err) {
        if (err.response) throw new Error(err.response.data.err);
        if (err.code) throw new Error(err.code);
      }
      const { appImage } = res.data || res.json;
      return {
        appImage,
      };
    } catch (err) {
      throw new Error('Failed to fetch App Image');
    }
  };

  public static updateAppImage = async (
    appImage
  ): Promise<{
    status?: number;
    data?: {
      updated: boolean;
    };
    err?: undefined;
    message?: undefined;
  }> => {
    try {
      let res;
      res = await RestClient.post(`${config().RELAY}updateAppImage`, appImage);
      res = res.json || res.data;
      return {
        status: res.status,
      };
    } catch (err) {
      captureError(err);
      throw new Error('Failed to update App Image');
    }
  };

  public static updateVaultImage = async (
    vaultData
  ): Promise<{
    status?: number;
    data?: {
      updated: boolean;
    };
    err?: undefined;
    message?: undefined;
  }> => {
    try {
      let res;

      res = await RestClient.post(`${config().RELAY}updateVaultImage`, vaultData);

      res = res.json || res.data;
      return {
        status: res.status,
      };
    } catch (err) {
      captureError(err);
      throw new Error('Failed to update Vault Image');
    }
  };

  public static getAppImage = async (appId): Promise<any> => {
    try {
      let res;
      res = await RestClient.post(`${config().RELAY}getAppImage`, {
        id: appId,
      });
      const data = res.data || res.json;
      return data;
    } catch (err) {
      throw new Error('Failed get App Image');
      captureError(err);
    }
  };

  public static getVaultMetaData = async (signerId): Promise<any> => {
    try {
      let res;
      res = await RestClient.post(`${config().RELAY}getVaultMetaData`, {
        signerId,
      });
      const data = res.data || res.json;
      return data;
    } catch (err) {
      captureError(err);
      throw new Error('Failed get Vault Meta Data');
    }
  };

  public static getSignerIdInfo = async (signerId): Promise<any> => {
    try {
      const res = await RestClient.post(`${config().RELAY}getSignerIdInfo`, {
        signerId,
      });
      const data = res.data || res.json;
      return data.exsists;
    } catch (err) {
      captureError(err);
      throw new Error('Failed get SignerId Info');
    }
  };

  public static getVac = async (signerIdsHash): Promise<any> => {
    try {
      const res = await RestClient.post(`${config().RELAY}getVac`, {
        signerIdsHash,
      });
      const data = res.data || res.json;
      return data.encryptedVac;
    } catch (err) {
      captureError(err);
      throw new Error('Failed get Vac');
    }
  };
}
