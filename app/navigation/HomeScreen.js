import React from "react";
import Tabs from "./tab";
import { ShowInfo } from "../screens";

export default function (Stack) {
    return (
        <>
            <Stack.Screen
                name="Tabs"
                component={Tabs}
            />

            <Stack.Screen
                name="ShowInfo"
                component={ShowInfo}
            />

        </>
    )
}