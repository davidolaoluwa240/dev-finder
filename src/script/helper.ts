// Modules
import axios from "axios";

// Custom Types
type Callback = (...data) => Promise<void>;
type ErrorCallback = (message: string) => void;

/**
 * Invoke an async function and handle any async error or Re-throw any async error
 * @param cb Async function to be invoked
 * @param errcb Error callback function
 */
const catchAsync = function (
  cb: Callback,
  errcb?: ErrorCallback
): (...data) => Promise<void> {
  return async function (...data): Promise<void> {
    try {
      await cb(...data);
    } catch (err) {
      if (!errcb) throw err;
      if (axios.isAxiosError(err)) {
        if (err.response) {
          errcb(`${(err.response.data as { message: string }).message}💥💥💥`);
        }
      } else {
        errcb(`${err.message}💥💥💥`);
      }
    }
  };
};

/**
 * Custom Fetch
 * @param url Url to make request to
 */
const getJSON = async function <T>(url: string): Promise<T> {
  const response = await axios.get<T>(url, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

/**
 * Transform Fetched Data Property To CamelCase
 * @param data Data To Transform
 */
const transformPropertyToCamelCase = function <
  T extends Object,
  R extends Object
>(data: T): R {
  const transformedValue = Object.entries(data).map(([key, value]) => {
    const newKey = key
      .split("_")
      .map((word: string, index: number): string => {
        if (index === 0) return word;
        else return word[0].toUpperCase() + word.slice(1);
      })
      .join("");
    return [newKey, value];
  });
  return Object.fromEntries(transformedValue);
};

/**
 * Format any date to a country locale
 * @param locale Country locale (Default: 'en-GB')
 * @param date Date object to be formatted
 * @example dateFormatter("en-US", new Date())
 */
const dateFormatter = function (locale = "en-GB", date: Date): string {
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

export { getJSON, transformPropertyToCamelCase, dateFormatter, catchAsync };
