import { DEFAULT_PAGE } from "@/constants";
import {parseAsInteger , parseAsString, useQueryStates , parseAsStringEnum} from "nuqs";
import { MeetingStatus } from "../../types/types";

/**
 * Custom hook to manage Meeting filters from query parameters.
 *
 * @returns {{
 *   search: string,
 *   page: number,
 *   setSearch: (value: string) => void,
 *   setPage: (value: number) => void,
 *   reset: () => void
 * }} Object containing search, page and their setters
 */
export const useMeetingsFilters = () => {
    return useQueryStates({
        search : parseAsString.withDefault("").withOptions({clearOnDefault : true}),
        page : parseAsInteger.withDefault(DEFAULT_PAGE).withOptions({clearOnDefault : true}),
        status : parseAsStringEnum(Object.values(MeetingStatus)),
        agentId : parseAsString.withDefault("").withOptions({clearOnDefault : true}),
    });
}
