import { DEFAULT_PAGE } from "@/constants";
import {parseAsInteger , parseAsString, useQueryStates} from "nuqs";

/**
 * Custom hook to manage agent filters from query parameters.
 *
 * @returns {{
 *   search: string,
 *   page: number,
 *   setSearch: (value: string) => void,
 *   setPage: (value: number) => void,
 *   reset: () => void
 * }} Object containing search, page and their setters
 */
export const useAgentsFilters = () => {
    return useQueryStates({
        search : parseAsString.withDefault("").withOptions({clearOnDefault : true}),
        page : parseAsInteger.withDefault(DEFAULT_PAGE).withOptions({clearOnDefault : true}),
    });
}
