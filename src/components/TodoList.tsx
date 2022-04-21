import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Todo } from '../model';
import { SingleTodo } from './SingleTodo';
import './styles.css';

interface Props {
  todos: Todo[];
  completed: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setCompleted: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const TodoList = ({
  todos,
  setTodos,
  completed,
  setCompleted,
}: Props) => {
  return (
    <div className="container">
      <Droppable droppableId={'chnageagain'}>
        {(provided) => (
          <div
            className="todos"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Undone</span>
            {todos.map((todo, index) => (
              <SingleTodo
                index={index}
                todo={todo}
                key={todo.id}
                todos={todos}
                setTodos={setTodos}
              />
            ))}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TodosCompleted">
        {(provided) => (
          <div
            className="todos"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Done</span>
            {completed.map((todo, index) => (
              <SingleTodo
                index={index}
                todo={todo}
                key={todo.id}
                todos={completed}
                setTodos={setCompleted}
              />
            ))}
          </div>
        )}
      </Droppable>
    </div>
  );
};
