// Modules
import axios from "axios";

// Interfaces
import { Callback, ErrorCallback } from "./interface/callback";

/**
 * Catch Async Error By Calling The Error Callback
 * @param cb Async function to be invoked
 * @param errcb Error callback function
 */
const catchAsync = function (
  cb: Callback,
  errcb?: ErrorCallback
): (...data: any[]) => Promise<void> {
  return async function (...data: any[]): Promise<void> {
    try {
      await cb(...data);
    } catch (err) {
      errcb?.(`${err.message}💥💥💥`);
    }
  };
};

/**
 * Custom Fetch
 * @param url Url to make request to
 */
const getJSON = async function <T>(url: string): Promise<T> {
  try {
    const response = await axios.get<T>(url, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.status === "404") {
        throw new Error("User with the username do not exist");
      }

      if (err.status === "500") {
        throw new Error("Something went wrong. Please try again later");
      }
    }
    throw err;
  }
};

/**
 * Transform Fetched Data Property To CamelCase
 * @param data Data to transform
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
 * Format Any Date To A Country Locale
 * @param locale Country locale (Default: 'en-GB')
 * @param date Date object to be formatted
 * @example dateFormatter("en-US", new Date())
 */
const dateFormatter = function (locale: string = "en-GB", date: Date): string {
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

export { getJSON, transformPropertyToCamelCase, dateFormatter, catchAsync };
