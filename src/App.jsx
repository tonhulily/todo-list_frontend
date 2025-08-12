import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Card, Table, Modal } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

import './App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  // Hàm lấy danh sách công việc từ API và sắp xếp chúng theo ID
  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      // Sắp xếp công việc theo ID để đảm bảo thứ tự nhất quán
      const sortedTasks = response.data.sort((a, b) => a.id - b.id);
      setTasks(sortedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setErrorMessage('Không thể tải danh sách công việc. Vui lòng thử lại sau.');
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) {
      alert('Vui lòng nhập tiêu đề công việc!');
      return;
    }
    try {
      await axios.post(API_URL, newTask);
      setNewTask({ title: '', description: '' });
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleCompleteTask = async (id) => {
    try {
      await axios.put(`${API_URL}/${id}`, { completed: true });
      fetchTasks();
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleDeleteTask = (task) => {
    setTaskToDelete(task);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (taskToDelete) {
      try {
        await axios.delete(`${API_URL}/${taskToDelete.id}`);
        // fetchTasks();
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskToDelete.id));
        setErrorMessage(''); // Xóa thông báo lỗi nếu có  
      } catch (error) {
        console.error('Error deleting task:', error);
      } finally {
        setShowDeleteModal(false);
        setTaskToDelete(null);
      }
    }
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setTaskToDelete(null);
  };

 return (
    <div className="d-flex flex-column min-vh-100">
      <header className="p-3 text-white text-center shadow-sm stylish-header">
        <h1>Ứng dụng Quản lý Công việc</h1>
      </header>

      <main className="flex-grow-1 bg-light py-5">
        <Container className="px-3 px-md-5">
          <Row className="justify-content-center">
            <Col lg={12}>
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <Card.Title className="text-center">Thêm công việc mới</Card.Title>
                  <Form onSubmit={handleAddTask}>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="Tiêu đề công việc"
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        className="form-control-lg"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Mô tả công việc (tùy chọn)"
                        value={newTask.description}
                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                        className="form-control-lg"
                      />
                    </Form.Group>
                    <div className="d-grid mt-2">
                      <Button variant="primary" type="submit" className="btn-lg">
                        Thêm công việc
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>

              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title className="text-center">Danh sách công việc</Card.Title>
                  {tasks?.length === 0 ? (
                    <p className="text-center">Không có công việc nào.</p>
                  ) : (
                    <div className="table-responsive">
                      <Table striped bordered hover className="mt-3 text-center">
                        <thead>
                          <tr>
                            <th>ID công việc</th>
                            <th>Tên công việc</th>
                            <th>Nội dung công việc</th>
                            <th>Trạng thái</th>
                            <th>Thao tác</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tasks?.map((task) => (
                            <tr key={task.id} className={task.completed ? 'table-success' : ''}>
                              <td className="align-middle">{task.id}</td>
                              <td className="align-middle">{task.title}</td>
                              <td>{task.description}</td>
                              <td className="align-middle">
                                <span className={`badge ${task.completed ? 'bg-success' : 'bg-secondary'}`}>
                                  {task.completed ? 'Hoàn thành' : 'Chưa hoàn thành'}
                                </span>
                              </td>
                              <td className="align-middle">
                                {/* Bọc các nút trong một thẻ div để xử lý căn giữa */}
                                <div className="d-flex justify-content-center align-items-center flex-nowrap gap-2">
                                  {!task.completed ? (
                                    <Button
                                      variant="success"
                                      size="sm"
                                      className="complete-btn"
                                      onClick={() => handleCompleteTask(task.id)}
                                    >
                                      <FaEdit className="me-1" /> Hoàn thành
                                    </Button>
                                  ) : (
                                    <Button
                                      variant="secondary"
                                      size="sm"
                                      className="complete-btn"
                                      disabled
                                    >
                                      <FaEdit className="me-1" /> Hoàn thành
                                    </Button>
                                  )}
                                  <Button
                                    variant="danger"
                                    size="sm"
                                    className="d-flex align-items-center"
                                    onClick={() => handleDeleteTask(task)}
                                  >
                                    <FaTrash className="me-1" /> Xóa
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>

      <Modal show={showDeleteModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn xóa công việc "{taskToDelete?.title}" không?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Hủy
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
