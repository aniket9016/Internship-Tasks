import { useEffect, useState } from 'react';
import axios from 'axios';
import { Toast, ToastContainer, Button, Card, Form, Row, Col } from 'react-bootstrap';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import type{ Item } from './types/Item';

const App = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState('');
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);

  const apiUrl = 'http://localhost:5005/items';

  const fetchItems = async () => {
    const res = await axios.get(apiUrl);
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const showMessage = (msg: string) => {
    setToastMsg(msg);
    setShowToast(true);
  };

  const addItem = async () => {
    if (!name) return;
    await axios.post(apiUrl, { name });
    setName('');
    fetchItems();
    showMessage('Item added successfully');
  };

  const deleteItem = async (id: string) => {
    await axios.delete(`${apiUrl}/${id}`);
    fetchItems();
    showMessage('Item deleted successfully');
  };

  const updateItem = async () => {
    if (!editingItem || !name) return;
    await axios.put(`${apiUrl}/${editingItem.id}`, { name });
    setName('');
    setEditingItem(null);
    fetchItems();
    showMessage('Item updated successfully');
  };

  const startEdit = (item: Item) => {
    setEditingItem(item);
    setName(item.name);
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-primary text-center">Item Manager</h2>

      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Row>
            <Col md={10}>
              <Form.Control
                type="text"
                placeholder="Enter item name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
            <Col md={2}>
              <Button
                variant={editingItem ? 'warning' : 'success'}
                className="w-100"
                onClick={editingItem ? updateItem : addItem}
              >
                {editingItem ? 'Update' : 'Add'}
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {items.map((item) => (
        <Card key={item.id} className="mb-2 shadow-sm">
          <Card.Body className="d-flex justify-content-between align-items-center">
            <div className="fw-bold">{item.name}</div>
            <div>
              <Button
                variant="outline-primary"
                className="me-2"
                onClick={() => startEdit(item)}
              >
                <PencilSquare />
              </Button>
              <Button variant="outline-danger" onClick={() => deleteItem(item.id)}>
                <Trash />
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}

      <ToastContainer position="top-end" className="p-3">
        <Toast bg="info" onClose={() => setShowToast(false)} show={showToast} delay={2000} autohide>
          <Toast.Body>{toastMsg}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default App;
