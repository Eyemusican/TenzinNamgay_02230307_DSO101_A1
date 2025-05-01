"use client";

import { useEffect, useState } from "react";
// import InputWithButton from "@/components/inputWithButton";
// import TaskCard from "../../../components/ui/TaskCard";
// import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InputWithButton from "@/components/InputWithButton";
import TaskCard from "@/components/TaskCard";

// Define the Todo type to match your Prisma schema
interface Todo {
  id: number;
  title: string;
  completed: boolean;
  // Adjust field names if needed based on your actual Prisma schema
  createdAt?: string;
  updatedAt?: string;
}

// API base URL - use environment variable in production
const API_URL = "http://localhost:5000/api"; // Using port from your index.ts

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/todos`);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      setTodos(data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch todos:', err);
      setError('Failed to load tasks. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const addTodo = async (title: string) => {
    try {
      const response = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const newTodo = await response.json();
      setTodos([...todos, newTodo]);
    } catch (err) {
      console.error('Failed to add todo:', err);
      setError('Failed to add task. Please try again.');
    }
  };

  const updateTodo = async (task: { id: number, title: string, completed: boolean }) => {
    try {
      const response = await fetch(`${API_URL}/todos/${task.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          title: task.title,
          completed: task.completed 
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const updatedTodo = await response.json();
      setTodos(
        todos.map((todo) =>
          todo.id === task.id ? updatedTodo : todo
        )
      );
    } catch (err) {
      console.error('Failed to update todo:', err);
      setError('Failed to update task. Please try again.');
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error('Failed to delete todo:', err);
      setError('Failed to delete task. Please try again.');
    }
  };

  // Calculate progress
  const completedTasks = todos.filter(todo => todo.completed).length;
  const totalTasks = todos.length;
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Todo List</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <p>{error}</p>
        </div>
      )}
      
      <InputWithButton onSubmit={addTodo} />
      
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : todos.length === 0 ? (
        <Card className="mb-6">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4">No tasks yet. Add your first task above!</p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="mb-6">
            {todos.map((todo) => (
              <TaskCard
                key={todo.id}
                task={{
                  id: todo.id.toString(),
                  title: todo.title,
                  completed: todo.completed
                }}
                onUpdate={(task) => updateTodo({
                  id: parseInt(task.id),
                  title: task.title,
                  completed: task.completed
                })}
                onDelete={(id) => deleteTodo(parseInt(id))}
              />
            ))}
          </div>
          
          {/* Progress Card */}
          <Card>
            <CardHeader>
              <CardTitle>Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-2 flex justify-between text-sm">
                <span>{completedTasks} of {totalTasks} tasks completed</span>
                <span>{progressPercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}