import { createLoader, parseAsInteger, parseAsString , parseAsStringEnum } from "nuqs/server";
import { DEFAULT_PAGE } from "@/constants";

import { MeetingStatus } from "@/app/(dashboard)/types/types";

export const filtersSearchParams = {
    search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
    page: parseAsInteger.withDefault(DEFAULT_PAGE).withOptions({ clearOnDefault: true }),
    status : parseAsStringEnum(Object.values(MeetingStatus)),
    agentId : parseAsString.withDefault("").withOptions({clearOnDefault : true}),
}

export const  loadSearchParams = createLoader(filtersSearchParams)
