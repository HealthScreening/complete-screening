/**
 * Copyright (C) 2021 PythonCoderAS
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
import axios from "axios";
import objectToWrapper from "@healthscreening/object-to-wrapper"
import { screeningTypeType } from "@healthscreening/screening-types";

export interface SendRequestParams {
    firstName: string;
    lastName: string;
    email: string;
    isVaxxed: boolean;
    type: screeningTypeType;
}

export interface SubmitParams {
    Type: screeningTypeType;
    IsOther: boolean;
    IsStudent: 0 | 1;
    FirstName: string;
    LastName: string;
    Email: string;
    State: string;
    Location: string;
    Floor: string | null;
    Answer1: 0 | 1;
    Answer2: 0 | 1;
    Answer3?: 0 | 1;
    Answer4?: 0 | 1;
}
export default async function completeScreening(
    options: SendRequestParams
): Promise<boolean> {
    // We assume the browser has been started already.

    const obj: SubmitParams = {
        Type: options.type || "G",
        IsOther: false,
        IsStudent: 1,
        FirstName: options.firstName,
        LastName: options.lastName,
        Email: options.email,
        State: "NY",
        Location: "X445",
        Floor: null,
        Answer1: 0,
        Answer2: 0,
        Answer3: 0,
    };
    // We do not use the vaccinated option as of right now
    const response = await axios.post(
        "https://healthscreening.schools.nyc/home/submit",
        new URLSearchParams(objectToWrapper(obj)).toString(),
        {
            headers: {
                accept: "*/*",
                "accept-language": "en-US,en;q=0.9,bn;q=0.8",
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
        }
    );
    return response.status / 100 < 4;
}
