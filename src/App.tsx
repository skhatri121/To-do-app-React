import {
  Heading,
  Text,
  Box,
  Input,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";

function App() {
  const [task, setTask] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks !== null) {
      const parsedTasks = JSON.parse(storedTasks);
      setTask(parsedTasks);
    }
  }, []);

  const handleAddTask = () => {
    if (taskInput.trim() !== "") {
      const updatedTasks = [...task, taskInput];
      setTask(updatedTasks);
      setTaskInput("");
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    } else {
      alert("Add task");
    }
  };

  const handleUpdateTask = (index) => {
    if (taskInput.trim() !== "") {
      const updatedTasks = [...task];
      updatedTasks[index] = taskInput;
      setTask(updatedTasks);
      setTaskInput("");
      setEditIndex(null);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = task.filter((_, i) => i !== index);
    setTask(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleEditTask = (index) => {
    setEditIndex(index);
    setTaskInput(task[index]);
  };

  return (
    <>
      <Box>
        <Box maxW="1200px" m="0 auto" p="30px 10px 10px 10px">
          <Heading textAlign="center">To-do-App</Heading>
          <Box pt="10px" display="flex" gap="10px" px="20px">
            {editIndex !== null ? (
              <Text>Editing Mode On...</Text>
            ) : (
              <>
                <Input
                  placeholder="Add your task here"
                  value={taskInput}
                  id="addTask"
                  onChange={(e) => setTaskInput(e.target.value)}
                  border="1px"
                />
                <Button colorScheme="blue" onClick={handleAddTask}>
                  Add
                </Button>
              </>
            )}
          </Box>

          <Box pt="15px">
            <Table variant="striped" colorScheme="teal" border="2px solid">
              <Thead>
                <Tr>
                  <Th>Tasks to do:</Th>
                  <Th textAlign="end">Edit/Delete</Th>
                </Tr>
              </Thead>
              <Tbody>
                {task.map((todo, index) => (
                  <Tr key={index}>
                    <Td display="flex" gap="10px">
                      {index + 1}.{" "}
                      {editIndex === index ? (
                        <Input
                          value={taskInput}
                          onChange={(e) => setTaskInput(e.target.value)}
                          border="3px solid gray "
                        />
                      ) : (
                        todo
                      )}
                    </Td>
                    <Td textAlign="end">
                      {editIndex === index ? (
                        <Button
                          colorScheme="green"
                          onClick={() => handleUpdateTask(editIndex)}
                        >
                          Update
                        </Button>
                      ) : (
                        <>
                          <Box
                            display="flex"
                            gap="10px"
                            justifyContent="end"
                            cursor="pointer"
                          >
                            <EditIcon onClick={() => handleEditTask(index)} />
                            <DeleteIcon
                              onClick={() => handleDeleteTask(index)}
                            />
                          </Box>
                        </>
                      )}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default App;
