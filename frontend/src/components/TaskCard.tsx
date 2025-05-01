"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

// Define Task type locally
interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface TaskCardProps {
  task: Task;
  onUpdate: (task: Task) => void;
  onDelete: (id: string) => void;
}

export default function TaskCard({ task, onUpdate, onDelete }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const handleToggleComplete = () => {
    onUpdate({ ...task, completed: !task.completed });
  };

  const handleSave = () => {
    if (title.trim()) {
      onUpdate({ ...task, title });
      setIsEditing(false);
    }
  };

  return (
    <Card className="mb-2">
      <CardContent className="flex items-center justify-between p-4 gap-4">
        {isEditing ? (
          <div className="flex flex-1 gap-2">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 p-2 border rounded-md"
              autoFocus
            />
            <Button onClick={handleSave} className="bg-green-500 hover:bg-green-600">
              Save
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                setTitle(task.title);
                setIsEditing(false);
              }}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 flex-1">
              <Checkbox
                checked={task.completed}
                onCheckedChange={handleToggleComplete}
              />
              <span className={task.completed ? "line-through text-muted-foreground" : ""}>
                {task.title}
              </span>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setIsEditing(true)} variant="outline">
                Edit
              </Button>
              <Button onClick={() => onDelete(task.id)} variant="destructive">
                Delete
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}