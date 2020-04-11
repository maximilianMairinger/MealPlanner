/**
 * A function that emits a side effect and does not return anything.
 * https://github.com/chodorowicz/ts-debounce/
 */
export type Procedure = (...args: any[]) => void;

export type Options = {
  isImmediate: boolean
  runImmediatelyFirstTimeOnly: boolean
}

export default function debounce<F extends Procedure>(
  func: F,
  waitMilliseconds = 50,
  option?: Partial<Options>
): (this: ThisParameterType<F>, ...args: Parameters<F>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const options: Options = Object.assign({
    isImmediate: false,
    runImmediatelyFirstTimeOnly: false
  }, option)

  return function(this: ThisParameterType<F>, ...args: Parameters<F>) {
    const context = this;

    const doLater = function() {
      timeoutId = undefined;
      if (!options.isImmediate) {
        func.apply(context, args);
      }
    }

    const shouldCallNow = (options.isImmediate || options.runImmediatelyFirstTimeOnly) && timeoutId === undefined;
    options.runImmediatelyFirstTimeOnly = false

    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(doLater, waitMilliseconds);

    if (shouldCallNow) {
      func.apply(context, args);
    }
  }
}