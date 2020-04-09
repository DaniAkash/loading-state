export interface ITimeConfig {
  busyDelayMs?: number;
  longBusyDelay?: number;
  shortIndicatorVisibilityMs?: number;
  longIndicatorVisibilityMs?: number;
}

export type ISuspenseStatusTypes =
  | "none"
  | "pending-short"
  | "pending-long"
  | "done";

export interface ICallbacks<T> {
  shortLoading?: () => any;
  longLoading?: () => any;
  done?: (arg: T) => any;
  error?: (arg: Error) => any;
}

export default function loader<T>(
  suspense: Promise<T>,
  {
    shortLoading: shortLoadingCallback = () => null,
    longLoading: longLoadingCallback = () => null,
    done: doneCallback = () => null,
    error: errorCallback = () => null,
  }: ICallbacks<T> = {
    shortLoading: () => null,
    longLoading: () => null,
    done: () => null,
    error: () => null,
  },
  {
    busyDelayMs = 300,
    shortIndicatorVisibilityMs = 300,
    longIndicatorVisibilityMs = 300,
    longBusyDelay = 1000,
  }: ITimeConfig = {
    busyDelayMs: 300,
    longBusyDelay: 1000,
    shortIndicatorVisibilityMs: 300,
    longIndicatorVisibilityMs: 300,
  }
) {
  let response: T | undefined;
  let isDone: boolean = false;
  let isShortLoadingIndicatorOver: boolean = false;
  let isLongLoadingStarted: boolean = false;
  let isLongLoadingIndicatorOver: boolean = false;

  let onDone = (result: T) => {
    isDone = true;
    doneCallback(result);
  };

  const resolveSuspense = (): Promise<"done"> => {
    return new Promise<"done">((resolve, reject) => {
      suspense
        .then((result) => {
          response = result;
          resolve("done");
          setTimeout(() => {
            if (!isDone && isShortLoadingIndicatorOver) {
              if (!isLongLoadingStarted) {
                onDone(result);
              } else if (isLongLoadingIndicatorOver) {
                onDone(result);
              }
            }
          });
        })
        .catch((e) => errorCallback(e));
    });
  };

  const noLoadingIndicatorBuffer = (): Promise<"none"> =>
    new Promise<"none">((resolve) => {
      setTimeout(() => {
        resolve("none");
      }, busyDelayMs);
    });

  const displayLoadingIndicator = (): Promise<"pending-long"> =>
    new Promise<"pending-long">((resolve) => {
      setTimeout(() => {
        if (!response) {
          shortLoadingCallback();
        }
      }, busyDelayMs);

      setTimeout(() => {
        isShortLoadingIndicatorOver = true;
        if (!isDone && response) {
          onDone(response);
        }
      }, busyDelayMs + shortIndicatorVisibilityMs);

      setTimeout(() => {
        isLongLoadingIndicatorOver = true;
        if (!isDone && response) {
          onDone(response);
        }
      }, longBusyDelay + longIndicatorVisibilityMs);

      setTimeout(() => {
        if (!isDone) {
          if (!response) {
            isLongLoadingStarted = true;
            longLoadingCallback();
          } else {
            onDone(response);
          }
        }
        resolve("pending-long");
      }, longBusyDelay);
    });

  Promise.race([
    resolveSuspense(),
    noLoadingIndicatorBuffer(),
    displayLoadingIndicator(),
  ]).then((result) => {
    switch (result) {
      case "done":
        if (response) onDone(response);
        break;
      default:
        break;
    }
  });
}

// const myNetworkRequest = (timeout: number = 500): Promise<string> => {
//   console.log("Request ends in - ", timeout + " ms");

//   return new Promise((resolve, reject) => {
//     setTimeout(() => resolve("Network request over!"), timeout);
//   });
// };

// const timingConfig: ITimeConfig = {
//   busyDelayMs: 300,
//   shortIndicatorVisibilityMs: 300,
//   longIndicatorVisibilityMs: 300,
// };

// console.time("short");
// console.time("long");
// console.time("done");

// loader(
//   myNetworkRequest(),
//   {
//     shortLoading: () => {
//       console.log("---------------");
//       console.log("short loading");
//       console.timeEnd("short");
//       console.log("---------------");
//     },
//     longLoading: () => {
//       console.log("---------------");
//       console.log("long loading");
//       console.timeEnd("long");
//       console.log("---------------");
//     },
//     done: (result) => {
//       console.log("Done-----------");
//       console.log(result);
//       console.timeEnd("done");
//       console.log("---------------");
//     },
//     error: () => {},
//   },
//   timingConfig
// );
