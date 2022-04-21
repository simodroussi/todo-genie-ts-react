import React, { useEffect, useRef, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import { Todo } from '../model';

type Props = {
  todo: Todo;
  todos: Todo[];
  index: number;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export const SingleTodo = ({ todo, todos, setTodos, index }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  const inputEditRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputEditRef.current?.focus();
  }, [edit]);

  const handleDone = (todoId: number) => {
    setTodos(
      todos.map((todoItem) =>
        todoItem.id === todo.id
          ? { ...todo, isDone: !todoItem.isDone }
          : todoItem
      )
    );
  };

  const handleDelete = (todoId: number) => {
    setTodos(todos.filter((todoItem) => todoItem.id !== todo.id));
  };

  const handleEdit = (e: React.FormEvent, todoId: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todoItem) =>
        todoItem.id === todo.id ? { ...todo, todo: editTodo } : todoItem
      )
    );
    setEdit(false);
  };

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided) => (
        <form
          className="todos__single"
          onSubmit={(e) => handleEdit(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {edit ? (
            <input
              ref={inputEditRef}
              type="text"
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className="todos__single--text"
            />
          ) : todo.isDone ? (
            <s className="todos__single--text">{todo.todo}</s>
          ) : (
            <span className="todos__single--text">{todo.todo}</span>
          )}
          <div>
            <span
              className="icon"
              onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit);
                }
              }}
            >
              <AiFillEdit />
            </span>
            <span className="icon" onClick={(e) => handleDelete(todo.id)}>
              <AiFillDelete />
            </span>
            <span className="icon" onClick={(e) => handleDone(todo.id)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};
