import { List } from "@material-ui/core";
import * as React from "react";
import TechItem from "./TechItem";

export default (props) => (
    <List>
        {props.tech.map((tech, i) => (
            <TechItem
                tech={tech}
                key={i}
                incrementFn={props.incrementFn(i)}
                decrementFn={props.decrementFn(i)}
                deleteFn={props.deleteFn(i)}
            />
        ))}
    </List>
);
//pass the handlers inc and dec -done
//need to take a peram which item is updating look it up in a list -done
