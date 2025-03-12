import Task from "../models/taskModel.js";

async function getTasks(req, res) {
  const { id } = req.user;

  try {
    const tasks = await Task.findAll({ where: { user_id: id } });

    res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}

async function createTask(req, res) {
  const { id } = req.user;
  const { content, completed } = req.body;

  console.log(id);

  try {
    if (content === "" || !content) {
      return res.status(400).json({ message: "Task cannot be empty" });
    }

    const newTask = await Task.create({
      user_id: id,
      content: content,
      completed: completed,
    });

    res.status(201).json({
      message: "Task creation successful",
      content: newTask.content,
      id: newTask.id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}

async function updateTask(req, res) {
  try {
    const { id } = req.params;
    const user = req.user;
    const task = await Task.findOne({ where: { user_id: user.id, id: id } });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.completed = !task.completed;
    await task.save();

    res.status(200).json({ message: "Task updated", id: task.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Error" });
  }
}

async function deleteTask(req, res) {
  try {
    const { id } = req.params;
    const user = req.user;

    const task = await Task.findOne({
      where: { user_id: user.id, id: id },
    });

    if (!task) {
      return res
        .status(404)
        .json({ message: "Task not found or unauthorized" });
    }

    await task.destroy();
    res.status(200).json({ message: "Task removed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}

export { createTask, getTasks, updateTask, deleteTask };
