import { Button, IconButton, ListItem } from "@material-ui/core";
import * as React from "react";
import IncrementIcon from "@material-ui/icons/ExpandLess";
import DecrementIcon from "@material-ui/icons/ExpandMore";
import DeleteIcon from "@material-ui/icons/Delete";

export default (props) => (
    <ListItem>
        <div>
            {props.tech.name} {props.tech.count}
        </div>
        <div>
            <IconButton
                color="primary"
                aria-label="Increment"
                onClick={(event, action) => props.incrementFn()}
            >
                <IncrementIcon />
            </IconButton>
            <IconButton
                color="secondary"
                aria-label="Decrement"
                onClick={(event, action) => props.decrementFn()}
                disabled={props.tech.count === 0}
            >
                <DecrementIcon />
            </IconButton>
            <IconButton
                color="secondary"
                aria-label="Delete"
                onClick={(event, action) => props.deleteFn()}
            >
                <DeleteIcon />
            </IconButton>
        </div>
    </ListItem>
);
//2 more props for handlers for each button -done
