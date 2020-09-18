import React from "react";
import BatchSelector from "./BatchSelector/BatchSelector";

export const NavigationBar = (props) => {
    return (
        <div>
            <BatchSelector
                activeBatch={props.activeBatch}
                setActiveBatch={props.setActiveBatch}
            />
        </div>
    );
}