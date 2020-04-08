import { ITimeConfig } from "../src/index";
import loader from "../src/index";

const myNetworkRequest = (timeout: number = 1000): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("Network request over!"), timeout);
  });
};

const shortLoading = jest.fn();
const longLoading = jest.fn();
const errorHandler = jest.fn();
const doneHandler = jest.fn();

describe("Testing loading status", () => {
  it("Request ends in 200 ms", (done) => {
    const timingConfig: ITimeConfig = {
      busyDelayMs: 300,
    };
    loader(
      myNetworkRequest(200),
      {
        shortLoading: shortLoading,
        longLoading: longLoading,
        done: doneHandler,
        error: errorHandler,
      },
      timingConfig
    );

    setTimeout(() => {
      expect(shortLoading).toHaveBeenCalledTimes(0);
      expect(longLoading).toHaveBeenCalledTimes(0);
      expect(errorHandler).toHaveBeenCalledTimes(0);
      expect(doneHandler).toBeCalledTimes(1);
      done();
    }, 2000);
  });

  it("Request ends in 400 ms", (done) => {
    const timingConfig: ITimeConfig = {
      busyDelayMs: 300,
      shortIndicatorVisibilityMs: 300,
    };
    loader(
      myNetworkRequest(400),
      {
        shortLoading: shortLoading,
        longLoading: longLoading,
        done: doneHandler,
        error: errorHandler,
      },
      timingConfig
    );

    setTimeout(() => {
      expect(shortLoading).toHaveBeenCalledTimes(1);
      expect(longLoading).toHaveBeenCalledTimes(0);
      expect(errorHandler).toHaveBeenCalledTimes(0);
      expect(doneHandler).toBeCalledTimes(1);
      done();
    }, 2000);
  });

  it("Request ends in 800 ms", (done) => {
    const timingConfig: ITimeConfig = {
      busyDelayMs: 300,
      shortIndicatorVisibilityMs: 300,
      longIndicatorVisibilityMs: 300,
    };
    loader(
      myNetworkRequest(800),
      {
        shortLoading: shortLoading,
        longLoading: longLoading,
        done: doneHandler,
        error: errorHandler,
      },
      timingConfig
    );

    setTimeout(() => {
      expect(shortLoading).toHaveBeenCalledTimes(1);
      expect(longLoading).toHaveBeenCalledTimes(0);
      expect(errorHandler).toHaveBeenCalledTimes(0);
      expect(doneHandler).toBeCalledTimes(1);
      done();
    }, 2000);
  });

  it("Request ends in 1200 ms", (done) => {
    const timingConfig: ITimeConfig = {
      busyDelayMs: 300,
      shortIndicatorVisibilityMs: 300,
      longIndicatorVisibilityMs: 300,
    };
    loader(
      myNetworkRequest(1200),
      {
        shortLoading: shortLoading,
        longLoading: longLoading,
        done: doneHandler,
        error: errorHandler,
      },
      timingConfig
    );

    setTimeout(() => {
      expect(shortLoading).toHaveBeenCalledTimes(1);
      expect(longLoading).toHaveBeenCalledTimes(1);
      expect(errorHandler).toHaveBeenCalledTimes(0);
      expect(doneHandler).toBeCalledTimes(1);
      done();
    }, 2000);
  });
});
