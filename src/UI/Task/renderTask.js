import Task from "./Task";
import React, {Fragment} from "react";

export const renderTask = (
    {children,
        toDeleteTask,
        toChangeIsComplete,
        toSelect,
        selectedId,
        ...task},i) => {

    return (
        <Fragment key={task.id}>
            <Task change={() => toChangeIsComplete(i)}
                  done={task.isComplete}
                  taskText={task.text}
                  toSelect={() => toSelect(i)}
                  selected={i === selectedId}
                  close={() => toDeleteTask(i)}
                  mins={null}
            />
            <div style={{margin:'0 0 0 10px'}}>
                {children && children.map((el,i)=>
                    renderTask({
                            ...el,
                            toDeleteTask,
                            toChangeIsComplete,
                            toSelect
                        },i)
                )}
            </div>
        </Fragment>
    );
};